import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import triageRoutes from "./routes/triage.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static('../frontend'));

app.use("/api/triage", triageRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});