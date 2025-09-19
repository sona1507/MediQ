import Medicine from "../models/Medicine.js";

// ✅ Add a new medicine
export const addMedicine = async (req, res) => {
  try {
    const {
      name,
      category,
      symptoms,
      price = 0,
      stock = 0,
      description = "",
      dosage = "",
      prescriptionRequired = "Not Required"
    } = req.body;

    // Basic validation
    if (!name?.trim() || !category?.trim() || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: "Name, category, and symptoms array are required" });
    }

    if (price < 0 || stock < 0) {
      return res.status(400).json({ message: "Price and stock must be non-negative" });
    }

    const newMedicine = new Medicine({
      name: name.trim(),
      category: category.trim(),
      symptoms: symptoms.map(s => s.trim()),
      price,
      stock,
      description: description.trim(),
      dosage: dosage.trim(),
      prescriptionRequired: prescriptionRequired.trim(),
    });

    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error("❌ Add medicine error:", error.message);
    res.status(500).json({ message: "Failed to add medicine", error: error.message });
  }
};

// ✅ Get all medicines with optional filters
export const getMedicines = async (req, res) => {
  try {
    const { name, category, symptom } = req.query;
    const query = {};

    if (name?.trim()) query.name = { $regex: name.trim(), $options: "i" };
    if (category?.trim()) query.category = { $regex: category.trim(), $options: "i" };
    if (symptom?.trim()) query.symptoms = { $regex: symptom.trim(), $options: "i" };

    const medicines = await Medicine.find(query)
      .sort({ name: 1 })
      .collation({ locale: "en", strength: 2 }) // ✅ Case-insensitive sort
      .lean()
      .select("-__v");

    res.json(medicines);
  } catch (error) {
    console.error("❌ Get medicines error:", error.message);
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
};

// ✅ Search medicines by name, category, or symptoms
export const searchMedicines = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.json([]);

    const regex = new RegExp(query, "i");

    const medicines = await Medicine.find({
      $or: [
        { name: regex },
        { category: regex },
        { symptoms: { $regex: regex } } // ✅ Direct match on array
      ]
    })
      .limit(20)
      .lean()
      .select("-__v");

    res.json(medicines);
  } catch (error) {
    console.error("❌ Search error:", error.message);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// ✅ Delete all medicines
export const deleteAllMedicines = async (req, res) => {
  try {
    await Medicine.deleteMany({});
    res.status(200).json({ message: "All medicines deleted successfully" });
  } catch (error) {
    console.error("❌ Delete all error:", error.message);
    res.status(500).json({ message: "Failed to delete medicines", error: error.message });
  }
};

// ✅ Delete a single medicine by ID
export const deleteMedicineById = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error("❌ Delete by ID error:", error.message);
    res.status(500).json({ message: "Failed to delete medicine", error: error.message });
  }
};

// ✅ Fetch multiple medicines by IDs
export const getMedicinesByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "ids array is required" });
    }

    const medicines = await Medicine.find({ _id: { $in: ids } })
      .lean()
      .select("-__v");

    res.json(medicines);
  } catch (error) {
    console.error("❌ Fetch by IDs error:", error.message);
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
};
