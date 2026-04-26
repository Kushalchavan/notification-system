export interface CreateNotificationInput {
  user_id: string;
  type: string;
  message: string;
  idempotency_key: string;
}