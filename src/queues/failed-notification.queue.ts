import { Queue } from "bullmq";
import { redisConfig } from "../config/redis.config";

export const failedNotificationQueue = new Queue(
  "failed-notification-queue",
  {
    connection: redisConfig,
  },
);