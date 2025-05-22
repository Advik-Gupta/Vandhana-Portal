import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const port = process.env.PORT || 8080;

// ______________________________________________________________________________________________

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ______________________________________________________________________________________________

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
