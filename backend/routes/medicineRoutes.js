import express from "express";
import multer from "multer";
import path from "path";
import {
  addMedicine,
  getMedicines,
  getMedicineById,
  searchMedicines,
  deleteAllMedicines,
  deleteMedicineById,
  getMedicinesByIds,
  updateMedicineById
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
router.post("/", upload.single("image"), addMedicine);
router.post("/byIds", getMedicinesByIds);

// ===============================
// GET Routes
// ===============================
router.get("/", getMedicines);
router.get("/search", searchMedicines);
router.get("/:id", getMedicineById);

// ✅ NEW: Get medicines by category (e.g., ayurveda, allopathy)
router.get("/category", async (req, res) => {
  const { type } = req.query;
  try {
    const medicines = await Medicine.find({ category: type });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ===============================
// PATCH Routes
// ===============================
router.patch("/:id", upload.single("image"), updateMedicineById);

// ===============================
// DELETE Routes
// ===============================
router.delete("/", deleteAllMedicines);
router.delete("/:id", deleteMedicineById);

export default router;
