import { Queue } from "bullmq";
import IORedis from "ioredis";
import connection from "./connection";

export const approvalQueue = new Queue("approval-check", { connection });
