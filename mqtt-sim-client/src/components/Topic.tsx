import { useState } from "react";
import TopicDefinition from "../models/TopicDefinition";
import styles from "./Topic.module.css";
import dropdownArrow from "../assets/dropdown-arrow.svg";
import dropdownArrowDown from "../assets/dropdown-arrow-down.svg";

function Topic(props: { topic: TopicDefinition; onSave: (t: TopicDefinition) => void; onDelete: (name: string) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [topic, setTopic] = useState<TopicDefinition>(new TopicDefinition(props.topic));

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTopic(prev => new TopicDefinition({ ...prev, [name]: name === 'name' ? value : Number(value) }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        props.onSave(topic);
        setIsExpanded(false);
    };

    const handleDelete = () => {
        props.onDelete(topic.name);
    };

    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicHeader}>
                <input type="text" className={styles.topicInput} name="name" value={topic.name} onChange={handleChange}/>
                <button className={styles.expandButton} onClick={toggleExpand} aria-label={isExpanded ? "Collapse" : "Expand"}>
                  <img
                    src={isExpanded ? dropdownArrowDown : dropdownArrow}
                    alt="dropdown arrow"
                    className={styles.dropdownArrow}
                  />
                </button>
            </div>
            {isExpanded && (
                <form className="topic-details" onSubmit={handleSave}>
                    <label className={styles.item}>
                        Maximum Value:
                        <input type="number" className={styles.item} name="maximumValue" value={topic.maximumValue} onChange={handleChange} />
                    </label>
                    <label className={styles.item}>
                        Minimum Value:
                        <input type="number" className={styles.item} name="minimumValue" value={topic.minimumValue} onChange={handleChange} />
                    </label>
                    <label className={styles.item}>
                        Interval (ms):
                        <input type="number" className={styles.item} name="intervalMilliseconds" value={topic.intervalMilliseconds} onChange={handleChange} />
                    </label>
                    <label className={styles.item}>
                        QoS:
                        <input type="number" className={styles.item} name="qualityOfService" value={topic.qualityOfService} onChange={handleChange} />
                    </label>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                        <button className={styles.item} type="submit">Save</button>
                        <button className={styles.item} type="button" style={{ background: 'transparent', color: 'red', border: '1px solid red' }} onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Topic;