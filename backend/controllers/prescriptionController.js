import mongoose from "mongoose";
import Prescription from "../models/prescription.js";

// ✅ Upload prescription
export const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userId } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Missing or invalid userId" });
    }

    const prescription = new Prescription({
      userId,
      file: req.file.filename,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      status: "pending"
    });

    await prescription.save();
    res.status(201).json({ message: "Prescription uploaded successfully", prescription });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Failed to upload prescription", error: error.message });
  }
};

// ✅ Get all prescriptions
export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("userId", "userId name email")
      .populate("statusUpdatedBy", "userId name email"); // ✅ pharmacist info
    res.json(prescriptions);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch prescriptions", error: error.message });
  }
};

// ✅ Approve prescription
export const approvePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewedBy, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid prescription ID" });
    }

    if (!reviewedBy || !mongoose.Types.ObjectId.isValid(reviewedBy)) {
      return res.status(400).json({ message: "Missing or invalid reviewer ID" });
    }

    const updated = await Prescription.findByIdAndUpdate(
      id,
      {
        status: "approved",
        statusUpdatedBy: reviewedBy,
        notes: notes || "Approved without notes",
        reviewedAt: new Date()
      },
      { new: true }
    )
    .populate("userId", "userId name email")
    .populate("statusUpdatedBy", "userId name email");

    if (!updated) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription approved successfully", prescription: updated });
  } catch (error) {
    console.error("❌ Approval error:", error);
    res.status(500).json({ message: "Failed to approve prescription", error: error.message });
  }
};

// ✅ Reject prescription
export const rejectPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewedBy, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid prescription ID" });
    }

    if (!reviewedBy || !mongoose.Types.ObjectId.isValid(reviewedBy)) {
      return res.status(400).json({ message: "Missing or invalid reviewer ID" });
    }

    const updated = await Prescription.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        statusUpdatedBy: reviewedBy,
        notes: notes || "Rejected without notes",
        reviewedAt: new Date()
      },
      { new: true }
    )
    .populate("userId", "userId name email")
    .populate("statusUpdatedBy", "userId name email");

    if (!updated) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription rejected successfully", prescription: updated });
  } catch (error) {
    console.error("❌ Rejection error:", error);
    res.status(500).json({ message: "Failed to reject prescription", error: error.message });
  }
};
