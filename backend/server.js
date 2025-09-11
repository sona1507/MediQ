import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

// Route imports
import medicineRoutes from "./routes/medicineRoutes.js";
import incidencesRoutes from "./routes/incidencesRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// Middleware
// ===============================
app.use(express.json());

// ✅ CORS setup: allow both frontend ports
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
}));

// ✅ Ensure uploads folder exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "prescriptions");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ✅ Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ===============================
// Routes
// ===============================
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/incidences", incidencesRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("🩺 MediQ Backend is running...");
});

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===============================
// Server Listener
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
