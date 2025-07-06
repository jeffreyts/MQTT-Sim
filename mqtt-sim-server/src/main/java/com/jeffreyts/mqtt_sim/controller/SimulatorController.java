package com.jeffreyts.mqtt_sim.controller;

import com.jeffreyts.mqtt_sim.service.SimulatorService;
import com.jeffreyts.mqtt_sim.model.MQTTBroker;
import com.jeffreyts.mqtt_sim.model.MQTTBrokerStatus;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SimulatorController {

    @Autowired
    SimulatorService simulatorService;

    @PostMapping("/connectBroker")
    public MQTTBrokerStatus addBroker(@RequestBody MQTTBroker mqttBroker){
        return this.simulatorService.connect(mqttBroker);
    }

    @PostMapping("/disconnectBroker")
    public MQTTBrokerStatus disconnectBroker(){
        return this.simulatorService.disconnect();
    }

    @GetMapping("/brokerStatus")
    public MQTTBrokerStatus getBrokerStatus(){
        return this.simulatorService.getBrokerStatus();
    }

    @GetMapping("/publishingStatus")
    public boolean getPublishingStatus(){
        return this.simulatorService.getPublishingStatus();
    }

    @PostMapping("/topics")
    public void addTopics(@RequestBody List<TopicDefinition> topicDefinitions){
        this.simulatorService.addTopicSimulators(topicDefinitions);
    }

    @PostMapping("/topics/update")
    public void addTopic(@RequestBody TopicDefinition topicDefinition){
        this.simulatorService.addTopicSimulator(topicDefinition);
    }

    @GetMapping("/topics")
    public List<TopicDefinition> getTopics(){
        return this.simulatorService.getTopics();
    }

    @PostMapping("/topics/remove")
    public void removeTopics(@RequestBody TopicDefinition topicDefinition){
        this.simulatorService.removeTopicSimulator(topicDefinition);
    }

    @PostMapping("/topics/start")
    public void startPublishing(){
        this.simulatorService.startPublishing();
    }

    @PostMapping("/topics/pause")
    public void pausePublishing(){
        this.simulatorService.pausePublishing();
    }

    @PostMapping("/publish")
    public void publishSingleTopic(@RequestBody TopicDefinition topicDefinition){
        this.simulatorService.publishSingleTopic(topicDefinition);
    }

    @GetMapping("/disconnect")
    public MQTTBrokerStatus disconnect(){
        return this.simulatorService.disconnect();
    }
}