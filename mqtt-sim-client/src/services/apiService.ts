import { Broker } from "../models/Broker";
import { BrokerStatus } from "../models/BrokerStatus";
import TopicDefinition from "../models/TopicDefinition";

const API_URL = "http://localhost:8080/api";

export async function connectToBroker(broker: Broker): Promise<BrokerStatus> {
    const response = await fetch(`${API_URL}/connectBroker`, {
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

export async function disconnectBroker(): Promise<BrokerStatus> {
    const response = await fetch(`${API_URL}/disconnectBroker`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to connect to broker");
    }

    const data = await response.json();
    return new BrokerStatus(data);
}

export async function getBrokerStatus(): Promise<BrokerStatus> {
    const response = await fetch(`${API_URL}/brokerStatus`);

    if (!response.ok) {
        throw new Error("Failed to fetch broker status");
    }

    const data = await response.json();
    return new BrokerStatus(data);
}

export async function getPublishingStatus(): Promise<boolean> {
    const response = await fetch(`${API_URL}/publishingStatus`);

    if (!response.ok) {
        throw new Error("Failed to fetch publishing status");
    }

    const data = await response.json();
    return data.publishingStatus;
}

export async function addOrUpdateTopic(topic: TopicDefinition): Promise<void> {
    const response = await fetch(`${API_URL}/topics/update`, {
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
    const response = await fetch(`${API_URL}/topics/remove`, {
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
    const response = await fetch(`${API_URL}/topics`);

    if (!response.ok) {
        throw new Error("Failed to fetch topics");
    }

    const data = await response.json();
    return data.map((topic: any) => new TopicDefinition(topic));
}

export async function startPublishing(): Promise<void> {
    const response = await fetch(`${API_URL}/topics/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error("Failed to start publishing");
    }
}

export async function pausePublishing(): Promise<void> {
    const response = await fetch(`${API_URL}/topics/pause`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error("Failed to pause publishing");
    }
}