import express from "express";
const router = express.Router();

import {
  getMachines,
  getMachineById,
  getLatestDueDate,
  updateLatestDueDate,
} from "../controllers/machineController.js";

router.route("/").get(getMachines);
router.route("/:id").get(getMachineById);
router.route("/:id/date").get(getLatestDueDate).patch(updateLatestDueDate);

export default router;
