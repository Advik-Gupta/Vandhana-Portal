import express from "express";
import {
  sendNotification,
  sendMailNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/send", sendNotification);
router.post("/mailNotification", sendMailNotification);

export default router;
