package com.jeffreyts.mqtt_sim.model;

import com.hivemq.client.mqtt.datatypes.MqttQos;

/// Defines a topic that will be published to and parameters
public class TopicDefinition {

    ///  Unique Identifier
    Integer UID;

    /// Topic Name
    String name;

    /// Publishing interval in milliseconds
    int intervalMilliseconds;

    /// QoS to use for publishing messages
    MqttQos qualityOfService;

    /// Retain Messages
    boolean retain;

    /// Auto Publish
    boolean autoPublish;

    /// Payload Definition
    PayloadDefinition payloadDefinition;

    public Integer getUID(){
        return this.UID;
   }
    public void setUID(Integer UID) { this.UID = UID; }

    public String getName(){
       return this.name;
   }
    public void setName(String name) {
        this.name = name;
    }

    public MqttQos getQualityOfService(){
       return this.qualityOfService;
   }
    public void setQualityOfService(MqttQos qualityOfService){
        this.qualityOfService = qualityOfService;
    }

    public int getIntervalMilliseconds(){
       return this.intervalMilliseconds;
   }
    public void setIntervalMilliseconds(int intervalMilliseconds){
        this.intervalMilliseconds = intervalMilliseconds;
    }

    public boolean getRetain(){
       return this.retain;
   }
    public void setRetain(boolean retain){
        this.retain = retain;
    }


    public boolean getAutoPublish(){
       return this.autoPublish;
   }
    public void setAutoPublish(boolean autoPublish) { this.autoPublish = autoPublish; }

    public PayloadDefinition getPayloadDefinition() {
        return this.payloadDefinition;
    }
    public void setPayloadDefinition(PayloadDefinition payloadDefinition) {
        this.payloadDefinition = payloadDefinition;
    }
}
