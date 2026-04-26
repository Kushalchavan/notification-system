import express from "express";

const router = express.Router();

import { createNotificationController } from "../controllers/notification.controller";

router.post("/notifications", createNotificationController);

export default router;
