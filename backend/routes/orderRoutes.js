import express from "express";
import Order from "../models/order.js";
import Medicine from "../models/Medicine.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ POST /orders — Place Order
router.post("/", authMiddleware, async (req, res) => {
  const { prescriptionId, medicines } = req.body;
  const user = req.user;

  // ✅ Validate payload
  if (!user || !Array.isArray(medicines) || medicines.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid item payload",
    });
  }

  try {
    const userId = user._id;
    let totalAmount = 0;
    const validatedItems = [];

    for (let item of medicines) {
      if (
        !item.medicineId ||
        typeof item.quantity !== "number" ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid medicine entry",
        });
      }

      const med = await Medicine.findById(item.medicineId);
      if (!med) {
        return res.status(404).json({
          success: false,
          message: `Medicine not found: ${item.medicineId}`,
        });
      }

      totalAmount += med.price * item.quantity;
      validatedItems.push({
        medicineId: med._id,
        quantity: item.quantity,
        price: med.price,
      });
    }

    const order = new Order({
  user: user._id,
  prescriptionId: prescriptionId || null,
  medicines: validatedItems,
  totalAmount,
  status: "Processing", // ✅ must match enum
  placedAt: Date.now(),
});


    await order.save();
    console.log(`✅ Order placed for user ${userId} with ${validatedItems.length} items`);

    res.status(201).json({
      success: true,
      message: "✅ Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: err.message,
    });
  }
});

// ✅ GET /orders/my — Get Orders of Logged-in User
// @desc   Get orders for logged-in user
// @route  GET /api/orders/my
// @access Private
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("medicines.medicineId")
      .sort({ placedAt: -1 });

    res.status(200).json({
      success: true,
      orders, // ✅ Wrap inside an object
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ✅ PUT /orders/:id/status — Update Order Status
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || typeof status !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "✅ Order status updated",
      order,
    });
  } catch (err) {
    console.error("❌ Status update error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: err.message,
    });
  }
});

export default router;
