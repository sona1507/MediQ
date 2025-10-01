import express from "express";
import mongoose from "mongoose";
import Prescription from "../models/prescription.js";
import Medicine from "../models/Medicine.js";
import upload from "../prescription/upload.js";
import {
  uploadPrescription,
  approvePrescription,
  rejectPrescription
} from "../controllers/prescriptionController.js";

const router = express.Router();

/**
 * @route   POST /api/prescriptions/upload
 * @desc    Upload prescription file
 */
router.post("/upload", upload.single("file"), uploadPrescription);

/**
 * @route   POST /api/prescriptions/:id/items
 * @desc    Attach detailed medicine items to a prescription
 */
router.post("/:id/items", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items array is required" });
    }

    const medicineIds = items.map(i => i.medicineId);
    const found = await Medicine.find({ _id: { $in: medicineIds } }, "_id");

    if (found.length !== medicineIds.length) {
      return res.status(400).json({ message: "One or more medicineId not found" });
    }

    const toEmbed = items.map(i => ({
      medicine: i.medicineId,
      quantity: i.quantity,
      dosage: i.dosage,
      instructions: i.instructions
    }));

    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: { items: toEmbed } },
      { new: true }
    ).populate("items.medicine");

    if (!updated) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Medicines attached", prescription: updated });
  } catch (error) {
    console.error("❌ Attach error:", error);
    res.status(500).json({ message: "Failed to attach medicines", error: error.message });
  }
});

/**
 * @route   PATCH /api/prescriptions/:id/approve
 * @desc    Approve prescription
 */
router.patch("/:id/approve", approvePrescription);

/**
 * @route   PATCH /api/prescriptions/:id/reject
 * @desc    Reject prescription
 */
router.patch("/:id/reject", rejectPrescription);

/**
 * @route   GET /api/prescriptions/:id/full
 * @desc    Get full prescription with medicine details
 */
router.get("/:id/full", async (req, res) => {
  try {
    const pres = await Prescription.findById(req.params.id)
      .populate("items.medicine medicineIds approvedMedicines userId statusUpdatedBy", "name email");

    if (!pres) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(pres);
  } catch (error) {
    console.error("❌ Full fetch error:", error);
    res.status(500).json({ message: "Failed to fetch full prescription", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/approved/all
 * @desc    Get all approved prescriptions with medicines
 */
router.get("/approved/all", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ status: "approved" })
      .populate("items.medicine medicineIds approvedMedicines userId statusUpdatedBy", "name email");

    res.json(prescriptions);
  } catch (error) {
    console.error("❌ Approved fetch error:", error);
    res.status(500).json({ message: "Failed to fetch approved prescriptions", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/user/:id
 * @desc    Get all prescriptions for a user
 */
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const prescriptions = await Prescription.find({ userId: id })
      .populate("items.medicine medicineIds approvedMedicines userId statusUpdatedBy", "name email");

    res.json(prescriptions);
  } catch (error) {
    console.error("❌ User fetch error:", error);
    res.status(500).json({ message: "Failed to fetch user prescriptions", error: error.message });
  }
});

/**
 * @route   POST /api/prescriptions
 * @desc    Create new prescription manually
 */
router.post("/", async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    console.error("❌ Manual create error:", error);
    res.status(500).json({ message: "Failed to create prescription", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("items.medicine medicineIds approvedMedicines userId statusUpdatedBy", "name email");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(prescription);
  } catch (error) {
    console.error("❌ Single fetch error:", error);
    res.status(500).json({ message: "Failed to fetch prescription", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions
 */
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("items.medicine medicineIds approvedMedicines userId statusUpdatedBy", "name email");

    res.json(prescriptions);
  } catch (error) {
    console.error("❌ All fetch error:", error);
    res.status(500).json({ message: "Failed to fetch prescriptions", error: error.message });
  }
});

/**
 * @route   DELETE /api/prescriptions/:id
 * @desc    Delete prescription
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Prescription.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Failed to delete prescription", error: error.message });
  }
});
// PATCH /prescriptions/:id/medicines
router.patch("/:id/medicines", async (req, res) => {
  const { items } = req.body; // array of { medicine, dosage, instructions }

  try {
    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: { items } },
      { new: true }
    ).populate("items.medicine"); // ✅ populate for frontend display

    res.json(updated);
  } catch (err) {
    console.error("Failed to update prescription medicines:", err);
    res.status(500).json({ error: "Failed to update medicines" });
  }
});


export default router;
