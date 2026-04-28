import express from "express";

const router = express.Router();

import { createNotificationController } from "../controllers/notification.controller";
import { notificationRateLimiter } from "../middlewares/ratelimit.middleware";

router.post(
  "/notifications",
  notificationRateLimiter,
  createNotificationController,
);

export default router;
