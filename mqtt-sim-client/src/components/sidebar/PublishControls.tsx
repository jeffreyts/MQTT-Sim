import { useContext, useEffect, useState } from 'react';
import { getPublishingStatus, pausePublishing, startPublishing, publishTopic} from '../../services/apiService';
import { TopicContext } from '../../context/TopicContext';


export default function PublishControls() {
    const selectedTopic = useContext(TopicContext);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        const getPublishing = async () => {
            const publishingStatus = await getPublishingStatus();
            setPublishing(publishingStatus);
        };
        getPublishing();
    }, []);

    const startPublishingTopics = () => {
        if (publishing) return;
        const start = async () => {
            await startPublishing();
        }
        start();
        setPublishing(true);
    }

    const pausePublishingTopics = () => {
        if (!publishing) return;
        const pause = async () => {
            await pausePublishing();
        }
        pause();
        setPublishing(false);
    }

    const publishTopicOnce = async () => {
        if (!selectedTopic) return;

        const publishSelectedtopic = async () => {
            await publishTopic(selectedTopic);
        }
        publishSelectedtopic();
    }        

    return (
        <>
            <div className="row d-flex flex-row align-items-center justify-content-between px-0 mx-0 my-2 py-1">
                <label className="col fw-bold">Publishing Controls</label>
            </div>
            <div className="d-flex flex-column border p-2">
                <label className="align-self-center mb-1">Auto Publish All</label>
                <div className="d-flex flex-row align-items-center gap-3 justify-content-center py-1">
                    <button onClick={startPublishingTopics} 
                        className={`btn custom-btn-success fs-4 d-flex align-items-center justify-content-center p-1 ${publishing ? "playButtonPublishing" : ''}`}
                        style={{ width: 50, height: 30 }}>
                        <i className="bi bi-play-fill"></i>
                    </button>
                    <button onClick={pausePublishingTopics} 
                        className="btn custom-btn-danger fs-4 d-flex align-items-center justify-content-center p-1"
                        style={{ width: 50, height: 30 }}>
                        <i className="bi bi-pause-fill"></i>
                    </button>
                </div>
            </div>
            <div className="d-flex flex-column border p-2">
                <label className="align-self-center mb-1">Selected Topic Publish</label>
                <div className="d-flex flex-row align-items-center gap-3 justify-content-center py-1">
                    <button onClick={publishTopicOnce} 
                        className={`btn custom-btn-success d-flex align-items-center justify-content-center p-1`}
                        style={{ width: 50, height: 30 }}>
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </>
    )
}