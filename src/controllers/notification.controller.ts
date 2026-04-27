import { NextFunction, Request, Response } from "express";
import { createNotificationService } from "../service/notification.service";
import { notificationQueue } from "../queues/notification.queue";

export const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, type, message, email } = req.body;

    const idempotencyKey = req.header("idempotency_key");

    if (!idempotencyKey) {
      return res.status(400).json({
        success: false,
        message: "Idempotency-key header is required",
      });
    }

    const notification = await createNotificationService({
      user_id,
      type,
      email,
      message,
      idempotency_key: idempotencyKey,
    });

    await notificationQueue.add("send-notification", {
      type,
      message,
      email,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "notification queued",
        data: notification,
      });
  } catch (error) {
    next(error);
  }
};
