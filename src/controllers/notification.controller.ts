import { NextFunction, Request, Response } from "express";
import { createNotificationService } from "../service/notification.service";

export const createNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      user_id,
      type,
      message,
    } = req.body;

    const idempotencyKey = req.header("idempotency_key");

    if (!idempotencyKey) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Idempotency-key header is required",
        });
    }

    const notitication = await createNotificationService({
      user_id,
      type,
      message,
      idempotency_key: idempotencyKey,
    });

    return res.status(201).json({ success: true, data: notitication });
  } catch (error) {
    next(error);
  }
};
