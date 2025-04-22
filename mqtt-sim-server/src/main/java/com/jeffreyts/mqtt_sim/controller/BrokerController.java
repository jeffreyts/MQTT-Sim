package com.jeffreyts.mqtt_sim.controller;

import com.jeffreyts.mqtt_sim.service.BrokerService;
import com.jeffreyts.mqtt_sim.model.MQTTBroker;
import com.jeffreyts.mqtt_sim.model.MQTTBrokerStatus;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/broker")
public class BrokerController{

    @Autowired
    BrokerService brokerService;

    @PostMapping("/add")
    public MQTTBrokerStatus addBroker(@RequestBody MQTTBroker mqttBroker){
        return this.brokerService.connect(mqttBroker);
    }

    @PostMapping("/topics")
    public void addTopics(@RequestBody List<TopicDefinition> topicDefinitions){
        this.brokerService.addTopicSimulators(topicDefinitions);
    }

    @PostMapping("/topics/update")
    public void addTopics(@RequestBody TopicDefinition topicDefinition){
        this.brokerService.addTopicSimulator(topicDefinition);
    }

    @GetMapping("/topics")
    public List<TopicDefinition> getTopics(){
        return this.brokerService.getTopics();
    }

    @PostMapping("/topics/remove")
    public void removeTopics(@RequestBody TopicDefinition topicDefinition){
        this.brokerService.removeTopicSimulator(topicDefinition);
    }

    @GetMapping("/disconnect")
    public MQTTBrokerStatus disconnect(){
        return this.brokerService.disconnect();
    }
}