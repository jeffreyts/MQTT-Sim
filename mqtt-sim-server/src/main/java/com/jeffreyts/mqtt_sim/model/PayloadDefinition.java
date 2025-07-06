package com.jeffreyts.mqtt_sim.model;

import java.util.List;

public class PayloadDefinition {
    String Template;
    List<PayloadProperty> Properties;

    public String getTemplate() {
        return this.Template;
    }

    public void setTemplate(String template) {
        this.Template = template;
    }

    public List<PayloadProperty> getProperties() {
        return this.Properties;
    }

    public void setProperties(List<PayloadProperty> properties) {
        this.Properties = properties;
    }
}