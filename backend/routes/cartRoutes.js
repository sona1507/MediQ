import express from "express";
import Cart from "../models/Cart.js";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// ✅ POST /add — Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "Missing userId or productId",
    });
  }

  try {
    const medicine = await Medicine.findById(productId);
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      console.log(`🛒 Quantity updated for user ${userId}, product ${productId}`);
      return res.status(200).json({
        success: true,
        updated: true,
        message: "Quantity updated",
      });
    }

    const newItem = new Cart({ userId, productId, quantity: 1 });
    await newItem.save();
    console.log(`🛒 New item added to cart for user ${userId}, product ${productId}`);

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
    });
  } catch (err) {
    console.error("🛑 Cart add error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

// ✅ GET /user/:id — Fetch cart items for user
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const items = await Cart.find({ userId }).populate("productId");

    const formatted = items
      .filter(item => item.productId)
      .map(item => ({
        medicineId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        description: item.productId.description,
        quantity: item.quantity,
      }));

    res.status(200).json({
      success: true,
      items: formatted, // ✅ This is the structure your frontend expects
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error: err.message,
    });
  }
});


export default router;
