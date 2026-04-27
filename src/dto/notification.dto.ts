export interface CreateNotificationInput {
  user_id: string;
  type: string;
  message: string;
  email?: string;
  idempotency_key: string;
}