import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const prescriptionId = new URLSearchParams(location.search).get("prescription");

  useEffect(() => {
    if (prescriptionId) {
      api.get(`/prescriptions/${prescriptionId}`)
        .then(res => {
          setMedicines(res.data.medicineIds || []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load prescription:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [prescriptionId]);

  const handleConfirm = () => {
    alert("✅ Order placed successfully!");
    navigate("/profile");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary">🛒 Checkout</h2>
      {loading ? (
        <p>Loading medicines...</p>
      ) : medicines.length === 0 ? (
        <div className="alert alert-warning">No medicines found for this prescription.</div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {medicines.map(med => (
              <li key={med._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{med.name}</strong> – ₹{med.price}
                  <br />
                  <small>{med.description}</small>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-success w-100" onClick={handleConfirm}>
            ✅ Confirm & Place Order
          </button>
        </>
      )}
    </div>
  );
}
