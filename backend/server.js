import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8080;

// ______________________________________________________________________________________________

import machineRoutes from "./routes/machineRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoute from "./routes/notificationRoutes.js";

// ______________________________________________________________________________________________

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/machines", machineRoutes);
app.use("/api/v1/notifications", notificationRoute);
// ______________________________________________________________________________________________

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
