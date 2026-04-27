import { Worker } from "bullmq";
import { redisConfig } from "../config/redis.config";

const worker = new Worker(
  "notification-queue",
  async (job) => {
    console.log("Processing job:", job.data);

    // simulate email sending
    await new Promise((res) => setTimeout(res, 2000));

    console.log("Email sent to:", job.data.email);
  },
  {
    connection: redisConfig,
  },
);
