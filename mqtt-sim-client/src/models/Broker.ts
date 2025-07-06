export class Broker{
    public host: string = "";
    public port: number = 1883;

    constructor(init?: Partial<Broker>) {
        Object.assign(this, init);
    }
}