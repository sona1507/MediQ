import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import compression from "compression";

dotenv.config();
const app = express();

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked request from: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
}));

// ===============================
// Upload Directories
// ===============================
const UPLOAD_BASE = path.join(process.cwd(), "uploads");
const PRESCRIPTION_DIR = path.join(UPLOAD_BASE, "prescriptions");
const MEDICINE_IMAGE_DIR = path.join(UPLOAD_BASE, "medicines");

fs.mkdirSync(PRESCRIPTION_DIR, { recursive: true });
fs.mkdirSync(MEDICINE_IMAGE_DIR, { recursive: true });

// ✅ Serve uploaded files statically
app.use("/uploads/prescriptions", express.static(PRESCRIPTION_DIR));
app.use("/uploads/medicines", express.static(MEDICINE_IMAGE_DIR));

// ===============================
// Route Imports
// ===============================
import medicineRoutes from "./routes/medicineRoutes.js";
import incidencesRoutes from "./routes/incidencesRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

// ===============================
// Route Mounting
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/incidences", incidencesRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("🩺 MediQ Backend is running...");
});

// ❓ Fallback for unknown routes (excluding static)
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/uploads")) return next();
  res.status(404).json({ message: "Route not found" });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

// ===============================
// MongoDB Connection
// ===============================
const MONGO_URI = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_LOCAL;
if (!MONGO_URI) {
  console.error("❌ Missing MongoDB URI in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ===============================
// Server Listener
// ===============================
const PORT = process.env.PORT || 5000;
if (!PORT) {
  console.error("❌ Missing PORT in .env");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
