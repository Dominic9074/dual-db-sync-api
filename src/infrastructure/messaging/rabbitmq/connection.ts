import amqp, {
  Channel,
  ChannelModel,
} from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL;

if (!RABBITMQ_URL) {
  throw new Error("RABBITMQ_URL is not defined");
}

const QUEUE_NAME = "user-sync";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export const connectRabbitMQ = async (): Promise<Channel> => {
  if (channel) {
    return channel;
  }

  connection = await amqp.connect(RABBITMQ_URL);

  channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  console.log("RabbitMQ connected successfully");

  return channel;
};

export const getRabbitMQChannel = (): Channel => {
  if (!channel) {
    throw new Error("RabbitMQ is not connected");
  }

  return channel;
};

export { QUEUE_NAME };