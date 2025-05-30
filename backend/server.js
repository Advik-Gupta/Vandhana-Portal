import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const port = process.env.PORT || 8080;

// ______________________________________________________________________________________________

import machineRoutes from "./routes/machineRoutes.js";

// ______________________________________________________________________________________________

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/machines", machineRoutes);

// ______________________________________________________________________________________________

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
