import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

/**
 * @route   POST /api/medicines
 * @desc    Add a new medicine
 */
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ message: "Failed to add medicine", error: error.message });
  }
});

/**
 * @route   GET /api/medicines
 * @desc    Get all medicines (optional filters: name, category, symptom)
 */
router.get("/", async (req, res) => {
  try {
    const { name, category, symptom } = req.query;
    let query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };
    if (symptom) query.symptoms = { $regex: symptom, $options: "i" };

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
});

/**
 * @route   GET /api/medicines/search?q=
 * @desc    Search medicines by name, category, or symptoms
 */
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.trim() || "";
    if (!query) return res.json([]);

    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { symptoms: { $regex: query, $options: "i" } },
      ],
    }).limit(20); // limit to 20 results for performance

    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});

/**
 * @route   DELETE /api/medicines
 * @desc    Delete all medicines
 */
router.delete("/", async (req, res) => {
  try {
    await Medicine.deleteMany({});
    res.status(200).json({ message: "All medicines deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicines", error: error.message });
  }
});

/**
 * @route   DELETE /api/medicines/:id
 * @desc    Delete a single medicine by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicine", error: error.message });
  }
});

/**
 * @route   POST /api/medicines/byIds
 * @desc    Fetch multiple medicines by IDs
 */
router.post("/byIds", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "ids array is required" });
    }
    const medicines = await Medicine.find({ _id: { $in: ids } });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
});

export default router;
