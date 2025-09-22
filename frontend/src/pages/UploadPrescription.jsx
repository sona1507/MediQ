import React, { useState, useRef } from "react";
import api from "../api/axios";

function UploadPrescription({ user }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");
    if (!user || !user._id) return setMessage("User not logged in.");

    const formData = new FormData();
    formData.append("file", file); // ✅ Must match backend field name
    formData.append("userId", user._id); // ✅ Dynamic user ID

    try {
      setLoading(true);
      const res = await api.post("/prescriptions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Prescription uploaded successfully.");
      setFile(null);
      fileInputRef.current.value = ""; // ✅ Reset file input
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Upload failed due to server error.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user._id) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          Please sign in to upload a prescription.
        </div>
      </div>
    );
  }

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
            ref={fileInputRef}
          />
          {file && (
            <p className="text-muted small mb-2">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-3 text-center ${
              message.toLowerCase().includes("success") ? "text-success" : "text-danger"
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
