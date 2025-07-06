import { useContext, useEffect, useState } from "react";
import { TopicContext } from "../../context/TopicContext";

export default function PayloadEditor() {
    const selectedTopic = useContext(TopicContext);
    const [value, setValue] = useState(selectedTopic?.payloadDefinition?.template || '');

    useEffect(() => {
        if (selectedTopic) {
            setValue(selectedTopic.payloadDefinition.template);
        }
    }, [selectedTopic]);
    
    const onChange = (newValue: string) => {
        if (selectedTopic) {
            setValue(newValue);
            selectedTopic.payloadDefinition.template = newValue;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const newValue = value.substring(0, start) + "  " + value.substring(end);
        setValue(newValue);
        if (selectedTopic) {
            selectedTopic.payloadDefinition.template = newValue;
        }
        // Move cursor after the tab
        setTimeout(() => {
            target.selectionStart = target.selectionEnd = start + 2;
        }, 0);
    }
};

    return (
        <div className="container-fluid d-flex flex-column h-100">
            <label className="form-label fw-bold my-1">Payload Editor</label>
            <textarea
                className="form-control font-monospace"
                style={{ minHeight: '300px', height: '100%', resize: 'vertical' }}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={'{\n  "timestamp": "{{timestamp}}",\n  "value": "{{value}}"\n}'}
                spellCheck={false}
                contentEditable="true"
                onKeyDown={handleKeyDown}
            />
            <div className="form-text mt-1">
                Use <code>&#123;&#123;propertyName&#125;&#125;</code> to insert payload properties.
            </div>
        </div>
    );
}