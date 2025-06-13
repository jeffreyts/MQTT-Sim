import { useEffect, useState } from "react";
import { getTopics, removeTopic, addOrUpdateTopic, startPublishing, pausePublishing, getPublishingStatus } from "../services/apiService";
import { setSelectedTopic, resetSelectedTopic } from "../store/selectedTopicSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from './TopicList.module.css';
import TopicDefinition from "../models/TopicDefinition";
import playButton from '../assets/play-green.svg';
import pauseButton from '../assets/pause-red.svg';

export default function TopicList() {
    const [topics, setTopics] = useState<TopicDefinition[]>([]);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);
    const [editingValue, setEditingValue] = useState<string>("");
    const selectedTopic = useSelector((state: RootState) => state.slice.value);
    const dispatch = useDispatch();

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
        const nextUid = topics.length > 0 ? Math.min(...topics.map(t => t.uid)) - 1 : -1;
        const newTopic = new TopicDefinition({ name: `NewTopic${topics.length + 1}`, maximumValue: 100, minimumValue: 0, intervalMilliseconds: 1000, qualityOfService: 1, uid: nextUid });
        setTopics(topics => [newTopic, ...topics]);
    }

    const setTopic = (topic: TopicDefinition) => () => {
        dispatch(setSelectedTopic(topic));
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

    const startEditing = (topic: TopicDefinition) => {
        if (selectedTopic?.uid === topic.uid) {
            setEditingValue(topic.name);
        }
    };
    
    const saveEdit = (topic: TopicDefinition) => {
        if (editingValue.trim() && editingValue !== topic.name) {
            const updatedTopic = { ...topic, name: editingValue };
            handleSave(updatedTopic);
            dispatch(setSelectedTopic(updatedTopic));
        }
        setEditingValue("");
    };
    

    const handleEditKeyDown = (e: React.KeyboardEvent, topic: TopicDefinition) => {
        if (e.key === "Enter") {
            saveEdit(topic);
        } else if (e.key === "Escape") {
            setEditingValue("");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="d-flex flex-column h-100">
            <div className="row container-fluid gap-2 align-items-center justify-content-center mx-0 my-2 p-0">
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
                    className="btn btn-secondary fw-bold fs-4 d-flex align-items-center justify-content-center">
                    <i className="bi bi-plus"></i>
                </button>
                <button 
                    style={{ width: 50, height: 30 }}
                    className="btn btn-secondary d-flex align-items-center justify-content-center">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
            <div className="w-100 d-flex flex-column overflow-auto m-0 p-0">
                {topics.map(t => (
                    <div key={t.uid}>
                        {selectedTopic?.uid === t.uid && editingValue !== "" ? (
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={editingValue}
                                autoFocus
                                onChange={e => setEditingValue(e.target.value)}
                                onBlur={() => saveEdit(t)}
                                onKeyDown={e => handleEditKeyDown(e, t)}
                                style={{ minHeight: '28px' }}
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={setTopic(t)}
                                onDoubleClick={() => startEditing(t)}
                                className={`btn btn-sm text-start ${selectedTopic?.uid === t.uid ? 'bg-secondary' : 'bg-body'} border-top border-bottom rounded-0 w-100 d-flex justify-content-between`}
                                style={{ minHeight: '28px' }}
                            >
                                {t.name}
                                <i 
                                    className="bi bi-pencil ms-auto" 
                                    onClick={() => startEditing(t)} 
                                ></i>
                            </button>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
