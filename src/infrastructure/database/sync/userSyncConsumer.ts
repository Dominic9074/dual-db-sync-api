import { getRabbitMQChannel,QUEUE_NAME } from "../../messaging/rabbitmq/connection";

import { SqlUserRepository } from "../sql/repositories/SqlUserRepository";
import { User } from "../../../domain/entities/user";

interface UserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  userId: string;
  data?: {
    email?: string;
    password?: string;
    role?: "user" | "admin";
    createdAt?: string;
    updatedAt?: string;
  };
}

export const startUserSyncConsumer = async (): Promise<void> => {
  const channel = getRabbitMQChannel();

  const sqlUserRepository = new SqlUserRepository();

  await channel.consume(QUEUE_NAME, async (message) => {
    if (!message) {
      return;
    }

    try {
      const event: UserEvent = JSON.parse(
        message.content.toString()
      );

      console.log("Received event:", event.type);

      if (event.type === "user.created" || event.type === "user.updated") {
        if (!event.data) {
          throw new Error("User data is missing");
        }

        const user: User = {
          id: event.userId,
          email: event.data.email!,
          password: event.data.password!,
          role: event.data.role!,
          createdAt: new Date(event.data.createdAt!),
          updatedAt: new Date(event.data.updatedAt!),
        };

        await sqlUserRepository.upsertUser(user);
      }

      if (event.type === "user.deleted") {
        await sqlUserRepository.delete(event.userId);
      }

      channel.ack(message);

      console.log(`Processed event: ${event.type}`);
    } catch (error) {
      console.error("Failed to process RabbitMQ message:", error);

      channel.nack(message, false, true);
    }
  });

  console.log(`User sync consumer listening on ${QUEUE_NAME}`);
};