import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "approval-check",
  async (job) => {
    console.log("Worker started processing jobs");
    console.log("Job data:", job.data);
  },
  { connection }
);
