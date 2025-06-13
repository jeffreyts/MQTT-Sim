import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export default function TopicEditor() {
    const selectedTopic = useSelector((state: RootState) => state.slice.value);
    
    return (
    <div className="bg-body-tertiary d-flex flex-column flex-grow-1 p-0 h-100">
        <div className="d-flex flex-row align-items-center justify-content-between p-3 border-bottom border-secondary-subtle">
        <h2>{selectedTopic?.name}</h2>
        <button className="btn btn-primary">
            <i className="bi bi-save"></i> Save
        </button>
        </div>
        <div className="p-3">
        <p>Details</p>
        </div>
    </div>
    );
}