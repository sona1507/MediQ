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
      type: [String], // array of symptoms/diseases
      required: true,
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
      type: String, // e.g. "1 tablet twice daily"
      trim: true,
    },
    prescriptionRequired: {
      type: String, // "Required" or "Not Required"
      enum: ["Required", "Not Required"],
      default: "Not Required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
