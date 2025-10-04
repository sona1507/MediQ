import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Cart.css";

export default function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  // ✅ Prioritize user.userId for backend compatibility
  const userId = user?.userId || user?._id;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await api.get(`/cart/user/${userId}`);
        console.log("🛒 Cart response:", res.data);
        const data = res.data?.items || [];
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch cart items:", err.message || err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();

    const addedItem = localStorage.getItem("addedToCart");
    if (addedItem) {
      alert(`✅ ${addedItem} added to cart!`);
      localStorage.removeItem("addedToCart");
    }
  }, [userId]);

  const getTotal = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

 const handleBuySingle = async (item) => {
  if (!userId) return alert("Please log in to place an order.");
  const token = localStorage.getItem("token");
  if (!token) return alert("Missing token. Please log in again.");

  setPlacingOrder(true);

  try {
    const payload = {
      medicines: [
        {
          medicineId: item.medicineId || item._id,
          quantity: item.quantity || 1,
        },
      ],
    };

    const res = await api.post("/orders", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.message || "Order placed successfully");

    // ✅ Remove the ordered item from cart
    await api.delete(`/cart/user/${userId}/item/${item.medicineId || item._id}`);

    // ✅ Refresh cart
    const updatedCart = await api.get(`/cart/user/${userId}`);
    const data = updatedCart.data?.items || [];
    setCartItems(Array.isArray(data) ? data : []);

    navigate("/orders");
  } catch (err) {
    console.error("❌ Single item order error:", err);
    alert(err.response?.data?.message || "Failed to place order");
  } finally {
    setPlacingOrder(false);
  }
};


  const handleBuyAll = async () => {
    if (!userId) return alert("Please log in to place an order.");
    if (cartItems.length === 0) return alert("Cart is empty.");
    const token = localStorage.getItem("token");
    if (!token) return alert("Missing token. Please log in again.");

    setPlacingOrder(true);

    try {
      const payload = {
        medicines: cartItems.map((item) => ({
          medicineId: item.medicineId || item._id,
          quantity: item.quantity || 1,
        })),
      };

      console.log("📦 Sending full cart order payload:", payload);

      const res = await api.post("/orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Order placed successfully");

      // Clear cart
      await api.delete(`/cart/user/${userId}`);
      setCartItems([]);
      navigate("/orders");
    } catch (err) {
      console.error("❌ Cart order error:", err);
      alert(err.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  // ✅ Early return AFTER hooks to avoid ESLint violations
  if (!user || !userId) {
    console.warn("🚫 Invalid user object:", user);
    return (
      <div className="container my-5">
        <h3 className="mb-4 text-primary">🛒 Your Cart</h3>
        <div className="alert alert-warning">Please log in to view your cart.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-5">
        <h3 className="mb-4 text-primary">🛒 Your Cart</h3>
        <div className="alert alert-secondary">Loading cart items...</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-primary">🛒 Your Cart</h3>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="list-group mb-4">
            {cartItems.map((item, idx) => (
              <div
                key={item.medicineId || `${item.name}-${idx}`}
                className="list-group-item d-flex justify-content-between align-items-center cart-item"
              >
                <div>
                  <h5 className="mb-1">{item.name || "Unnamed Medicine"}</h5>
                  <small className="text-muted">
                    ₹{item.price || 0} × {item.quantity || 1}
                  </small>
                  {item.description && (
                    <p className="mt-1 text-muted small">{item.description}</p>
                  )}
                </div>

                <div className="d-flex flex-column align-items-end">
                  <strong>₹{(item.price || 0) * (item.quantity || 1)}</strong>
                  <button
                    className="btn btn-sm btn-outline-success mt-2"
                    onClick={() => handleBuySingle(item)}
                    disabled={placingOrder}
                  >
                    {placingOrder ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 cart-total">
            <h5>Total:</h5>
            <h5 className="text-success">₹{getTotal()}</h5>
          </div>

          <button
            className="btn btn-success w-100 cart-checkout-btn"
            onClick={handleBuyAll}
            disabled={placingOrder}
          >
            {placingOrder ? "Processing..." : "🧾 Proceed to Buy All"}
          </button>
        </>
      )}
    </div>
  );
}
