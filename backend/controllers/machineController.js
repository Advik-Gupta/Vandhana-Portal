import jwt from "jsonwebtoken";

import Machine from "../models/machineModel.js";
import User from "../models/userModel.js";

import asyncHandler from "../middleware/asyncHandler.js";

import { generateTestSites } from "./utilityFunctions.js";

// @desc    Fetch all machines
// @route   GET /api/v1/machines
// @access  Admin

export const getMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find({});
  res.json(machines);
});

// @desc    Fetch single machine
// @route   GET /api/v1/machines/:id
// @access  Admin

export const getMachineById = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id);
  if (machine) {
    res.json(machine);
  } else {
    res.status(404).json({ message: "Machine not found" });
  }
});

// @desc    Fetch latest due date for a machine
// @route   GET /api/v1/machines/:id/date
// @access  Public

export const getLatestDueDate = asyncHandler(async (req, res) => {
  const machine = await Machine.findById(req.params.id);
  if (machine) {
    let latestDueDate;

    machine.testSites.forEach((site, index) => {
      const grindingDate = site.nextGrindingDueDate;
      const repaintingDate = site.nextRepaintingDueDate;

      const earlierDate =
        grindingDate < repaintingDate ? grindingDate : repaintingDate;
      const type = grindingDate < repaintingDate ? "grinding" : "repainting";

      if (!latestDueDate || earlierDate < latestDueDate.date) {
        latestDueDate = {
          date: earlierDate,
          type,
          testSiteIndex: index,
        };
      }
    });

    res.json({ latestDueDate });
  } else {
    res.status(404).json({ message: "Machine not found" });
  }
});

// @desc    Update latest due date for a machine
// @route   PATCH /api/v1/machines/:id/date
// @access  Public

export const updateLatestDueDate = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const { newDate, testSiteNumber, type } = req.body;

  if (!testSiteNumber || !type || !newDate) {
    return res
      .status(400)
      .json({ error: "testSiteNumber, type, and newDate are required" });
  }

  if (!["grinding", "repainting"].includes(type)) {
    return res
      .status(400)
      .json({ error: 'Invalid type. Must be "grinding" or "repainting"' });
  }

  try {
    const machine = await Machine.findById(machineId);
    if (!machine) return res.status(404).json({ error: "Machine not found" });

    const site = machine.testSites.find(
      (site) => site.testSiteNumber === testSiteNumber
    );
    if (!site) return res.status(404).json({ error: "Test site not found" });

    if (type === "grinding") {
      site.nextGrindingDueDate = new Date(newDate);
    } else if (type === "repainting") {
      site.nextRepaintingDueDate = new Date(newDate);
    }

    await machine.save();

    res.json({
      message: `${type}DueDate updated successfully`,
      updatedSite: site,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Make new machine
// @route   POST /api/v1/machines
// @access  Admin

export const createMachine = asyncHandler(async (req, res) => {
  const { name, engineerID, testSiteRangeStart } = req.body;

  // get cookie from request
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verify the token and get user ID
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const creatorID = decoded.id;

  if (!name || !engineerID || !creatorID || !testSiteRangeStart) {
    return res.status(400).json({
      message:
        "Name, engineerID, creatorID, and testSiteRangeStart are required",
    });
  }

  const engineer = await User.findById(engineerID);
  if (!engineer) {
    return res.status(404).json({ message: "Engineer not found" });
  }
  const engineerId = engineer._id;

  const creatorUser = await User.findById(creatorID);
  if (!creatorUser) {
    return res.status(404).json({ message: "Engineer not found" });
  }
  const creatorId = creatorUser._id;

  const machine = await Machine.create({
    name,
    assignedEngineer: engineerId,
    createdBy: creatorId,
    testSites: generateTestSites(parseInt(testSiteRangeStart)),
  });

  res.status(201).json({ machine });
});
