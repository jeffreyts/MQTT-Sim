import { useEffect, useState } from "react";
import { getTopics, removeTopic, addOrUpdateTopic, startPublishing, pausePublishing, getPublishingStatus } from "../services/apiService";
import styles from './TopicList.module.css';
import TopicDefinition from "../models/TopicDefinition";
import Topic from "./Topic";
import playButton from '../assets/play-green.svg';
import pauseButton from '../assets/pause-red.svg';

export default function TopicList(){
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
        <div className="h-100 w-100 d-flex flex-column">
            <div className="d-flex gap-2 justify-content-end my-2 me-4">
                <button onClick={startPublishingTopics} 
                    className={`btn btn-outline-success d-flex align-items-center justify-content-center ${publishing ? styles.playButtonPublishing : ''}`}
                    style={{ width: 50, height: 30 }}>
                    <img src={playButton} alt="Start Publishing"/>
                </button>
                <button onClick={pausePublishingTopics} 
                    className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 30 }}>
                    <img src={pauseButton} alt="Pause Publishing"/>
                </button>
                <button onClick={addTopic}
                style={{ width: 50, height: 30 }}
                    className="btn btn-primary d-flex align-items-center justify-content-center">Add</button>
            </div>
            <div className="flex-grow-1 overflow-auto pe-1">
                {topics.map(t => (
                    <Topic key={t.name} topicDefinition={t} onSave={handleSave} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}
