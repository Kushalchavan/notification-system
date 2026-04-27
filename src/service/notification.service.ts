import { CreateNotificationInput } from "../dto/notification.dto";
import {
  createNotification,
  findByIdempotencyKey,
} from "../repository/notification.repository";
import {
  CreateNotificationDBInput,
  Notification,
} from "../types/notification.types";

export const createNotificationService = async (
  data: CreateNotificationInput,
): Promise<Notification> => {
  
  // Convert DTO → DB input
  const dbInput: CreateNotificationDBInput = {
    user_id: data.user_id,
    type: data.type,
    message: data.message,
    status: "PENDING",
    retry_count: 0,
    max_retries: 3,
    idempotency_key: data.idempotency_key ?? null,
    error_message: null,
    email: data.email ?? null,
  };

  //  Try insert (race-safe)
  const created = await createNotification(dbInput);

  if (created) return created;

  //  Handle idempotency conflict
  const existing = await findByIdempotencyKey(data.idempotency_key);

  if (!existing) {
    throw new Error("Idempotency conflict but no record found");
  }

  return existing;
};
