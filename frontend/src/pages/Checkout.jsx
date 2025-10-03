import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = user?.userId;

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  const prescriptionId = new URLSearchParams(location.search).get("prescription");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        if (prescriptionId) {
          const res = await api.get(`/prescriptions/${prescriptionId}`);
          setMedicines(res.data.medicineIds || []);
        } else if (userId) {
          const res = await api.get(`/cart/user/${userId}`);
          setMedicines(res.data || []);
        }
      } catch (err) {
        console.error("Failed to load medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [prescriptionId, userId]);

  const getTotal = () =>
    medicines.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleConfirm = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    try {
      await api.post("/orders/place", {
        userId,
        medicines,
        address,
      });

      alert("✅ Order placed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary">🛒 Checkout</h2>

      {loading ? (
        <p>Loading medicines...</p>
      ) : medicines.length === 0 ? (
        <div className="alert alert-warning">No medicines found for checkout.</div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {medicines.map((med, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{med.name}</strong> – ₹{med.price}
                  <br />
                  <small>{med.description}</small>
                </div>
                <span>Qty: {med.quantity || 1}</span>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Total:</h5>
            <h5 className="text-success">₹{getTotal()}</h5>
          </div>

          <label className="form-label"><b>Delivery Address</b></label>
          <textarea
            className="form-control mb-4"
            rows="3"
            placeholder="Enter your address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="btn btn-success w-100" onClick={handleConfirm}>
            ✅ Confirm & Place Order
          </button>
        </>
      )}
    </div>
  );
}
