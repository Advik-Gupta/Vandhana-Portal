import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users.js";
import machines from "./data/machines.js";

import User from "./models/userModel.js";
import Machine from "./models/machineModel.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// ______________________________________________________________________________________________

const machineTypes = {
  RGI96: 6,
  SRGM: 8,
  LRG: 2,
  FM: 2,
  "CMRL (VRA)": 6,
};

function getRandomDate(daysRange = 180) {
  const now = new Date();
  const randomDays =
    Math.floor(Math.random() * (2 * daysRange + 1)) - daysRange;
  now.setDate(now.getDate() + randomDays);
  return now;
}

const generatePoints = (testSiteName, engineerId, type) => {
  const points = [];
  for (let i = 1; i <= machineTypes[type]; i++) {
    points.push({
      pointName: `${testSiteName}.${i}`,
    });
  }
  return points;
};

const generateTestSites = (num, engineerID, machineType) => {
  const testSites = [];
  for (let i = num; i <= num + 11; i++) {
    testSites.push({
      testSiteNumber: `T${i}`,
      division: "UMB/NR",
      curveType: "Tangent",
      curveNumber: null,
      degreeOfCurve: 0.5,
      section: "KKDE-UMB",
      station: "UMB",
      line: "Up",
      kmFrom: 191.507,
      kmTo: 191.827,
      gmt: 37.65,
      nextGrindingDueDate: getRandomDate(90),
      nextRepaintingDueDate: getRandomDate(90),
      currentGrindingCycle: 0,
      currentRepaintingCycle: 0,
      status: "active",
      points: generatePoints(`T${i}`, engineerID, machineType),
    });
  }
  return testSites;
};

// ______________________________________________________________________________________________

const importData = async () => {
  try {
    await User.deleteMany();
    await Machine.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const engineerUser = createdUsers[1]._id;
    const machineManagerUser = createdUsers[3]._id;
    const fleetManagerUser = createdUsers[4]._id;

    const sampleMachines = machines.map((machine) => ({
      machineType: machine["machineType"],
      name: machine["name"],
      createdBy: adminUser,
      assignedEngineer: engineerUser,
      assignedMachineManager: machineManagerUser,
      assignedFleetManager: fleetManagerUser,
      testSites: generateTestSites(80, engineerUser, machine.machineType),
    }));

    await Machine.insertMany(sampleMachines);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Machine.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// ______________________________________________________________________________________________

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// ______________________________________________________________________________________________
