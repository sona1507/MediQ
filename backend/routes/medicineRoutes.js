import express from "express";
import multer from "multer";
import path from "path";
import {
  addMedicine,           // ➕ Add a new medicine
  getMedicines,          // 📦 Get all medicines (optionally filtered)
  getMedicineById,       // 🔍 Get a single medicine by ID
  searchMedicines,       // 🔎 Search medicines by name, category, or symptoms
  deleteAllMedicines,    // ❌ Delete all medicines
  deleteMedicineById,    // ❌ Delete a specific medicine by ID
  getMedicinesByIds,     // 🔍 Fetch multiple medicines by array of IDs
  updateMedicineById     // ✏️ Update medicine details
} from "../controllers/medicineController.js";

const router = express.Router();

// ===============================
// Multer Setup for Image Upload
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/medicines");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// ===============================
// POST Routes
// ===============================
router.post("/", upload.single("image"), addMedicine);     // ➕ Add new medicine with image
router.post("/byIds", getMedicinesByIds);                  // 🔍 Get medicines by array of IDs

// ===============================
// GET Routes
// ===============================
router.get("/", getMedicines);                             // 📦 Get all medicines
router.get("/search", searchMedicines);                    // 🔎 Search medicines
router.get("/:id", getMedicineById);                       // 🔍 Get medicine by ID

// ===============================
// PATCH Routes
// ===============================
router.patch("/:id", upload.single("image"), updateMedicineById); // ✏️ Update medicine info

// ===============================
// DELETE Routes
// ===============================
router.delete("/", deleteAllMedicines);                    // ❌ Delete all medicines
router.delete("/:id", deleteMedicineById);                 // ❌ Delete medicine by ID

export default router;
