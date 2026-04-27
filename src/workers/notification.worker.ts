import { Worker, Job } from "bullmq";
import { redisConfig } from "../config/redis.config";
import { updateNotificationStatus } from "../repository/notification.repository";
import { pool } from "../config/db.config";

const worker = new Worker(
  "notification-queue",
  async (job: Job) => {
    const { notificationId, email, message } = job.data;

    try {
      console.log(`Processing job ${job.id} | attempt ${job.attemptsMade + 1}`);

      // simulate email sending
      await new Promise((res) => setTimeout(res, 2000));

      console.log(`Email sent to: ${email}`);

      // success
      await updateNotificationStatus(notificationId, "SENT"); 
      
    } catch (error) {
      console.error(`Job ${job.id} failed on attempt ${job.attemptsMade + 1}`);

      // update retry_count in DB
      await pool.query(
        `UPDATE notifications
         SET retry_count = $1,
             error_message = $2,
             updated_at = NOW()
         WHERE id = $3`,
        [
          job.attemptsMade + 1,
          error instanceof Error ? error.message : "Unknown error",
          notificationId,
        ],
      );

      // Only mark FAILED if last attempt
      if (job.attemptsMade + 1 >= job.opts.attempts!) {
        await updateNotificationStatus(
          notificationId,
          "FAILED",
          error instanceof Error ? error.message : "Final failure",
        );
      }

      throw error;
    }
  },
  {
    connection: redisConfig,
  },
);
