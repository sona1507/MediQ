import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: {
  type: String,
  required: true
},

  file: {
    type: String,
    required: true // stores filename like "1694601234567.pdf"
  },

  fileName: {
    type: String // ✅ added: same as file
  },

  originalName: {
    type: String // ✅ added: original filename from user
  },

  filePath: {
    type: String // ✅ added: full path on server
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  approvedMedicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],

  items: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      quantity: { type: Number, required: true },
      dosage: { type: String },
      instructions: { type: String }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);
