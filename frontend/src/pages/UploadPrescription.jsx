import React, { useState } from "react";
import api from "../api/axios";

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("userId", "U001"); // ✅ string-based ID



    try {
      setLoading(true);
      const res = await api.post("/prescriptions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">📤 Upload Prescription</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="form-control mb-3"
          />
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {message && (
  <p
    className={`mt-3 text-center ${
      message.toLowerCase().includes("uploaded") ? "text-success" : "text-danger"
    }`}
  >
    {message}
  </p>
)}

      </div>
    </div>
  );
}

export default UploadPrescription;
