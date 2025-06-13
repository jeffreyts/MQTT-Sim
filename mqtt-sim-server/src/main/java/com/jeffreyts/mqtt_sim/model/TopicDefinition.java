package com.jeffreyts.mqtt_sim.model;

import com.hivemq.client.mqtt.datatypes.MqttQos;

/// Defines a topic that will be published to and parameters
public class TopicDefinition {

    ///  Unique Identifier
    Integer UID;

    /// Topic Name
    String name;

    /// Maximum Value
    int maximumValue;

    /// Minimum Value
    int minimumValue;

    /// Publishing interval in milliseconds
    int intervalMilliseconds;

    /// QoS to use for publishing messages
    MqttQos qualityOfService;

    /// Retain Messages
    boolean retain;

   public Integer getUID(){
        return this.UID;
   }

   public String getName(){
       return this.name;
   }

   public int getMaximumValue(){
       return this.maximumValue;
   }

   public int getMinimumValue() {
       return this.minimumValue;
   }

   public MqttQos getQualityOfService(){
       return this.qualityOfService;
   }

   public int getIntervalMilliseconds(){
       return this.intervalMilliseconds;
   }

   public boolean getRetain(){
       return this.retain;
   }

   public void setUID(Integer UID) { this.UID = UID; }

   public void setName(String name) {
       this.name = name;
   }

   public void setMaximumValue(int maximumValue){
       this.maximumValue = maximumValue;
   }

   public void setMinimumValue(int minimumValue){
       this.minimumValue = minimumValue;
   }

   public void setQualityOfService(MqttQos qualityOfService){
       this.qualityOfService = qualityOfService;
   }

   public void setIntervalMilliseconds(int intervalMilliseconds){
       this.intervalMilliseconds = intervalMilliseconds;
   }

   public void setRetain(boolean retain){
       this.retain = retain;
   }

}
