export class Broker{
    public host: string = "";

    constructor(init?: Partial<Broker>) {
        Object.assign(this, init);
    }
}