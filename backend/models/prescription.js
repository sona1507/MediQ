// models/Prescription.js
import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true }, // uploaded prescription image
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  approvedMedicines: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }
  ]
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);
