import { useEffect, useState } from "react";
import styles from "./Broker.module.css";
import { connectToBroker, disconnectBroker, getBrokerStatus } from "../services/apiService";
import { BrokerStatus } from "../models/BrokerStatus";
import { ConnectionStatus } from "../models/ConnectionStatus";

const Broker = () => {
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
        <form className={`row ${styles.contentContainer}`} onSubmit={e => { e.preventDefault(); connect(); }}>
            <label htmlFor="broker-url" className={styles.item}>Broker URL:</label>
            <input 
                id="broker-url"
                type="text" 
                value={brokerUrl} 
                className={styles.item}
                placeholder="Broker URL" 
                aria-label="Broker URL" 
                onChange={(e) => setBrokerUrl(e.target.value)}
            />
            <label htmlFor="broker-status" className={styles.item}>Status:</label>
            <input
                id="broker-status"
                type="text"
                value={brokerStatus.status.toString()}
                className={styles.item}
                readOnly
            />
            <label htmlFor="broker-message" className={styles.item}>Message:</label>
            <input
                id="broker-message"
                type="text"
                value={brokerStatus.statusMessage}
                className={styles.item}
                readOnly
            />
            <label htmlFor="broker-last-status" className={styles.item}>Last Status:</label>
            <input
                id="broker-last-status"
                type="text"
                value={brokerStatus.statusTime ? `${brokerStatus.statusTime.getMonth()+1}/${brokerStatus.statusTime.getDate()}/${brokerStatus.statusTime.getFullYear()} ${brokerStatus.statusTime.getHours()}:${brokerStatus.statusTime.getMinutes()}:${brokerStatus.statusTime.getSeconds()}` : ''}
                className={styles.item}
                readOnly
            />
            <button className={styles.item} type="submit">Connect</button>
            <button className={styles.item} type="button" style={{ background: 'transparent', color: 'red', border: '1px solid red' }} onClick={disconnect}>Disconnect</button>
        </form>
    );
}

export default Broker;