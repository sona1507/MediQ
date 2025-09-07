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

// Middleware
// app.use(cors());
app.use(express.json());


// Allow only your frontend origin and enable credentials
app.use(cors({
  origin: "http://localhost:3002", // your React frontend URL
  credentials: true,               // allow cookies
}));



// Ensure uploads folder exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "prescriptions");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI_ATLAS, {
    // useNewUrlParser and useUnifiedTopology are no longer required in Mongoose v7+
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Base route
app.get("/", (req, res) => {
  res.send("🩺 MediQ Backend is running...");
});

// API routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/incidences", incidencesRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// server.js or routes/medicineRoutes.js
app.get("/api/medicines", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

app.post("/api/auth/register-test", (req, res) => {
  console.log(req.body);
  res.json({ message: "Test route working", data: req.body });
});