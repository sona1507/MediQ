import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true, // e.g. "Allopathy", "Ayurveda", "Pain Relief"
    },
    symptoms: {
      type: [String],
      required: true,
      set: arr => arr.map(s => s.trim()), // ✅ auto-trim each symptom
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    dosage: {
      type: String,
      trim: true,
    },
    prescriptionRequired: {
      type: String,
      enum: ["Required", "Not Required"],
      default: "Not Required",
    },
    image: {
      type: String, // e.g. "/uploads/medicines/filename.jpg"
      default: "",
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
