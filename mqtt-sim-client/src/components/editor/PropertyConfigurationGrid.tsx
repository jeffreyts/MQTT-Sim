
interface PropertyConfigurationGridProps {
    type: string;
    name?: string;
    properties: Map<string, any>;
    onPropertyChange: (key: string, value: string | number | boolean) => void;
    onTypeChange: (type: string) => void;
    onNameChange?: (name: string) => void;
}

export default function PropertyConfigurationGrid({properties, name, type, onTypeChange, onNameChange, onPropertyChange}: PropertyConfigurationGridProps ) {

    const typeChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = event.target.value;
        if (newType !== type) {
            onTypeChange(newType);
        }
    }

    const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        if (onNameChange) {
            onNameChange(newName);
        }
    }

    const onChange = (key: string, value: string | number | boolean) => {
        onPropertyChange(key, value);
    }

    return (
        <div className="container-fluid">
            <div className="row my-2 mx-0">
                <div className="col-7">
                    <input type="text"
                        className="form-control"
                        placeholder="Property Name"
                        onChange={nameChanged}
                        value={name}
                    />
                </div>
                <div className="col-5">
                    <select className="form-select" onChange={typeChanged} value={type}>
                        <option value="stringCategory">String: category</option>
                        <option value="numberRandom">Number: Random</option>
                        <option value="numberNormal">Number: Normal Dist</option>
                        <option value="boolean">Boolean</option>
                    </select>
                </div>
            </div>
            <div className="row m-0">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
                 {[...properties.entries()].map(([key, value]) => (
                    <tr key={key}>
                        <td style={{ border: '1px solid #ccc', padding: '4px', width: '40%' }}>
                            {key}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '4px' }}>
                            {typeof value === 'boolean' ? (
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => onChange(key, e.target.checked)}
                                />
                            ) : typeof value === 'number' ? (
                                <input
                                    type="number"
                                    value={value}
                                    onChange={e => onChange(key, Number(e.target.value))}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={value}
                                    onChange={e => onChange(key, e.target.value)}
                                />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </div>
    );
}