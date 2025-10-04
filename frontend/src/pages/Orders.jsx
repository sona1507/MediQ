import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Orders.css";

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || !user?._id) return;

      try {
        const res = await api.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📦 Full response:", res.data);
        console.log("👤 Current user ID:", user._id);

        // ✅ Flexible parsing based on actual structure
        const fetchedOrders =
          Array.isArray(res.data?.orders) ? res.data.orders :
          Array.isArray(res.data) ? res.data :
          [];

        setOrders(fetchedOrders);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, user?._id]);

  if (!user || !token) {
    return (
      <div className="container my-5">
        <h3 className="mb-4 text-primary">📦 My Orders</h3>
        <div className="alert alert-warning">Please log in to view your orders.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h5 className="text-muted">Loading your orders...</h5>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-primary">📦 My Orders</h3>
      {orders.length === 0 ? (
        <div className="alert alert-info">You haven’t placed any orders yet.</div>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item mb-3">
              <h5>Order ID: {order._id}</h5>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Total: ₹{order.totalAmount}</p>
              <ul className="mb-2">
                {order.medicines?.map((med, idx) => (
                  <li key={idx}>
                    {med.medicineId?.name || "Unnamed"} × {med.quantity} — ₹{med.price}
                  </li>
                ))}
              </ul>
              <small>Placed on: {new Date(order.placedAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
