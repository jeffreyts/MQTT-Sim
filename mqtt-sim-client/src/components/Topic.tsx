import { useState } from "react";
import TopicDefinition from "../models/TopicDefinition";
import dropdownArrowUp from "../assets/dropdown-arrow-up.svg";
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
        <div className="mb-3 mx-3 p-2 bg-body border border-1 rounded-3 text-body">
            <div className="d-flex align-items-center justify-content-between">
                <input type="text" className="form-control-plaintext flex-grow-1 me-2" name="name" value={topic.name} onChange={handleChange}/>
                <button className="btn d-flex align-items-center justify-content-center p-0" style={{minWidth:40, minHeight:40, width:40, height:40}} onClick={toggleExpand} aria-label={isExpanded ? "Collapse" : "Expand"}>
                  <img
                    src={isExpanded ? dropdownArrowUp : dropdownArrowDown}
                    alt="dropdown arrow"
                    className=""
                    style={{width:24, height:24}}
                  />
                </button>
            </div>
            {isExpanded && (
                <form className="row gx-2 gy-1 mt-2" onSubmit={handleSave}>
                    <label className="col-12 col-md-6 col-lg-3">
                        <span className="form-label">Maximum Value:</span>
                        <input type="number" className="form-control mb-2" name="maximumValue" value={topic.maximumValue} onChange={handleChange} />
                    </label>
                    <label className="col-12 col-md-6 col-lg-3">
                        <span className="form-label">Minimum Value:</span>
                        <input type="number" className="form-control mb-2" name="minimumValue" value={topic.minimumValue} onChange={handleChange} />
                    </label>
                    <label className="col-12 col-md-6 col-lg-3">
                        <span className="form-label">Interval (ms):</span>
                        <input type="number" className="form-control mb-2" name="intervalMilliseconds" value={topic.intervalMilliseconds} onChange={handleChange} />
                    </label>
                    <label className="col-12 col-md-6 col-lg-3">
                        <span className="form-label">Quality of Service:</span>
                        <input type="number" className="form-control mb-2" name="qualityOfService" value={topic.qualityOfService} onChange={handleChange} />
                    </label>
                    <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                        <button className="btn btn-primary" type="submit">Save</button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            )}
        </div>
    );
}