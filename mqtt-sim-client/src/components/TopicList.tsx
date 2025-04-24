import { useEffect, useState } from "react";
import { getTopics, removeTopic, addOrUpdateTopic, startPublishing, pausePublishing, getPublishingStatus } from "../services/apiService";
import TopicDefinition from "../models/TopicDefinition";
import Topic from "./Topic";
import styles from "./TopicList.module.css";
import playButton from '../assets/play-green.svg'
import pauseButton from '../assets/pause-red.svg';

const TopicList = () => {
    const [topics, setTopics] = useState<TopicDefinition[]>([]);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await getTopics();
            setTopics(topics);
            setLoading(false);
        };
        fetchTopics();
    }, []);

    useEffect(() => {
        const getPublishing = async () => {
            const publishingStatus = await getPublishingStatus();
            setPublishing(publishingStatus);
        };
        getPublishing();
    }, []);

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

    const startPublishingTopics = () => {
        if (publishing) return; // Prevent starting if already publishing
        const start = async () => {
            await startPublishing();
        }
        start();
        setPublishing(true);
    }

    const pausePublishingTopics = () => {
        if (!publishing) return; // Prevent pausing if not publishing
        const pause = async () => {
            await pausePublishing();
        }
        pause();
        setPublishing(false);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.topicListOuter}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button onClick={startPublishingTopics} className={`${styles.topicButton} ${publishing ? styles.playButtonPublishing : styles.playButton}`}>
                    <img src={playButton} alt="Start Publishing"/>
                </button>
                <button onClick={pausePublishingTopics} className={`${styles.topicButton} ${styles.pauseButton}`}>
                    <img src={pauseButton} alt="Pause Publishing"/>
                </button>
                <button onClick={addTopic} className={styles.topicButton}>Add</button>
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