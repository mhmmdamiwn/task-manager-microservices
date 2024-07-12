import { RabbitMQHelper } from '../../../Ship/Helpers/RabbitMQHelper';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export class TaskServiceListener {
    public static async startListening(channel: string) {
        await RabbitMQHelper.listen(channel, (msg) => {
            if (msg !== null) {
                const response = JSON.parse(msg.content.toString());
                const { correlationId, ...rest } = response;
                eventEmitter.emit(correlationId, rest);
            }
        });
    }

    public static getEventEmitter() {
        return eventEmitter;
    }
}
