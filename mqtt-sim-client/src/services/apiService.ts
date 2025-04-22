import { Broker } from "../models/Broker";
import { BrokerStatus } from "../models/BrokerStatus";
import TopicDefinition from "../models/TopicDefinition";

const API_URL = "http://localhost:8080/api";

export async function connectToBroker(broker: Broker): Promise<BrokerStatus> {
    const response = await fetch(`${API_URL}/broker/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(broker)
    });

    if (!response.ok) {
        throw new Error("Failed to connect to broker");
    }

    const data = await response.json();
    return new BrokerStatus(data);
}

export async function addOrUpdateTopic(topic: TopicDefinition): Promise<void> {
    const response = await fetch(`${API_URL}/broker/topics/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topic)
    });

    if (!response.ok) {
        throw new Error("Failed to connect to broker");
    }
}

export async function removeTopic(topic: TopicDefinition): Promise<void> {
    const response = await fetch(`${API_URL}/broker/topics/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(topic)
    });

    if (!response.ok) {
        throw new Error("Failed to connect to broker");
    }
}

export async function getTopics(): Promise<TopicDefinition[]> {
    const response = await fetch(`${API_URL}/broker/topics`);

    if (!response.ok) {
        throw new Error("Failed to fetch topics");
    }

    const data = await response.json();
    return data.map((topic: any) => new TopicDefinition(topic));
}