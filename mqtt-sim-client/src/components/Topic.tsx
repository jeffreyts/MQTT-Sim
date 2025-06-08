import { useState } from "react";
import TopicDefinition from "../models/TopicDefinition";
import styles from "./Topic.module.css";
import dropdownArrow from "../assets/dropdown-arrow.svg";
import dropdownArrowDown from "../assets/dropdown-arrow-down.svg";
import TopicProps from "../interfaces/TopicProps";

export default function Topic({topicDefinition, onSave, onDelete}: TopicProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [topic, setTopic] = useState<TopicDefinition>(new TopicDefinition(topicDefinition));

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTopic(prev => new TopicDefinition({ ...prev, [name]: name === 'name' ? value : Number(value) }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.intervalMilliseconds < 50){
            alert("Interval must be at least 50ms.");
            return;
        }
        onSave(topic);
        setIsExpanded(false);
    };

    const handleDelete = () => {
        onDelete(topic.name);
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
                <form className="row mx-0 topic-details container-fluid" onSubmit={handleSave}>
                    <label className="col mx-2 mb-1">
                        Maximum Value:
                        <input type="number" className="mx-2 mb-2" name="maximumValue" value={topic.maximumValue} onChange={handleChange} />
                    </label>
                    <label className="col mx-2 mb-1">
                        Minimum Value:
                        <input type="number" className="mx-2 mb-2" name="minimumValue" value={topic.minimumValue} onChange={handleChange} />
                    </label>
                    <label className="col mx-2 mb-1">
                        Interval (ms):
                        <input type="number" className="mx-2 mb-2" name="intervalMilliseconds" value={topic.intervalMilliseconds} onChange={handleChange} />
                    </label>
                    <label className="col mx-2 mb-1">
                        Quality of Service:
                        <input type="number" className="mx-2 mb-2" name="qualityOfService" value={topic.qualityOfService} onChange={handleChange} />
                    </label>
                    <div className="row d-flex justify-content-end gap-3">
                        <button className="col-md-2 col-lg-1" type="submit">Save</button>
                        <button className="col-md-2 col-lg-1" type="button" style={{ background: 'transparent', color: 'red', border: '1px solid red' }} onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            )}
        </div>
    );
}