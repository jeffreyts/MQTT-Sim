package com.jeffreyts.mqtt_sim.model;

public enum ConnectionStatus {
    DISCONNECTED(0),
    CONNECTED(1),
    ERROR(2);

    private final int connectionStatus;

    ConnectionStatus(int connectionStatus){
        this.connectionStatus = connectionStatus;
    }

    public int getConnectionStatus(){
        return connectionStatus;
    }
}
