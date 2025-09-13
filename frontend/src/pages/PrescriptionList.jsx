import React, { useEffect, useState } from "react";
import api from "../api/axios";

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    api.get("/prescriptions").then((res) => setPrescriptions(res.data));
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await api.patch(`/prescriptions/${id}/${action}`);
      alert(res.data.message);
      setPrescriptions((prev) =>
        prev.map((p) => (p._id === id ? res.data.prescription : p))
      );
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">📑 All Prescriptions</h3>
      {prescriptions.map((p) => (
        <div key={p._id} className="card p-3 mb-3 shadow-sm">
          <p><strong>User:</strong> {p.userId}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>File:</strong> {p.originalName}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={() => handleAction(p._id, "approve")}>Approve</button>
            <button className="btn btn-danger" onClick={() => handleAction(p._id, "reject")}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrescriptionList;
