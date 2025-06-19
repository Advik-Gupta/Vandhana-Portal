import mongoose from "mongoose";

const grindCycleSchema = new mongoose.Schema(
  {
    pre: {
      type: Map,
      of: [String],
    },
    post: {
      type: Map,
      of: [String],
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
      default: "684c91abfe1841850a9e9702",
    },
    status: {
      type: String,
      enum: ["issues", "approved", "closed", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const testSitePointSchema = new mongoose.Schema(
  {
    pointName: {
      type: String,
      required: true,
    },
    grindCycles: {
      type: Map,
      of: grindCycleSchema,
      default: {},
    },
    repaintCycles: {
      type: Map,
      of: grindCycleSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const testSiteSchema = new mongoose.Schema(
  {
    testSiteNumber: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    curveType: {
      type: String,
      required: true,
    },
    curveNumber: {
      type: String,
      default: null,
    },
    degreeOfCurve: {
      type: Number,
      required: true,
      default: null,
    },
    section: {
      type: String,
      required: true,
    },
    station: {
      type: String,
      required: true,
    },
    line: {
      type: String,
      required: true,
      enum: ["Up", "Down"],
      default: "Up",
    },
    kmFrom: {
      type: Number,
      required: true,
      default: null,
    },
    kmTo: {
      type: Number,
      required: true,
      default: null,
    },
    gmt: {
      type: Number,
      required: true,
      default: null,
    },
    nextGrindingDueDate: {
      type: Date,
      default: null,
    },
    nextRepaintingDueDate: {
      type: Date,
      default: null,
    },
    currentGrindingCycle: {
      type: Number,
      required: true,
      default: 0,
    },
    currentRepaintingCycle: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    points: [testSitePointSchema],
  },
  {
    timestamps: true,
  }
);

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignedEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    testSites: [testSiteSchema],
  },
  {
    timestamps: true,
  },
  {
    timestamps: true,
  }
);

const Machine = mongoose.model("Machine", machineSchema);

export default Machine;
