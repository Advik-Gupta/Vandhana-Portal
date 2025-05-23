import Machine from "../models/machineModel.js";

import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all machines
// @route   GET /api/machines
// @access  Admin

export const getMachines = asyncHandler(async (req, res) => {
  try {
    const machines = await Machine.find({});
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch single machine
// @route   GET /api/machines/:id
// @access  Admin

export const getMachineById = asyncHandler(async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      res.json(machine);
    } else {
      res.status(404).json({ message: "Machine not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
