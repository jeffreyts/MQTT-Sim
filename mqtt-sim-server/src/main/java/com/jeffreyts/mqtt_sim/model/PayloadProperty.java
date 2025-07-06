package com.jeffreyts.mqtt_sim.model;

import java.util.Map;

public class PayloadProperty {
    int Id;
    String Name;
    String Type;
    Map<String, Object> configuration;
    Object value;

    public int getId() {
        return this.Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public String getName() {
        return this.Name;
    }

    public void setName(String name) {
        this.Name = name;
    }

    public String getType() {
        return this.Type;
    }

    public void setType(String type) {
        this.Type = type;
    }

    public Map<String, Object> getConfiguration() {
        return this.configuration;
    }

    public void setConfiguration(Map<String, Object> configuration) {
        this.configuration = configuration;
    }

    public Object getValue(){
        return this.value;
    }

    public void setValue(Object value){
        this.value = value;
    }
}
