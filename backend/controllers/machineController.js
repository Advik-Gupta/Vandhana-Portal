import Machine from "../models/machineModel.js";

import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all machines
// @route   GET /api/machines
// @access  Admin

export const getMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find({});
  res.json(machines);
});

// @desc    Fetch single machine
// @route   GET /api/machines/:id
// @access  Admin

export const getMachineById = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id);
  if (machine) {
    res.json(machine);
  } else {
    res.status(404).json({ message: "Machine not found" });
  }
});
