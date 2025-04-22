package com.jeffreyts.mqtt_sim.service;

import com.jeffreyts.mqtt_sim.model.MQTTBroker;
import com.jeffreyts.mqtt_sim.model.MQTTBrokerStatus;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;

import java.util.List;

public interface BrokerService {
    MQTTBrokerStatus connect(MQTTBroker mqttBroker);
    MQTTBrokerStatus disconnect();
    MQTTBrokerStatus getBrokerStatus();
    List<TopicDefinition> getTopics();
    void addTopicSimulators(List<TopicDefinition> topicDefinitions);
    void addTopicSimulator(TopicDefinition topicDefinition);
    void removeTopicSimulator(TopicDefinition topicDefinition);
}
