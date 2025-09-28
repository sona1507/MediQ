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

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ===============================
// POST Routes
// ===============================

/**
 * @route   POST /api/medicines
 * @desc    Add new medicine with image
 */
router.post("/", upload.single("image"), addMedicine);

/**
 * @route   POST /api/medicines/byIds
 * @desc    Get medicines by array of IDs
 */
router.post("/byIds", getMedicinesByIds);

// ===============================
// GET Routes
// ===============================

/**
 * @route   GET /api/medicines
 * @desc    Get all medicines
 */
router.get("/", getMedicines);

/**
 * @route   GET /api/medicines/search?q=
 * @desc    Search medicines by name, category, or symptoms
 */
router.get("/search", searchMedicines);

/**
 * @route   GET /api/medicines/:id
 * @desc    Get medicine by ID
 */
router.get("/:id", getMedicineById);

// ===============================
// PATCH Routes
// ===============================

/**
 * @route   PATCH /api/medicines/:id
 * @desc    Update medicine info (with optional image)
 */
router.patch("/:id", upload.single("image"), updateMedicineById);

// ===============================
// DELETE Routes
// ===============================

/**
 * @route   DELETE /api/medicines
 * @desc    Delete all medicines
 */
router.delete("/", deleteAllMedicines);

/**
 * @route   DELETE /api/medicines/:id
 * @desc    Delete medicine by ID
 */
router.delete("/:id", deleteMedicineById);

export default router;
