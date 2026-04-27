import { Queue } from "bullmq";
import { redisConfig } from "../config/redis.config";

export const notificationQueue = new Queue("notification-queue", {
  connection: redisConfig,
});
