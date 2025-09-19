import express from "express";
import {
  addMedicine,
  getMedicines,
  searchMedicines,
  deleteAllMedicines,
  deleteMedicineById,
  getMedicinesByIds
} from "../controllers/medicineController.js";

const router = express.Router();

// ===============================
// POST Routes
// ===============================
router.post("/", addMedicine);               // ➕ Add new medicine
router.post("/byIds", getMedicinesByIds);    // 🔍 Fetch multiple medicines by IDs

// ===============================
// GET Routes
// ===============================
router.get("/", getMedicines);               // 📦 Get all medicines (with optional filters)
router.get("/search", searchMedicines);      // 🔎 Search medicines by name, category, or symptoms

// ===============================
// DELETE Routes
// ===============================
router.delete("/", deleteAllMedicines);      // ❌ Delete all medicines
router.delete("/:id", deleteMedicineById);   // ❌ Delete medicine by ID

export default router;
