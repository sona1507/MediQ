import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "pharmacist", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
