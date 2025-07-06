import { useContext, useEffect, useState } from "react";
import { getTopics, removeTopic, addOrUpdateTopic } from "../services/apiService";
import TopicDefinition from "../models/TopicDefinition";
import { TopicContext } from "../context/TopicContext";
import { PropertySettingsFactory } from "../utilities/PropertySettingsFactory";

export default function TopicList({setSelectedTopic}: {setSelectedTopic: (topic: TopicDefinition | null) => void}) {
    const [topics, setTopics] = useState<TopicDefinition[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingValue, setEditingValue] = useState<string>("");
    const [editingTopicUid, setEditingTopicUid] = useState<number | null>(null);
    const selectedTopic = useContext(TopicContext);
    
    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await getTopics();
            setTopics(topics);
            setLoading(false);
        };
        fetchTopics();
    }, []);

    const handleSave = (updatedTopic: TopicDefinition) => {
        const updateTopic = async () => {
            await addOrUpdateTopic(updatedTopic);
            const topics = await getTopics();
            setTopics(topics);
            let topicToSelect = topics.find(t => t.uid === updatedTopic.uid);
            if (!topicToSelect) {
                topicToSelect = topics.find(t => t.name === updatedTopic.name);
            }

            if (topicToSelect) {
                setSelectedTopic(topicToSelect);
            } else {
                setSelectedTopic(null);
                console.error("Saved topic not found in the list after saving.");
            }
        }
        updateTopic();
    }

    const handleDelete = (topicUid: number) => {
        const topicToDelete = topics.find(t => t.uid === topicUid);
        if (topicToDelete) {
            removeTopic(topicToDelete).then(() => {
                setTopics(topics => topics.filter(t => t.uid !== topicUid));
            }).catch(error => {
                console.error("Error deleting topic:", error);
            });
        }

    }

    const addTopic = () => {
        const nextUid = topics.length > 0 ? Math.min(...topics.map(t => t.uid)) - 1 : -1;
        const newTopic = new TopicDefinition({ 
            name: `NewTopic${topics.length + 1}`, 
            intervalMilliseconds: 1000, 
            qualityOfService: 0, 
            retain: false, 
            uid: nextUid,
            payloadDefinition: { 
                template: '{\n  "timestamp": {{timestamp}}\n}',
                properties: [
                    { 
                        id: 0, 
                        name: 'timestamp', 
                        type: 'timestamp', 
                        configuration: PropertySettingsFactory.createPropertySettings('timestamp')
                    }
                ] }
        });
        handleSave(newTopic);//this will save, reload, and select the new topic
    }

    const setTopic = (topic: TopicDefinition) => () => {
        setSelectedTopic(topic);
    }

    const startEditing = (topic: TopicDefinition) => {
        setEditingTopicUid(topic.uid);
        setEditingValue(topic.name);
    }
    
    const saveEdit = (topic: TopicDefinition) => {
        if (editingValue.trim() && editingValue !== topic.name) {
            const updatedTopic = { ...topic, name: editingValue };
            handleSave(updatedTopic);
        }
        setEditingValue("");
        setEditingTopicUid(null);
    }
    
    const cancelEdit = () => {
        setEditingValue("");
        setEditingTopicUid(null);
    }

    const handleEditKeyDown = (e: React.KeyboardEvent, topic: TopicDefinition) => {
        if (e.key === "Enter") {
            saveEdit(topic);
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="d-flex flex-column h-100 p-0" style={{ overflow: 'none' }}>
            <div className="row d-flex flex-row align-items-center justify-content-between mx-0 my-2 p-0">
                    <label className="col-7 fw-bold">Topic List</label>
                    <div className="col-5 d-flex flex-row gap-2 justify-content-end">
                        <button onClick={addTopic}
                            style={{ width: 40, height: 30 }}
                            className="btn custom-btn-secondary fs-4 d-flex align-items-center justify-content-center p-1">
                            <i className="bi bi-plus"></i>
                        </button>
                        <button onClick={selectedTopic ? () => handleDelete(selectedTopic.uid) : () => {}}
                            style={{ width: 40, height: 30 }}
                            className="btn custom-btn-secondary d-flex align-items-center justify-content-center p-1">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            <div className="w-100 d-flex flex-column overflow-auto m-0 p-0">
                {topics.map(t => (
                    <div key={t.uid}>
                        {editingTopicUid === t.uid ? (
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
                                className={`btn btn-sm text-start btn-list${selectedTopic?.uid === t.uid ? ' active' : ''} border-top border-bottom rounded-0 w-100 d-flex justify-content-between gap-1`}
                                style={{ minHeight: '28px' }}
                            >
                                <span title={t.name} className="flex-fill truncate-start">{t.name}</span>
                                <i 
                                    className="bi bi-pencil ms-auto" 
                                    onClick={e => { e.stopPropagation(); startEditing(t); }} 
                                ></i>
                            </button>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
