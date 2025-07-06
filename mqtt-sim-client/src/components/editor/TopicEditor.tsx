import { useContext } from "react";
import TopicPropertiesEditor from "./TopicPropertiesEditor";
import PayloadPropertiesList from "./PayloadPropertiesList";
import PayloadEditor from "./PayloadEditor";
import { TopicContext } from "../../context/TopicContext";
import { addOrUpdateTopic } from "../../services/apiService";

export default function TopicEditor() {
    const selectedTopic = useContext(TopicContext);

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (selectedTopic) {
            try {
                await addOrUpdateTopic(selectedTopic);
            } catch (error) {
                console.error("Error saving topic:", error);
            }
        }
    }

    if (!selectedTopic) {
        return (
            <div className="d-flex flex-row align-items-center justify-content-between p-3 border-bottom">
                <h2>Select a topic</h2>
            </div>
        );
    }

    return (
        <>
            <div className="contianer-fluid bg-body-tertiary d-flex flex-column flex-grow-1 p-0 h-100">
                <div className="d-flex flex-row align-items-center justify-content-between p-3 border-bottom gap-1">
                    <h4 className="flex-fill p-0 m-0" 
                        style={{ 
                            overflowX: 'auto', 
                            overflowY: 'hidden' 
                        }}
                    >
                        {selectedTopic?.name === "" ? "Select a topic": selectedTopic?.name}
                    </h4>
                    <button className="btn custom-btn-primary" type="button" onClick={handleSave}>
                        <i className="bi bi-floppy"></i>
                    </button>
                </div>
                <TopicPropertiesEditor />
                <div className="row h-100 m-0 border-top">
                    <div className="col-5 mx-0 p-0 h-100 border-end">
                        <PayloadPropertiesList />
                    </div>
                    <div className="col-7 m-0 p-0 h-100 border-end">
                        <PayloadEditor />
                    </div>
                </div>
            </div>
            
        </>
    );
}