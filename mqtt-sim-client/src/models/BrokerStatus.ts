import { ConnectionStatus } from "./ConnectionStatus";

export class BrokerStatus {
    public host: string = "";
    public status: ConnectionStatus = ConnectionStatus.Disconnected;
    public statusMessage: string = "";
    public statusTime: Date = new Date();

    constructor(init?: Partial<BrokerStatus>) {
        Object.assign(this, init);
    }
}