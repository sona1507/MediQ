import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

/**
 * @route   POST /api/medicines
 * @desc    Add new medicine
 */
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/medicines
 * @desc    Get all medicines
 */
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/medicines/search
 * @desc    Search medicines by name, category, or symptoms/disease
 */
router.get("/search", async (req, res) => {
  try {
    const { name, category, symptom } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case insensitive search
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (symptom) {
      query.symptoms = { $regex: symptom, $options: "i" };
    }

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// DELETE all medicines
router.delete("/", async (req, res) => {
  try {
    await Medicine.deleteMany({});
    res.status(200).json({ message: "All medicines deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete medicines" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
});
// POST /api/medicines/byIds  { ids: ["...", "..."] }
router.post("/byIds", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ message: "ids array required" });
    const meds = await Medicine.find({ _id: { $in: ids } });
    res.json(meds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const { name, category, symptom } = req.query;

    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (symptom) query.symptom = symptom;

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /api/medicines/search
// GET /api/medicines/search?q=...
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { symptoms: { $regex: q, $options: "i" } },
      ],
    }).limit(10);

    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: "Error searching medicines" });
  }
});






export default router;
