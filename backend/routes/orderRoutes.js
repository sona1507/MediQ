// routes/orderRoutes.js
import express from "express";
import Order from "../models/order.js";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// ✅ Place Order
router.post("/", async (req, res) => {
  try {
    const { userId, prescriptionId, medicines } = req.body;
    // medicines = [{ medicineId, quantity }, ...]

    // Calculate total amount
    let totalAmount = 0;
    for (let item of medicines) {
      const med = await Medicine.findById(item.medicineId);
      if (!med) {
        return res.status(404).json({ message: `Medicine not found: ${item.medicineId}` });
      }
      totalAmount += med.price * (item.quantity || 1);
    }

    const order = new Order({
      userId,
      prescriptionId,
      medicines,
      totalAmount,
    });

    await order.save();
    res.json({ message: "✅ Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Orders of a User
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("medicines.medicineId")
      .populate("prescriptionId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Order Status (Admin/Pharmacist)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "✅ Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
