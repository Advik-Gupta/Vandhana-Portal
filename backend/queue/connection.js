import IORedis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {}, // Required for Redis Cloud's secure TLS connection
});

export default connection;
