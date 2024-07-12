import amqp, { Connection, Channel, Message } from 'amqplib';

export class RabbitMQHelper {
    private static connection: Connection;
    private static channel: Channel;

    public static async connect(url: string): Promise<void> {
        try {
            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
            throw error;
        }
    }

    public static async sendMessage(queue: string, message: string): Promise<void> {
        try {
            await this.channel.assertQueue(queue, { durable: false });
            this.channel.sendToQueue(queue, Buffer.from(message));
        } catch (error) {
            console.error('Failed to send message to RabbitMQ', error);
            throw error;
        }
    }

    public static async listen(queue: string, callback: (msg: Message | null) => void): Promise<void> {
        try {
            await this.channel.assertQueue(queue, { durable: false });
            await this.channel.consume(queue, callback, { noAck: true });
        } catch (error) {
            console.error('Failed to listen to queue on RabbitMQ', error);
            throw error;
        }
    }

    /**
     * Close the RabbitMQ connection
     */
    public static async close(): Promise<void> {
        try {
            await this.channel.close();
            await this.connection.close();
            console.log('RabbitMQ connection closed');
        } catch (error) {
            console.error('Failed to close RabbitMQ connection', error);
            throw error;
        }
    }
}
