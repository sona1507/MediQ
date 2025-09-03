import express from "express";
import Prescription from "../models/prescription.js";
import Medicine from "../models/Medicine.js"; // make sure this path is correct

const router = express.Router();

/**
 * @route   POST /api/prescriptions/:id/items
 * @desc    Pharmacist: Attach medicines (with details) to a prescription
 * @body    { items: [{ medicineId, quantity, dosage?, instructions? }] }
 */
router.post("/:id/items", async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items array is required" });
    }

    // validate medicines exist
    const medicineIds = items.map((i) => i.medicineId);
    const found = await Medicine.find({ _id: { $in: medicineIds } }, "_id");
    if (found.length !== medicineIds.length) {
      return res.status(400).json({ message: "One or more medicineId not found" });
    }

    // prepare embedded items
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

    res.json({ message: "Medicines attached to prescription", prescription: updated });
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
    const pres = await Prescription.findById(req.params.id).populate("items.medicine");
    if (!pres) return res.status(404).json({ message: "Prescription not found" });
    res.json(pres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/approved
 * @desc    Get all approved prescriptions with medicines (for buyers)
 */
router.get("/approved/all", async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ status: "approved" })
      .populate("items.medicine");
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/prescriptions/:id/approve
 * @desc    Pharmacist approves prescription
 */
router.patch("/:id/approve", async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).populate("items.medicine");

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
 * @desc    Pharmacist rejects prescription
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
 * @route   POST /api/prescriptions
 * @desc    Create new prescription (before pharmacist validation)
 */
router.post("/", async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get prescription by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @route   GET /api/prescriptions
 * @desc    Get all prescriptions (for admin or pharmacist)
 */
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id/approve", async (req, res) => {
  try {
    const { approvedMedicines } = req.body; // array of medicine IDs

    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
        approvedMedicines
      },
      { new: true }
    ).populate("approvedMedicines");

    res.json({
      message: "✅ Prescription approved",
      prescription,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// routes/prescriptionRoutes.js
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("approvedMedicines");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
