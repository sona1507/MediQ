import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  file: {
    type: String,
    required: true // stores filename like "1694601234567.pdf"
  },

  fileName: String,         // same as file
  originalName: String,     // original filename from user
  filePath: String,         // full path on server

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  statusUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // pharmacist who approved/rejected
    default: null
  },

  pharmacistSnapshot: {
    pharmacistId: String,
    name: String,
    email: String
  },

  reviewedAt: {
    type: Date,
    default: null
  },

  notes: {
    type: String,
    default: ""
  },

  // ✅ Medicines attached during approval (for quick listing)
  approvedMedicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],

  // ✅ Detailed medicine structure for cart-ready display
  items: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      quantity: { type: Number, required: true },
      dosage: String,
      instructions: String
    }
  ],

  userSnapshot: {
    userId: String,
    name: String,
    email: String
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);
