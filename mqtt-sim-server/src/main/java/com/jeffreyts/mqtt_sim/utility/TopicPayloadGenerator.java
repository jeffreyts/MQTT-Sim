package com.jeffreyts.mqtt_sim.utilities;

import com.jeffreyts.mqtt_sim.model.PayloadDefinition;
import com.jeffreyts.mqtt_sim.model.PayloadProperty;
import com.jeffreyts.mqtt_sim.model.TopicDefinition;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TopicPayloadGenerator {
    private static final Random random = new Random();
    private static final Map<String, Object> lastValues = new HashMap<>();

    private TopicPayloadGenerator() { }

    public static String GeneratePayload(TopicDefinition topicDefinition) {
        Map<String, Object> generatedValues = new HashMap<>();
        for (PayloadProperty property : topicDefinition.getPayloadDefinition().getProperties()) {
            Object value = generatePropertyValue(property);
            generatedValues.put(property.getName(), value);
        }

        String payload = topicDefinition.getPayloadDefinition().getTemplate();
        for (Map.Entry<String, Object> entry : generatedValues.entrySet()) {
            payload = payload.replaceAll("\\{\\{" + Pattern.quote(entry.getKey()) + "\\}\\}", Matcher.quoteReplacement(entry.getValue().toString()));
        }
        return payload;
    }

    private static Object generatePropertyValue(PayloadProperty property) {
        String key = property.getName();
        switch (property.getType())
        {
            case "stringCategory":
                if (shouldValueChange(property))
                {
                    return generateStringCategory(property);
                }
                return property.getValue();
            case "numberRandom":
                return generateNumberRandom(property);
            case "numberNormal":
                return generateNumberNormal(property);
            case "boolean":
                if (shouldValueChange(property))
                {
                    return generateBoolean(property);
                }
                return property.getValue();
            case "timestamp":
                return generateTimestamp(property);
            default:
                throw new IllegalArgumentException("Unsupported property type: " + property.getType());
        }
    }

    private static boolean shouldValueChange(PayloadProperty property) {
        int probability = 100;
        if (property.getConfiguration().containsKey("probabilityOfChange%")) {
            probability = ((Number) property.getConfiguration().get("probabilityOfChange%")).intValue();
        }

        return property.getValue() == null || random.nextInt(100) < probability;
    }

    private static String generateStringCategory(PayloadProperty property) {
        String categoriesStr = (String) property.getConfiguration().getOrDefault("categories", "first,second,third");
        String[] categories = categoriesStr.split(",");
        int idx = random.nextInt(categories.length);
        return categories[idx].trim();
    }

    private static double generateNumberRandom(PayloadProperty property) {
        double min = ((Number) property.getConfiguration().getOrDefault("min", 0)).doubleValue();
        double max = ((Number) property.getConfiguration().getOrDefault("max", 100)).doubleValue();
        int precision = ((Number) property.getConfiguration().getOrDefault("precision", 2)).intValue();
        double value = min + (max - min) * random.nextDouble();
        return round(value, precision);
    }

    private static double generateNumberNormal(PayloadProperty property) {
        double mean = ((Number) property.getConfiguration().getOrDefault("mean", 50)).doubleValue();
        double stdDev = ((Number) property.getConfiguration().getOrDefault("stdDev", 10)).doubleValue();
        int precision = ((Number) property.getConfiguration().getOrDefault("precision", 0)).intValue();
        double value = mean + stdDev * random.nextGaussian();
        return round(value, precision);
    }

    private static boolean generateBoolean(PayloadProperty property) {
        return random.nextBoolean();
    }

    private static String generateTimestamp(PayloadProperty property) {
        String format = (String) property.getConfiguration().getOrDefault("format", "yyyy-MM-dd'T'HH:mm:ss.SSS");
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(new Date());
    }

    private static double round(double value, int precision) {
        double scale = Math.pow(10, precision);
        return Math.round(value * scale) / scale;
    }
}