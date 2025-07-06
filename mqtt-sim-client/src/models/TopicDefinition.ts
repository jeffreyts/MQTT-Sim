// Assuming MqttQos is an enum or type defined elsewhere in your project
import { MqttQos } from './MqttQos';
import { PayloadDefinition } from './PayloadDefinition';

export class TopicDefinition {
    // Unique Identifier
    uid: number = -1;

    // Topic Name
    name: string = '';

    // Publishing interval in milliseconds
    intervalMilliseconds: number = 1000;

    // QoS to use for publishing messages
    qualityOfService: MqttQos = MqttQos.AtMostOnce;

    // Retain flag for the topic
    retain: boolean = false;

    // Flag indicating if the topic should be auto-published
    autoPublish: boolean = false;

    // Defines the payload for this topic
    payloadDefinition: PayloadDefinition = new PayloadDefinition();

    constructor( init?: Partial<TopicDefinition>){
        Object.assign(this, init);
    }
}

export default TopicDefinition;