import { useState, useEffect } from 'react';
import { PayloadProperty } from '../../models/PayloadProperty';
import { useContext } from "react";
import { TopicContext } from "../../context/TopicContext";
import { PropertySettingsFactory } from '../../utilities/PropertySettingsFactory';

export default function PayloadPropertiesList() {
    const selectedTopic = useContext(TopicContext);
    const contextProperties = selectedTopic?.payloadDefinition.properties || [];
    
    const [localProperties, setLocalProperties] = useState<PayloadProperty[]>(contextProperties);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(contextProperties[0]?.id ?? null);
    
    useEffect(() => {
        setLocalProperties(contextProperties);
        if (!contextProperties.some(p => p.id === selectedPropertyId)) {
            setSelectedPropertyId(contextProperties[0]?.id ?? null);
        }
    }, [contextProperties, selectedPropertyId]);
    
    const selectedProperty = localProperties.find(p => p.id === selectedPropertyId) || localProperties[0] || null;

    const addProperty = () => {
        const newProperty: PayloadProperty = {
            id: localProperties.length > 0 ? Math.max(...localProperties.map(p => p.id)) + 1 : 1,
            name: '',
            type: 'stringCategory',
            configuration: PropertySettingsFactory.createPropertySettings('stringCategory')        
        }
        const updated = [...localProperties, newProperty];
        if (selectedTopic) {
           selectedTopic.payloadDefinition.properties = updated;
        }
        setSelectedPropertyId(newProperty.id);
    }

    const setProperty = (property: PayloadProperty) => () => {
        setSelectedPropertyId(property.id);
    }

    const removeProperty = (id: number) => {
        const updated = localProperties.filter(property => property.id !== id);
        if (selectedTopic) {
            selectedTopic.payloadDefinition.properties = updated;
        }
        
        if (selectedPropertyId === id) {
            setSelectedPropertyId(updated[0]?.id ?? null);
        }
    }

    const updateProperty = (id: number, updatedProperty: Partial<PayloadProperty>) => {
        const updated = localProperties.map(property => 
            property.id === id ? { ...property, ...updatedProperty } : property
        );
        setLocalProperties(updated);
        if (selectedTopic) {
            selectedTopic.payloadDefinition.properties = updated;
        }
    }

    const onTypeChange = (type: string) => {
        if (!selectedProperty) return;
        const newConfig = PropertySettingsFactory.createPropertySettings(type);
        updateProperty(selectedProperty.id, { type, configuration: newConfig });
    }

    const onNameChange = (name: string) => {
        if (!selectedProperty) return;
        updateProperty(selectedProperty.id, { name });
    }

    const onConfigurationChange = (key: string, value: string | number | boolean) => {
        if (!selectedProperty) return;
        const updatedConfiguration = new Map(selectedProperty.configuration);
        if (value === undefined || value === null) {
            updatedConfiguration.delete(key);
        } else {
            updatedConfiguration.set(key, value);
        }
        updateProperty(selectedProperty.id, { configuration: updatedConfiguration });
    };

    return (
        <div className="d-flex flex-column h-100 p-0 border-end" style={{ overflow: 'none' }}>
            <div className="flex-fill">
                <div className="row d-flex flex-row align-items-center justify-content-between mx-0 my-2 p-0">
                    <label className="col-7 fw-bold">Payload Properties</label>
                    <div className="col-5 d-flex flex-row gap-2 justify-content-end">
                        <button onClick={addProperty}
                            style={{ width: 40, height: 30 }}
                            className="btn custom-btn-secondary fw-bold fs-4 d-flex align-items-center justify-content-center p-1">
                            <i className="bi bi-plus"></i>
                        </button>
                        <button onClick={selectedProperty ? () => removeProperty(selectedProperty?.id) : () => {}}
                            style={{ width: 40, height: 30 }}
                            className="btn custom-btn-secondary d-flex align-items-center justify-content-center p-1">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="row w-100 d-flex flex-column overflow-auto m-0 p-0">
                    {localProperties.map(t => (
                        <div key={t.id} className="m-0 p-0">
                            <button
                                type="button"
                                onClick={setProperty(t)}
                                title={t.name}
                                className={`btn btn-sm text-start btn-list${selectedProperty?.id === t.id ? ' active' : ''} border-top border-bottom rounded-0 w-100 d-flex justify-content-between`}
                                style={{ minHeight: '28px' }}
                            >
                                <span>{t.name}</span>
                                <span>{t.type}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div id="property-details-grid" className="flex-fill overflow-auto border-top">
                <div className="row d-flex flex-row align-items-center justify-content-between mx-0 my-2 p-0">
                    <span className="fw-bold">Property Configuration</span>
                </div>
                {selectedProperty && (
                    <>
                        <div className="row justify-content-center my-2 mx-0 px-1 gap-1">
                             <div className="col p-0">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Property Name"
                                        onChange={(e) => onNameChange(e.target.value)}
                                        value={selectedProperty.name || ''}
                                    />
                            </div>
                            <div className="col-6 p-0">
                                <select className="form-select" onChange={(e) => onTypeChange(e.target.value)} value={selectedProperty.type}>
                                    <option value="stringCategory">String: category</option>
                                    <option value="numberRandom">Number: Random</option>
                                    <option value="numberNormal">Number: Normal Dist</option>
                                    <option value="timestamp">Timestamp</option>
                                    <option value="boolean">Boolean</option>
                                </select>
                            </div>
                        </div>
                        <div className="row m-0">
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tbody>
                                     {selectedProperty ? [...selectedProperty.configuration.entries()].map(([key, value]) => (
                                        <tr key={key}>
                                            <td className='border border-secondary fw-bold p-1'>
                                                {key}
                                            </td>
                                            <td className="border border-secondary p-1">
                                                {typeof value === 'boolean' ? (
                                                    <input
                                                        type="checkbox"
                                                        checked={value}
                                                        onChange={e => onConfigurationChange(key, e.target.checked)}
                                                    />
                                                ) : typeof value === 'number' ? (
                                                    <input
                                                        type="number"
                                                        value={value}
                                                        onChange={e => onConfigurationChange(key, Number(e.target.value))}
                                                        className="form-control-plaintext p-0 m-0 w-100"
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={e => onConfigurationChange(key, e.target.value)}
                                                        className="form-control-plaintext p-0 m-0 w-100"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                        )) : (
                                        <tr>
                                            <td colSpan={2} className="text-center text-secondary">
                                                Select a property to configure
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}