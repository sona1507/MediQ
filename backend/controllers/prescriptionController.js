import mongoose from "mongoose"; // ✅ Add this at the top
import Prescription from "../models/prescription.js";

// ✅ Upload prescription
export const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userId } = req.body;
    if (!userId) {
  return res.status(400).json({ message: "Missing userId" });
}


    const prescription = new Prescription({
      userId,
      file: req.file.filename, // matches schema
      fileName: req.file.filename, // ✅ added
      originalName: req.file.originalname, // ✅ added
      filePath: req.file.path, // ✅ added
      status: "pending"
    });

    await prescription.save();
    res.status(201).json({ message: "Prescription uploaded", prescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all prescriptions
export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate("userId", "name email");
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve prescription
export const approvePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ message: "Prescription approved", prescription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reject prescription
export const rejectPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByIdAndUpdate(
      id,
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
};
