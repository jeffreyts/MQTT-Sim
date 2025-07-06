import { useEffect, useState } from "react";
import { connectToBroker, disconnectBroker, getBrokerStatus } from "../../services/apiService";
import { BrokerStatus } from "../../models/BrokerStatus";
import { ConnectionStatus } from "../../models/ConnectionStatus";

export default function Broker() {
    const [brokerUrl, setBrokerUrl] = useState<string>('');
    const [brokerPort, setBrokerPort] = useState<number>(1883);
    const [brokerStatus, setBroker] = useState<BrokerStatus>(new BrokerStatus());

    useEffect(() => {
            const getStatus = async () => {
                const brokerStatus = await getBrokerStatus();
                setBroker(brokerStatus);
                setBrokerUrl(brokerStatus.host);
            };
            getStatus();
        }, []);
    
    const connect = async () => {
        try {
            const status = await connectToBroker({ host: brokerUrl, port: brokerPort });
            setBroker(status);
        }
        catch (error) {
            console.error("Error connecting to broker:", error);
            setBroker(new BrokerStatus({ status: ConnectionStatus.Error, statusMessage: "Failed to connect" }));
        }
    }

    const disconnect = async () => {
        try {
            const status = await disconnectBroker();
            setBroker(status);
        }
        catch (error) {
            console.error("Error connecting to broker:", error);
            setBroker(new BrokerStatus({ status: ConnectionStatus.Error, statusMessage: "Failed to connect" }));
        }
    }

    return (
        <>
            <div className="row d-flex flex-row align-items-center justify-content-between px-0 mx-0 my-2 py-1">
                <label className="col fw-bold">Broker Setup</label>
            </div>
            <form className="container" onSubmit={e => { e.preventDefault(); connect(); }}>
                <div className="row align-items-center mb-2">
                    <label htmlFor="broker-url" className="col-4 text-end">Broker URL</label>
                    <div className="col-8">
                        <input 
                            id="broker-url"
                            type="text" 
                            value={brokerUrl} 
                            className="form-control"
                            placeholder="Broker URL" 
                            aria-label="Broker URL" 
                            onChange={(e) => setBrokerUrl(e.target.value)}
                        />
                    </div>
                </div>
                 <div className="row align-items-center mb-2">
                    <label htmlFor="broker-port" className="col-4 text-end">Broker Port</label>
                    <div className="col-8">
                        <input 
                            id="broker-port"
                            type="number" 
                            value={brokerPort} 
                            className="form-control"
                            placeholder="Broker Port" 
                            aria-label="Broker Port" 
                            onChange={(e) => setBrokerPort(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="row align-items-center mb-2">
                    <label htmlFor="broker-status" className="col-4 text-end">Status</label>
                    <div className="col-8">
                        <input
                            id="broker-status"
                            type="text"
                            value={brokerStatus.status.toString()}
                            className="form-control"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row align-items-center mb-2">
                    <label htmlFor="broker-message" className="col-4 text-end">Message</label>
                    <div className="col-8">
                        <input
                            id="broker-message"
                            type="text"
                            value={brokerStatus.statusMessage}
                            className="form-control"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row align-items-center mb-2">
                    <label htmlFor="broker-last-status" className="col-4 text-end">Last Status</label>
                    <div className="col-8">
                        <input
                            id="broker-last-status"
                            type="text"
                            value={
                                brokerStatus.statusTime
                                    ? (() => {
                                        const date = new Date(brokerStatus.statusTime);
                                        return isNaN(date.getTime())
                                            ? ''
                                            : date.toLocaleDateString() + " " + date.toLocaleTimeString();
                                    })()
                                    : ''
                            }
                            className="form-control"
                            readOnly
                        />
                    </div>
                </div>
                <div className="row mt-2 gap-4 justify-content-center">
                    <button className="col-5 btn custom-btn-primary" type="submit" style={{ width: 130 }}>
                        <i className="bi bi-plug"></i> Connect
                    </button>
                    <button className="col-5 btn custom-btn-danger" type="button" onClick={disconnect} style={{ width: 130 }}>
                        <i className="bi bi-x-circle"></i> Disconnect
                    </button>
                </div>
            </form>
        </>
    );
}