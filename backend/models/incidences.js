import mongoose from "mongoose";

const incidenceSchema = new mongoose.Schema({
  user: { type: String, required: true },   // who reported
  description: { type: String, required: true }, // issue details
  severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Incidence", incidenceSchema);
