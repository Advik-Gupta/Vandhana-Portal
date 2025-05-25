import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// ______________________________________________________________________________________________

import machineRoutes from "./routes/machineRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ______________________________________________________________________________________________

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/machines", machineRoutes);
app.use("/api/users", userRoutes);

// ______________________________________________________________________________________________

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
