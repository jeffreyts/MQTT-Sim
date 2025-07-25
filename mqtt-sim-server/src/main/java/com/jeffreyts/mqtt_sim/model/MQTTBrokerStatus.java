package com.jeffreyts.mqtt_sim.model;

import java.time.LocalDateTime;

public class MQTTBrokerStatus {
    ConnectionStatus status;
    String host;
    String statusMessage;
    LocalDateTime statusTime;

    public MQTTBrokerStatus(ConnectionStatus status, String host, LocalDateTime statusTime, String statusMessage){
        this.status = status;
        this.host = host;
        this.statusTime = statusTime;
        this.statusMessage = statusMessage;
    }

    public ConnectionStatus getStatus(){
        return this.status;
    }
    public void setStatus(ConnectionStatus connectionStatus){
        this.status = connectionStatus;
        this.statusTime = LocalDateTime.now();
    }

    public String getHost(){
        return this.host;
    }
    public void setHost(String host){
        this.host = host;
    }

    public LocalDateTime getStatusTime(){
        return this.statusTime;
    }

    public void setStatusMessage(String statusMessage){
        this.statusMessage = statusMessage;
    }
}
