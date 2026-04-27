export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  status: NotificationStatus;
  retry_count: number;
  max_retries: number;
  email: string | null;
  idempotency_key: string | null;
  error_message?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNotificationDBInput {
  user_id: string;
  type: string;
  message: string;
  status: NotificationStatus;
  retry_count: number;
  max_retries: number;
  idempotency_key: string | null;
  error_message: string | null;
  email: string | null;
}