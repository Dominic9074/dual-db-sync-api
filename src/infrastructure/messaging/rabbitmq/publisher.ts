import {
  getRabbitMQChannel,
  QUEUE_NAME,
} from "./connection";


export interface UserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  userId: string;
  data?: {
    email?: string;
    password?: string;
    role?: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export const publishUserEvent = (event: UserEvent): void => {
  const channel = getRabbitMQChannel();

  const message = Buffer.from(JSON.stringify(event));

  channel.sendToQueue(QUEUE_NAME, message, {
    persistent: true,
  });

  console.log(`RabbitMQ event published: ${event.type}`);
};
