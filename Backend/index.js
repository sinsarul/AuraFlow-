import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["content-type", "authorization"],
  })
);
app.use(morgan("dev"));

//db connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection successfully"))
  .catch((err) => console.log("Failed to connect to DB", err));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to Auraflow" });
});
//error middleware
app.use((err, req, res) => {
  res.status(500).json({ message: "Internal server error" });
});

//not found middleware
app.use((req, res) => {
  req.status(404).json({ message: "not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
