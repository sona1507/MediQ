import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Medicine from "../models/Medicine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env safely
dotenv.config({ path: path.join(__dirname, "../.env") });

// ✅ Always use Atlas DB (same as backend)
const mongoURI = process.env.MONGO_URI_ATLAS;

const data = [
  {
    name: "Paracetamol",
    category: "Allopathy",
    symptoms: ["Fever", "Headache", "Body Pain"],
    description: "Used to reduce fever and relieve pain.",
    price: 25,
    stock: 100,
    dosage: "1 tablet in morning",
    prescriptionRequired: "Not Required",
  },
  {
    name: "Dolo 650",
    category: "Allopathy",
    symptoms: ["Fever", "Headache", "Body Pain"],
    description: "Effective in reducing fever and mild to moderate pain.",
    price: 30,
    stock: 150,
    dosage: "1 tablet every 6 hours",
    prescriptionRequired: "Not Required",
  },
  {
    name: "Gelusil",
    category: "Allopathy",
    symptoms: ["Acidity", "Heartburn", "Indigestion"],
    description: "Provides quick relief from acidity and gas.",
    price: 40,
    stock: 200,
    dosage: "2 teaspoons after meals",
    prescriptionRequired: "Not Required",
  },
  {
    name: "Azivo 500mg Tablet",
    category: "Allopathy",
    symptoms: ["Respiratory Infection", "Throat Infection", "Skin Infection"],
    description:
      "An antibiotic used to treat bacterial infections of respiratory tract, ear, nose, throat, lungs, skin, eyes, typhoid fever, and STDs like gonorrhea.",
    price: 120,
    stock: 80,
    dosage: "1 tablet twice daily",
    prescriptionRequired: "Required",
  },
  {
    name: "Pantonil 40mg",
    category: "Allopathy",
    symptoms: ["Acid Reflux", "Heartburn", "Peptic Ulcer"],
    description:
      "Reduces stomach acid production and promotes healing of ulcers and reflux issues.",
    price: 90,
    stock: 120,
    dosage: "1 tablet in the morning",
    prescriptionRequired: "Required",
  },
  {
    name: "Levo 500mg Tablet",
    category: "Allopathy",
    symptoms: [
      "Urinary Tract Infection",
      "Respiratory Infection",
      "Skin Infection",
    ],
    description:
      "An antibiotic for bacterial infections of urinary tract, nose, throat, skin, and lungs (pneumonia).",
    price: 110,
    stock: 100,
    dosage: "1 tablet in the morning",
    prescriptionRequired: "Required",
  },
  {
    name: "Bromo Syrup",
    category: "Allopathy",
    symptoms: ["Cough with mucus", "Cold", "Sneezing"],
    description:
      "Used in cough with mucus. Thins mucus and provides relief from runny nose, sneezing, and watery eyes.",
    price: 60,
    stock: 90,
    dosage: "5 ml (3 times daily)",
    prescriptionRequired: "Not Required",
  },
];

(async function seed() {
  try {
    console.log("Using Mongo Atlas URI:", mongoURI);

    if (!mongoURI) {
      throw new Error("❌ No Atlas MongoDB URI found in .env file");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB Atlas");

    await Medicine.deleteMany({});
    await Medicine.insertMany(data);

    console.log(`✅ Seeded medicines: ${data.length}`);
  } catch (e) {
    console.error("❌ Error seeding medicines:", e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
