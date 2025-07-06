package com.jeffreyts.mqtt_sim.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MQTTTopicRepository implements TopicRepository {
    private static final Logger logger = LoggerFactory.getLogger(MQTTTopicRepository.class);
    private static final String CACHE_FILE = "topics-cache.json";
    private final Map<Integer, TopicDefinition> topics = new HashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MQTTTopicRepository() {
        loadFromCache();
    }

    @Override
    public List<TopicDefinition> getAllTopics() {
        return new ArrayList<>(topics.values());
    }

    @Override
    public TopicDefinition getTopic(Integer uid) {
        return topics.get(uid);
    }

    @Override
    public void addOrUpdateTopic(TopicDefinition topic) {
        topics.put(topic.getUID(), topic);
        writeToCache();
    }

    @Override
    public void removeTopic(Integer uid) {
        topics.remove(uid);
        writeToCache();
    }

    @Override
    public void loadFromCache() {
        File file = new File(CACHE_FILE);
        if (file.exists()) {
            try {
                List<TopicDefinition> loaded = objectMapper.readValue(file, new TypeReference<List<TopicDefinition>>() {});
                topics.clear();
                for (TopicDefinition t : loaded) {
                    topics.put(t.getUID(), t);
                }
            } catch (IOException e) {
                logger.error("Failed to load topics from cache", e);
            }
        }
    }

    @Override
    public void writeToCache() {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(CACHE_FILE), getAllTopics());
        } catch (IOException e) {
            logger.error("Failed to write topics to cache", e);
        }
    }
}
