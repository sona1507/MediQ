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
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    dosage: {
      type: String, // e.g. "1 tablet twice daily"
    },
    prescriptionRequired: {
      type: String, // e.g. "Required" or "Not Required"
      default: "Not Required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
