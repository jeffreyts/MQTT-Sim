import { MqttQos } from "../../models/MqttQos";
import { useContext, useState } from   "react";
import { TopicContext } from "../../context/TopicContext";

export default function TopicPropertiesEditor() {
    const topicDefinition = useContext(TopicContext);
    const [intervalMilliseconds, setIntervalMilliseconds] = useState(topicDefinition?.intervalMilliseconds || 1000);
    const [qualityOfService, setQualityOfService] = useState(topicDefinition?.qualityOfService || MqttQos.AtMostOnce);
    const [retain, setRetain] = useState(topicDefinition?.retain || false);
    const [autoPublish, setAutoPublish] = useState(topicDefinition?.autoPublish || false);
    
    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (topicDefinition) {
            topicDefinition.intervalMilliseconds = Number(e.target.value);
            setIntervalMilliseconds(Number(e.target.value));
        }
    }

    const handleQosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (topicDefinition) {
            topicDefinition.qualityOfService = Number(e.target.value);
            setQualityOfService(Number(e.target.value));
        }
    }

    const handleRetainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (topicDefinition) {
            topicDefinition.retain = e.target.checked;
            setRetain(e.target.checked);
        }
    }

    const handleAutoPublishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (topicDefinition) {
            topicDefinition.autoPublish = e.target.checked;
            setAutoPublish(e.target.checked);
        }
    }

    return (
        <div className="container-fluid">
            <form className="row mb-3 mt-1 g-3 align-items-center">
                <div className="col-md-4 col-xl-3">
                    <label htmlFor="publishInterval" className="form-label">Publish Interval (ms)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="publishInterval" 
                        value={intervalMilliseconds}
                        onChange={handleIntervalChange}
                        placeholder="Publish Interval" 
                    />
                </div>
                <div className="col-md-4 col-xl-3">
                    <label htmlFor="qos" className="form-label">Quality of Service</label>
                    <select 
                        className="form-select" 
                        id="qos"
                        value={qualityOfService}
                        onChange={handleQosChange}
                    >
                        <option value={MqttQos.AtMostOnce}>0: At Most Once</option>
                        <option value={MqttQos.AtLeastOnce}>1: At Least Once</option>
                        <option value={MqttQos.ExactlyOnce}>2: Exactly Once</option>
                    </select>
                </div>
                <div className="col-3 d-flex flex-column">
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="retain"
                            checked={retain}
                            onChange={handleRetainChange}
                        />
                        <label className="form-check-label" htmlFor="retain">
                            Retain Messages
                        </label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="autoPublish"
                            checked={autoPublish}
                            onChange={handleAutoPublishChange}
                        />
                        <label className="form-check-label" htmlFor="retain">
                            Auto Publish
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}