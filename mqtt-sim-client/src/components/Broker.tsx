import { useEffect, useState } from "react";
import styles from "./Broker.module.css";
import { connectToBroker, disconnectBroker, getBrokerStatus } from "../services/apiService";
import { BrokerStatus } from "../models/BrokerStatus";
import { ConnectionStatus } from "../models/ConnectionStatus";

export default function Broker() {
    const [brokerUrl, setBrokerUrl] = useState<string>('');
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
            const status = await connectToBroker({ host: brokerUrl });
            setBroker(status);
        }
        catch (error) {
            console.error("Error connecting to broker:", error);
            setBroker(new BrokerStatus({ status: ConnectionStatus.Error, statusMessage: "Failed to connect" }));
        }
    };

    const disconnect = async () => {
        try {
            const status = await disconnectBroker();
            setBroker(status);
        }
        catch (error) {
            console.error("Error connecting to broker:", error);
            setBroker(new BrokerStatus({ status: ConnectionStatus.Error, statusMessage: "Failed to connect" }));
        }
    };

    return (
        <form className={`container-fluid`} onSubmit={e => { e.preventDefault(); connect(); }}>
            <div className="row align-items-center mb-2">
                <label htmlFor="broker-url" className="col-3 text-end">Broker URL:</label>
                <div className="col-9">
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
                <label htmlFor="broker-status" className="col-3 text-end">Status:</label>
                <div className="col-9">
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
                <label htmlFor="broker-message" className="col-3 text-end">Message:</label>
                <div className="col-9">
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
                <label htmlFor="broker-last-status" className="col-3 text-end">Last Status:</label>
                <div className="col-9">
                    <input
                        id="broker-last-status"
                        type="text"
                        value={brokerStatus.statusTime ? `${brokerStatus.statusTime.getMonth()+1}/${brokerStatus.statusTime.getDate()}/${brokerStatus.statusTime.getFullYear()} ${brokerStatus.statusTime.getHours()}:${brokerStatus.statusTime.getMinutes()}:${brokerStatus.statusTime.getSeconds()}` : ''}
                        className="form-control"
                        readOnly
                    />
                </div>
            </div>
            <div className="row mt-2 gap-4 justify-content-center">
                <button className="col-5" type="submit">Connect</button>
                <button className="col-5 button-danger" type="button" onClick={disconnect}>Disconnect</button>
            </div>
        </form>
    );
}