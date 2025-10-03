import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Cart.css";

export default function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = user?.userId || user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
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

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleBuySingle = (item) => {
    navigate(`/checkout?itemId=${item.medicineId || item._id}`);
  };

  if (!user || typeof user !== "object") {
    console.warn("🚫 Invalid user object:", user);
    return (
      <div className="container my-5">
        <h3 className="mb-4 text-primary">🛒 Your Cart</h3>
        <div className="alert alert-secondary">Loading user info...</div>
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

  if (!userId) {
    return (
      <div className="container my-5">
        <h3 className="mb-4 text-primary">🛒 Your Cart</h3>
        <div className="alert alert-warning">Please log in to view your cart.</div>
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
                  >
                    Buy Now
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
            onClick={handleCheckout}
          >
            🧾 Proceed to Buy All
          </button>
        </>
      )}
    </div>
  );
}
