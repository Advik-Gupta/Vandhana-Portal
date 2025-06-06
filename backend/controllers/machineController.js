import jwt from "jsonwebtoken";

import Machine from "../models/machineModel.js";
import User from "../models/userModel.js";

import asyncHandler from "../middleware/asyncHandler.js";
import { uploadToR2 } from "./r2uploader.js";

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

  // check cookie on server
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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

// @desc    Upload data for a site of a machine
// @route   POST /api/v1/machines/upload
// @access  Admin

export const uploadMachineData = asyncHandler(async (req, res) => {
  const { machineId, testSiteNumber, pointNumber, cycleType, cycleNumber } =
    req.body;

  const {
    customerName,
    zone,
    location,
    line,
    curveNumber,
    rail,
    ohePoleNumber,
  } = req.body;

  let uploadDate = new Date();
  const formattedDate = `${String(uploadDate.getDate()).padStart(
    2,
    "0"
  )}-${String(uploadDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${uploadDate.getFullYear()}`;

  try {
    const machine = await Machine.findById(machineId);
    const testSite = await machine.testSites.find(
      (site) => site.testSiteNumber === testSiteNumber
    );
    const point = await testSite.points.find(
      (p) => p.pointName === `${testSiteNumber}.${pointNumber}`
    );

    console.log(point);

    for (const file of req.files) {
      const [category, phase] = file.fieldname.split("_"); // e.g. "dptTest_1_pre"
      const namesOfTests = {
        "DPT Test": "dptTest",
        "Top View": "topView",
        "Gauge View": "gaugeView",
        "Longitudinal View": "longitudinalView",
        "Contact Band": "contactBand",
        Roughness: "roughness",
        Hardness: "hardness",
        "Star Gauge": "starGauge",
      };
      const customName = `${testSiteNumber || "N/A"}.${pointNumber || "N/A"}_${
        customerName || "N/A"
      }_${zone || "N/A"}_${location || "N/A"}_${line || "N/A"}_${
        rail || "N/A"
      }_${curveNumber || "N/A"}_${ohePoleNumber || "N/A"}_${
        category || "N/A"
      }_${phase || "N/A"}_${formattedDate || "N/A"}`;
      const url = await uploadToR2(file.buffer, customName, file.mimetype);

      point[cycleType]
        .get(cycleNumber)
        [phase].get(namesOfTests[category])
        .push(url);
    }

    await machine.save();
    res.status(200).json({ success: true, machine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// @desc    Update test site data for a machine
// @route   PUT /api/v1/machines/:machineId/:testSiteNumber
// @access  Admin

export const updateTestSiteData = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const { testSiteNumber } = req.params;
  const {
    gmt,
    division,
    curveType,
    degreeOfCurve,
    section,
    station,
    kmFrom,
    kmTo,
    nextGrindingDueDate,
    nextRepaintingDueDate,
  } = req.body.updatedTestSiteData;

  try {
    const machine = await Machine.findById(machineId);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const testSite = machine.testSites.find(
      (site) => site.testSiteNumber === testSiteNumber
    );
    if (!testSite) {
      return res.status(404).json({ message: "Test site not found" });
    }

    testSite.gmt = gmt;
    testSite.division = division;
    testSite.curveType = curveType;
    testSite.degreeOfCurve = degreeOfCurve;
    testSite.section = section;
    testSite.station = station;
    testSite.kmFrom = kmFrom;
    testSite.kmTo = kmTo;
    testSite.nextGrindingDueDate = nextGrindingDueDate
      ? new Date(nextGrindingDueDate)
      : null;
    testSite.nextRepaintingDueDate = nextRepaintingDueDate
      ? new Date(nextRepaintingDueDate)
      : null;

    await machine.save();

    res.status(200).json({ success: true, machine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
