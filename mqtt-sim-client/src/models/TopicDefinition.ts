// Assuming MqttQos is an enum or type defined elsewhere in your project
import { MqttQos } from './MqttQos';

export class TopicDefinition {
    // Unique Identifier
    uid: number = -1;

    // Topic Name
    name: string = '';

    // Maximum Value
    maximumValue: number = 0;

    // Minimum Value
    minimumValue: number = 0;

    // Publishing interval in milliseconds
    intervalMilliseconds: number = 1000;

    // QoS to use for publishing messages
    qualityOfService: MqttQos = MqttQos.AtMostOnce;

    constructor( init?: Partial<TopicDefinition>){
        Object.assign(this, init);
    }
}

export default TopicDefinition;