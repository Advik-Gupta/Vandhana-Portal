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

function getRandomFutureDate(daysAhead = 180) {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAhead) + 1; // 1 to daysAhead
  now.setDate(now.getDate() + randomDays);
  return now;
}

const generatePoints = (testSiteName, engineerId) => {
  const points = [];
  for (let i = 1; i <= 6; i++) {
    points.push({
      pointName: `${testSiteName}.${i}`,
      grindCycles: {
        1: {
          pre: {
            dptTest: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+1",
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+2",
            ],
            topView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Top+View+Image+1",
            ],
            gaugeView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Gauge+View+Image+1",
            ],
            uploadDate: new Date(),
            uploadBy: engineerId,
          },
          post: {
            dptTest: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+1",
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+2",
            ],
            topView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Top+View+Image+1",
            ],
            gaugeView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Gauge+View+Image+1",
            ],
            uploadDate: new Date(),
            uploadBy: engineerId,
          },
        },
      },
      repaintCycles: {
        1: {
          pre: {
            dptTest: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+1",
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+2",
            ],
            topView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Top+View+Image+1",
            ],
            gaugeView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Gauge+View+Image+1",
            ],
            uploadDate: new Date(),
            uploadBy: engineerId,
          },
          post: {
            dptTest: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+1",
              "https://dummyimage.com/600x400/000/fff&text=Pre+DPT+Test+Image+2",
            ],
            topView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Top+View+Image+1",
            ],
            gaugeView: [
              "https://dummyimage.com/600x400/000/fff&text=Pre+Gauge+View+Image+1",
            ],
            uploadDate: new Date(),
            uploadBy: engineerId,
          },
        },
      },
    });
  }
  return points;
};

const generateTestSites = (num, engineerID) => {
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
      nextGrindingDueDate: getRandomFutureDate(90),
      nextRepaintingDueDate: getRandomFutureDate(90),
      currentGrindingCycle: 0,
      currentRepaintingCycle: 0,
      points: generatePoints(`T${i}`, engineerID),
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

    const sampleMachines = machines.map((machine) => ({
      ...machine,
      createdBy: adminUser,
      assignedEngineer: engineerUser,
      testSites: generateTestSites(80, engineerUser),
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
