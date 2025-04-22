import { useEffect, useState } from "react";
import { getTopics, removeTopic, addOrUpdateTopic } from "../services/apiService";
import TopicDefinition from "../models/TopicDefinition";
import Topic from "./Topic";
import styles from "./TopicList.module.css";

const TopicList = () => {
    const [topics, setTopics] = useState<TopicDefinition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your actual API call
        const fetchTopics = async () => {
            const topics = await getTopics();
            setTopics(topics);
            setLoading(false);
        };
        fetchTopics();
    }, []); // <-- empty array means "run once on mount"

    const handleSave = (updatedTopic: TopicDefinition) => {
        const updateTopic = async () => {
            await addOrUpdateTopic(updatedTopic);
            const fetchTopics = async () => {
                const topics = await getTopics();
                setTopics(topics);
            };
            fetchTopics();
        }
        updateTopic();

    };

    const handleDelete = (topicName: string) => {
        const topicToDelete = topics.find(t => t.name === topicName);
        if (topicToDelete) {
            removeTopic(topicToDelete).then(() => {
                setTopics(topics => topics.filter(t => t.name !== topicName));
            }).catch(error => {
                console.error("Error deleting topic:", error);
            });
        }

    };

    const addTopic = () => {
        const newTopic = new TopicDefinition({ name: `NewTopic${topics.length + 1}`, maximumValue: 100, minimumValue: 0, intervalMilliseconds: 1000, qualityOfService: 1 });
        setTopics(topics => [newTopic, ...topics]);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.topicListOuter}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={addTopic} style={{ margin:'10px 0px 10px 0px', alignSelf:'right'}}>Add</button>
            </div>
            <div className={styles.topicListInner}>
                {topics.map(t => (
                    <Topic key={t.name} topic={t} onSave={handleSave} onDelete={handleDelete} />
                ))}
            </div>
            
        </div>
    );
}

export default TopicList;