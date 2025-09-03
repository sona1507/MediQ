import express from "express";
import Incidence from "../models/incidences.js";

const router = express.Router();

// Add a new incidence
router.post("/", async (req, res) => {
  try {
    const newIncidence = new Incidence(req.body);
    await newIncidence.save();
    res.json(newIncidence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all incidences
router.get("/", async (req, res) => {
  try {
    const incidences = await Incidence.find();
    res.json(incidences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
