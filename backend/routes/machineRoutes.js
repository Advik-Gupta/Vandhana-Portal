import express from "express";
const router = express.Router();

import {
  getMachines,
  getMachineById,
} from "../controllers/machineController.js";

router.route("/").get(getMachines);
router.route("/:id").get(getMachineById);

export default router;
