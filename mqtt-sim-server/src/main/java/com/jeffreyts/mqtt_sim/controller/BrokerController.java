package com.jeffreyts.mqtt_sim.controller;

import com.jeffreyts.mqtt_sim.service.BrokerService;
import com.jeffreyts.mqtt_sim.model.MQTTBroker;
import com.jeffreyts.mqtt_sim.model.MQTTBrokerStatus;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BrokerController{

    @Autowired
    BrokerService brokerService;

    @PostMapping("/connectBroker")
    public MQTTBrokerStatus addBroker(@RequestBody MQTTBroker mqttBroker){
        return this.brokerService.connect(mqttBroker);
    }

    @PostMapping("/disconnectBroker")
    public MQTTBrokerStatus disconnectBroker(){
        return this.brokerService.disconnect();
    }

    @GetMapping("/brokerStatus")
    public MQTTBrokerStatus getBrokerStatus(){
        return this.brokerService.getBrokerStatus();
    }

    @GetMapping("/publishingStatus")
    public boolean getPublishingStatus(){
        return this.brokerService.getPublishingStatus();
    }

    @PostMapping("/topics")
    public void addTopics(@RequestBody List<TopicDefinition> topicDefinitions){
        this.brokerService.addTopicSimulators(topicDefinitions);
    }

    @PostMapping("/topics/update")
    public void addTopic(@RequestBody TopicDefinition topicDefinition){
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

    @PostMapping("/topics/start")
    public void startPublishing(){
        this.brokerService.startPublishing();
    }

    @PostMapping("/topics/pause")
    public void pausePublishing(){
        this.brokerService.pausePublishing();
    }

    @GetMapping("/disconnect")
    public MQTTBrokerStatus disconnect(){
        return this.brokerService.disconnect();
    }
}