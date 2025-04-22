package com.jeffreyts.mqtt_sim.model;

public class MQTTBroker {
    /// MQTT Broker Hostname
    String host;

    /// Flag indicating if MQTT 5 should be used, else MQTT 3
    boolean useMqtt5;

    /// MQTT Broker Definition
    public MQTTBroker(String host, boolean useMqtt5){
        this.host = host;
        this.useMqtt5 = useMqtt5;
    }

    public String getHost(){
        return this.host;
    }

    public boolean getUseMqtt5(){
        return this.useMqtt5;
    }

    public void setHost(String host){
        this.host = host;
    }

    public void setUseMqtt5(boolean useMqtt5){
        this.useMqtt5 = useMqtt5;
    }
}
