import express from "express";
import Prescription from "../models/prescription.js";
import Medicine from "../models/Medicine.js";
import upload from "../prescription/upload.js";
import { uploadPrescription } from "../controllers/prescriptionController.js";

const router = express.Router();

/**
 * @route   POST /api/prescriptions/upload
 * @desc    Upload prescription file
 */
router.post("/upload", upload.single("prescription"), uploadPrescription);

/**
 * @route   POST /api/prescriptions/:id/items
 * @desc    Attach medicines to a prescription
 */
router.post("/:id/items", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items array is required" });
    }

    const medicineIds = items.map((i) => i.medicineId);
    const found = await Medicine.find({ _id: { $in: medicineIds } }, "_id");
    if (found.length !== medicineIds.length) {
      return res.status(400).json({ message: "One or more medicineId not found" });
    }

    const toEmbed = items.map((i) => ({
      medicine: i.medicineId,
      quantity: i.quantity,
      dosage: i.dosage,
      instructions: i.instructions,
    }));

    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: { items: toEmbed } },
      { new: true }
    ).populate("items.medicine");

    if (!updated) return res.status(404).json({ message: "Prescription not found" });

    res.json({ message: "Medicines attached", prescription: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/prescriptions/:id/approve
 * @desc    Approve prescription
 */
router.patch("/:id/approve", async (req, res) => {
  try {
    const { approvedMedicines } = req.body;

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        approvedMedicines
      },
      { new: true }
    ).populate("approvedMedicines items.medicine");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription approved", prescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/prescriptions/:id/reject
 * @desc    Reject prescription
 */
router.patch("/:id/reject", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription rejected", prescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/:id/full
 * @desc    Get prescription with medicine details
 */
router.get("/:id/full", async (req, res) => {
  try {
    const pres = await Prescription.findById(req.params.id)
      .populate("items.medicine approvedMedicines");

    if (!pres) return res.status(404).json({ message: "Prescription not found" });
    res.json(pres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/approved/all
 * @desc    Get all approved prescriptions with medicines
 */
router.get("/approved/all", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ status: "approved" })
      .populate("items.medicine approvedMedicines");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("approvedMedicines items.medicine");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions
 */
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("approvedMedicines items.medicine");

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

export default router;
