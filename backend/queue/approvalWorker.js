import { Worker } from "bullmq";
import IORedis from "ioredis";
import connection from "./connection";

const worker = new Worker(
  "approval-check",
  async (job) => {
    console.log("Worker started processing jobs");
    console.log("Job data:", job.data);
  },
  { connection }
);
