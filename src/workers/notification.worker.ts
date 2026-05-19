import { Worker, Job } from "bullmq";
import { redisConfig } from "../config/redis.config";
import { updateNotificationStatus } from "../repository/notification.repository";
import { pool } from "../config/db.config";
import logger from "../config/logger.config";
import { sendEmail } from "../providers/email.provider";
import { sendSMS } from "../providers/sms.provider";
import { sendPush } from "../providers/push.provider";

const worker = new Worker(
  "notification-queue",
  async (job: Job) => {
    const { notificationId, email, phone, deviceId, message, type } = job.data;

    try {
      logger.info("Processing job", {
        jobId: job.id,
        attempt: job.attemptsMade + 1,
        notificationId,
        email,
      });

      switch (type) {
        case "EMAIL":
          // simulate email sending
          await sendEmail(email, "Notification", message);
          break;

        case "SMS":
          // simulate phone number retrieval from email (for demo purposes)
          await sendSMS(phone, message);
          break;

        case "PUSH":
          // simulate device ID retrieval from email (for demo purposes)
          await sendPush(deviceId, message);
          break;

        default:
          throw new Error("Unsupported notification type");
      }

      logger.info("Email sent", {
        jobId: job.id,
        notificationId,
        email,
      });

      // success
      await updateNotificationStatus(notificationId, "SENT");
    } catch (error) {
      logger.error("Job failed", {
        jobId: job.id,
        attempt: job.attemptsMade + 1,
        notificationId,
        error: error instanceof Error ? error.message : error,
      });

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

worker.on("completed", (job) => {
  logger.info("Job completed", {
    jobId: job.id,
    notificationId: job.data.notificationId,
  });
});

worker.on("failed", (job, err) => {
  logger.error("Job failed event", {
    jobId: job?.id,
    notificationId: job?.data?.notificationId,
    error: err.message,
  });
});
