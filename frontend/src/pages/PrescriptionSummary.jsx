import React, { useEffect, useState } from "react";
import axios from "axios";

function PrescriptionSummary({ user, addToCart }) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get(`/api/prescriptions/user/${user._id}`);
        setPrescriptions(res.data);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
      }
    };

    fetchPrescriptions();
  }, [user]);

  const addAllToCart = (items) => {
    items.forEach(item => addToCart(item.medicine, item.quantity));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-success">📄 Your Prescriptions</h3>
      {prescriptions.map(p => (
        <div key={p._id} className="card p-3 mb-4 shadow-sm">
          <h5>Status: <span className={`badge bg-${p.status === "approved" ? "success" : p.status === "rejected" ? "danger" : "warning"}`}>{p.status}</span></h5>
          <p><strong>Uploaded:</strong> {new Date(p.createdAt).toLocaleString()}</p>

          {p.status === "approved" && p.items?.length > 0 && (
            <>
              <h6 className="mt-3">💊 Approved Medicines:</h6>
              <ul className="list-group mb-3">
                {p.items.map(({ medicine, quantity }, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{medicine.name}</strong> – ₹{medicine.price} <br />
                      <small className="text-muted">Qty: {quantity}</small>
                    </div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => addToCart(medicine, quantity)}>
                      Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
              <button className="btn btn-success w-100" onClick={() => addAllToCart(p.items)}>
                🛍️ Add All to Cart
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PrescriptionSummary;
