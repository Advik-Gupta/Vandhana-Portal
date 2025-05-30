import express from "express";
import { sendNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/send", sendNotification);

export default router;
