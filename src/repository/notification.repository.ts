import { pool } from "../config/db.config";
import {
  CreateNotificationDBInput,
  Notification,
} from "../types/notification.types";

// create notification with idempotency handling
export const createNotification = async (
  data: CreateNotificationDBInput,
): Promise<Notification | null> => {
  const query = `
  INSERT INTO notifications (user_id, type, message, status, retry_count, max_retries, email, idempotency_key, error_message)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING *;
`;

  const values = [
    data.user_id,
    data.type,
    data.message,
    data.status,
    data.retry_count,
    data.max_retries,
    data.email,
    data.idempotency_key,
    data.error_message,
  ];

  const result = await pool.query<Notification>(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0]!;
};

// find notification by idempotency key
export const findByIdempotencyKey = async (
  idempotencyKey: string,
): Promise<Notification | null> => {
  const query = "SELECT * FROM notifications WHERE idempotency_key = $1";

  const result = await pool.query<Notification>(query, [idempotencyKey]);

  return result.rows[0] || null;
};

// update notification status
export const updateNotificationStatus = async (
  id: string,
  status: "SENT" | "FAILED",
  errorMessage: string | null = null,
) => {
  const query = `
    UPDATE notifications
    SET status = $1,
        error_message = $2,
        updated_at = NOW()
    WHERE id = $3
    RETURNING *;
  `;

  const values = [status, errorMessage, id];

  const result = await pool.query<Notification>(query, values);

  return result.rows[0] ?? null;
};

// update job_id for a notification
export const updateJobId = async (notificationId: string, jobId: string) => {
  const query = `
    UPDATE notifications
    SET job_id = $1,
        updated_at = NOW()
    WHERE id = $2
  `;

  await pool.query(query, [jobId, notificationId]);
};
