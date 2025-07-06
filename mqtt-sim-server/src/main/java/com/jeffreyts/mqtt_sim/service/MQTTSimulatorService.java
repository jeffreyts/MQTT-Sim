package com.jeffreyts.mqtt_sim.service;


import com.hivemq.client.mqtt.mqtt5.Mqtt5Client;
import com.hivemq.client.mqtt.mqtt5.Mqtt5RxClient;
import com.hivemq.client.mqtt.mqtt5.*;
import com.hivemq.client.mqtt.mqtt5.message.connect.connack.Mqtt5ConnAck;
import com.hivemq.client.mqtt.mqtt5.message.publish.Mqtt5Publish;
import com.hivemq.client.mqtt.mqtt5.message.publish.Mqtt5PublishResult;
import com.jeffreyts.mqtt_sim.utility.TopicPayloadGenerator;
import io.reactivex.Flowable;
import io.reactivex.Single;
import io.reactivex.disposables.Disposable;
import org.springframework.stereotype.Service;
import com.jeffreyts.mqtt_sim.model.*;
import com.jeffreyts.mqtt_sim.repository.MQTTTopicRepository;
import com.jeffreyts.mqtt_sim.repository.TopicRepository;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class MQTTSimulatorService implements SimulatorService {

    Mqtt5RxClient currentClient;
    MQTTBrokerStatus brokerStatus = new MQTTBrokerStatus(ConnectionStatus.DISCONNECTED, "", LocalDateTime.now(), "");
    Map<Integer, Disposable> topicToPublishingSubscriptionMap = new HashMap<Integer, Disposable>();
    private final TopicRepository topicRepository = new MQTTTopicRepository();
    Boolean paused = true;

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(MQTTSimulatorService.class);

    @Override
    /// Connects to a broker
    public MQTTBrokerStatus connect(MQTTBroker mqttBroker) {
        this.disconnect();

        this.currentClient = Mqtt5Client.builder()
                .identifier(UUID.randomUUID().toString())
                .serverHost(mqttBroker.getHost())
                .serverPort(mqttBroker.getPort())
                .buildRx();

        this.brokerStatus.setHost(mqttBroker.getHost());
        try {
            Mqtt5ConnAck connectionAck = this.currentClient
                    .connect()
                    .timeout(5, TimeUnit.SECONDS)
                    .blockingGet();
            brokerStatus.setStatus(ConnectionStatus.CONNECTED);
            brokerStatus.setStatusMessage("");
        }
        catch (Exception ex) {
            brokerStatus.setStatus(ConnectionStatus.ERROR);
            brokerStatus.setStatusMessage("Connection Failed: " + ex.getMessage());
        }

        return this.brokerStatus;
    }

    @Override
    /// Disconnects the broker
    public MQTTBrokerStatus disconnect() {
        if (this.currentClient == null){
            return this.brokerStatus;
        }

        if (!this.paused){
            this.pausePublishing();
        }

        //Disconnect the current client
        try {
            this.currentClient.disconnect().timeout(5, TimeUnit.SECONDS).blockingAwait();
            this.brokerStatus.setStatus(ConnectionStatus.DISCONNECTED);
            this.brokerStatus.setStatusMessage("");
        } catch (Exception ex) {
            this.brokerStatus.setStatus(ConnectionStatus.ERROR);
            this.brokerStatus.setStatusMessage("Error disconnecting from Broker");
        }

        return this.brokerStatus;
    }

    @Override
    /// Pauses publishing to defined topics
    public void pausePublishing(){
        if (this.paused){
            return;
        }

        for (Integer UID: this.topicToPublishingSubscriptionMap.keySet()){
            this.topicToPublishingSubscriptionMap.get(UID).dispose();
        }
        this.topicToPublishingSubscriptionMap.clear();
        this.paused = true;
    }

    @Override
    /// Starts publishing to defined topics
    public void startPublishing(){
        if (!this.paused || this.brokerStatus.getStatus() != ConnectionStatus.CONNECTED){
            return;
        }

        for (TopicDefinition topic: topicRepository.getAllTopics()){
            if (topic.getAutoPublish()) {
                startPublishingToTopic(topic);
            }
        }
        this.paused = false;
    }

    @Override
    /// Publishes a single topic
    public void publishSingleTopic(TopicDefinition topicDefinition){
        if (this.brokerStatus.getStatus() != ConnectionStatus.CONNECTED) {
            return;
        }

        Object randomValue = TopicPayloadGenerator.GeneratePayload(topicDefinition);
        Disposable result =
                this.currentClient.publish(Flowable.just(Mqtt5Publish.builder()
                        .topic(topicDefinition.getName())
                        .qos(topicDefinition.getQualityOfService())
                        .retain(topicDefinition.getRetain())
                        .payload(String.valueOf(randomValue).getBytes())
                        .build())).singleOrError().subscribe();
        result.dispose();
    }

    @Override
    /// Returns the broker status
    public MQTTBrokerStatus getBrokerStatus() {
       return this.brokerStatus;
    }

    @Override
    /// Returns the true if publishing, false if paused
    public boolean getPublishingStatus(){
        return !this.paused;
    }

    @Override
    /// Adds a list of topics to simulate publishing
    public void addTopicSimulators(List<TopicDefinition> topicDefinitions) {
        for (TopicDefinition topic : topicDefinitions){
            addTopicSimulator(topic);
        }
    }

    @Override
    /// Adds a topic publisher
    public void addTopicSimulator(TopicDefinition topicDefinition) {
        if (topicDefinition.getIntervalMilliseconds() < 50){
            topicDefinition.setIntervalMilliseconds(50); //Limit the rate messages can be published
        }
        if (topicDefinition.getUID() <= 0) {
            int newUID = topicRepository.getAllTopics().stream()
                .mapToInt(TopicDefinition::getUID)
                .max().orElse(0) + 1;
            topicDefinition.setUID(newUID);
        }
        topicRepository.addOrUpdateTopic(topicDefinition);
        if (!this.paused){
            startPublishingToTopic(topicDefinition);
        }
    }

    @Override
    /// Gets a list of topics
    public List<TopicDefinition> getTopics(){
        return topicRepository.getAllTopics();
    }

    @Override
    /// Stops publishing to a topic if currently publishing
    public void removeTopicSimulator(TopicDefinition topicDefinition) {
        if (this.topicToPublishingSubscriptionMap.containsKey(topicDefinition.getUID())) {
            try {
                this.topicToPublishingSubscriptionMap.get(topicDefinition.getUID()).dispose();
            }
            catch (Exception exception){
                logger.warn("Topic UID {} was already disposed or could not be disposed: {}", topicDefinition.getUID(), exception.getMessage());
            }
            this.topicToPublishingSubscriptionMap.remove(topicDefinition.getUID());
        }
        topicRepository.removeTopic(topicDefinition.getUID());
    }

    /// Begins publishing to a topic
    private void startPublishingToTopic(TopicDefinition topicDefinition){
        if (!topicDefinition.getAutoPublish()) {
            return;
        }

        Flowable<Mqtt5Publish> messagesToPublish = Flowable.interval(topicDefinition.getIntervalMilliseconds(), TimeUnit.MILLISECONDS)
                .map(i -> {
                    Object randomValue = TopicPayloadGenerator.GeneratePayload(topicDefinition);
                    return Mqtt5Publish.builder()
                            .topic(topicDefinition.getName())
                            .qos(topicDefinition.getQualityOfService())
                            .retain(topicDefinition.getRetain())
                            .payload(String.valueOf(randomValue).getBytes())
                            .build();
                });

        Disposable topicSimulatorSubscription = this.currentClient.publish(messagesToPublish)
                .doOnNext(publishResult -> System.out.println(
                        "Publish acknowledged: " + new String(publishResult.getPublish().getPayloadAsBytes())))
                .ignoreElements()
                .doOnError(throwable -> removeTopicSimulator(topicDefinition))
                .subscribe();
        this.topicToPublishingSubscriptionMap.put(topicDefinition.getUID(), topicSimulatorSubscription);
    }
}
