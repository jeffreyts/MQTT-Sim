package com.jeffreyts.mqtt_sim.repository;

import com.jeffreyts.mqtt_sim.model.TopicDefinition;
import java.util.List;

public interface TopicRepository {
    List<TopicDefinition> getAllTopics();
    TopicDefinition getTopic(Integer uid);
    void addOrUpdateTopic(TopicDefinition topic);
    void removeTopic(Integer uid);
    void loadFromCache();
    void writeToCache();
}
