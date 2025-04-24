package com.jeffreyts.mqtt_sim.service;


import com.hivemq.client.mqtt.mqtt5.Mqtt5Client;
import com.hivemq.client.mqtt.mqtt5.Mqtt5RxClient;
import com.hivemq.client.mqtt.mqtt5.message.connect.connack.Mqtt5ConnAck;
import com.hivemq.client.mqtt.mqtt5.message.publish.Mqtt5Publish;
import io.reactivex.Flowable;
import io.reactivex.disposables.Disposable;
import org.springframework.stereotype.Service;
import com.jeffreyts.mqtt_sim.model.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Service
public class MQTTBrokerService implements BrokerService {

    Mqtt5RxClient currentClient;
    MQTTBrokerStatus brokerStatus = new MQTTBrokerStatus(ConnectionStatus.DISCONNECTED, "", LocalDateTime.now(), "");
    Map<String, Disposable> topicToPublishingSubscriptionMap = new HashMap<String, Disposable>();
    Map<String, TopicDefinition> topicToDefinitionMap = new HashMap<String, TopicDefinition>();
    ArrayList<TopicDefinition> topics = new ArrayList<>();
    Boolean paused = true;

    @Override
    /// Connects to a broker
    public MQTTBrokerStatus connect(MQTTBroker mqttBroker) {
        this.disconnect();

        this.currentClient = Mqtt5Client.builder()
                .identifier(UUID.randomUUID().toString())
                .serverHost(mqttBroker.getHost())
                .serverPort(1883)
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

        for (String topic: this.topicToPublishingSubscriptionMap.keySet()){
            this.topicToPublishingSubscriptionMap.get(topic).dispose();
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

        for (TopicDefinition topic: this.topicToDefinitionMap.values()){
            startPublishingToTopic(topic);
        }
        this.paused = false;
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
        if (this.topicToDefinitionMap.containsKey(topicDefinition.getName())){
            return;
        }

        this.topicToDefinitionMap.put(topicDefinition.getName(), topicDefinition);

        if (!this.paused){
            startPublishingToTopic(topicDefinition);
        }
    }

    @Override
    /// Gets a list of topics
    public List<TopicDefinition> getTopics(){
        return new ArrayList<TopicDefinition>(this.topicToDefinitionMap.values());
    }

    @Override
    /// Stops publishing to a topic if currently publishing
    public void removeTopicSimulator(TopicDefinition topicDefinition) {
        if (this.topicToPublishingSubscriptionMap.containsKey(topicDefinition.getName())) {
            try {
                this.topicToPublishingSubscriptionMap.get(topicDefinition.getName()).dispose();
            }
            catch (Exception exception){
                //TODO: Log here that the topic was already disposed
            }
            this.topicToPublishingSubscriptionMap.remove(topicDefinition.getName());
        }

        this.topicToDefinitionMap.remove(topicDefinition.getName());
    }

    /// Begins publishing to a topic
    private void startPublishingToTopic(TopicDefinition topicDefinition){
        Flowable<Mqtt5Publish> messagesToPublish = Flowable.interval(topicDefinition.getIntervalMilliseconds(), TimeUnit.MILLISECONDS)
                .map(i -> {
                    double randomValue = ThreadLocalRandom.current().nextDouble(
                            topicDefinition.getMinimumValue(), topicDefinition.getMaximumValue());

                    return Mqtt5Publish.builder()
                            .topic(topicDefinition.getName())
                            .qos(topicDefinition.getQualityOfService())
                            .payload(String.valueOf(randomValue).getBytes())
                            .build();
                });

        Disposable topicSimulatorSubscription = this.currentClient.publish(messagesToPublish)
                .doOnNext(publishResult -> System.out.println(
                        "Publish acknowledged: " + new String(publishResult.getPublish().getPayloadAsBytes())))
                .ignoreElements()
                .doOnError(throwable -> removeTopicSimulator(topicDefinition))
                .subscribe();
        this.topicToPublishingSubscriptionMap.put(topicDefinition.getName(), topicSimulatorSubscription);
    }
}
