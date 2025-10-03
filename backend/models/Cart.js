import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // ✅ Enables fast user-based queries
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true, // ✅ Ensures valid reference for population
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "saved", "ordered"],
      default: "active", // ✅ Useful for tracking cart lifecycle
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt fields
  }
);

// ✅ Optional: compound index for user-product uniqueness
// cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
