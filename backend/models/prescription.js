import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  // ✅ Reference to the user who uploaded
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // ✅ Optional name/title for display
  name: {
    type: String,
    default: ""
  },

  // ✅ Uploaded file details
  file: {
    type: String,
    required: true // stores filename like "1694601234567.pdf"
  },
  fileName: String,         // same as file
  originalName: String,     // original filename from user
  filePath: String,         // full path on server

  // ✅ Status tracking
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

  // ✅ Quick medicine reference (used in approval flow)
  medicineIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],

  // ✅ Optional: legacy or alternate field for approvals
  approvedMedicines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],

  // ✅ Detailed medicine structure for cart-ready display
  items: [{
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
  description: String,
  dosage: String,
  instructions: String
  
}]
,

  // ✅ Snapshot of user at time of upload
  userSnapshot: {
    userId: String,
    name: String,
    email: String
  },

  // ✅ Soft delete flag
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);
