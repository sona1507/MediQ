import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export default function BuyMedicine({ user }) {
  const { id } = useParams();
  const userId = user?.userId;

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [highlightUpload, setHighlightUpload] = useState(false);
  const [prescriptionStatus, setPrescriptionStatus] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isPrescriptionRequired = medicine?.prescriptionRequired === "Required";

  // ✅ Fetch medicine by ID
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const { data } = await api.get(`/medicines/${id}`);
        setMedicine(data);
      } catch (err) {
        console.error("Failed to fetch medicine:", err);
        setMedicine(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  // ✅ Memoized prescription status fetcher
  const refreshStatus = useCallback(async () => {
    if (!userId || !medicine?._id || !isPrescriptionRequired) return;

    try {
      const { data } = await api.get("/prescriptions/status", {
        params: { userId, medicineId: medicine._id },
      });
      setPrescriptionStatus(data?.status || null);
    } catch (err) {
      console.error("Failed to fetch prescription status:", err);
      setPrescriptionStatus(null);
    }
  }, [userId, medicine?._id, isPrescriptionRequired]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !userId || !medicine?._id) return;

    if (prescriptionStatus && prescriptionStatus !== "Rejected") {
      alert(`Prescription already ${prescriptionStatus}. You cannot re-upload.`);
      return;
    }

    setPrescriptionFile(file);
    setHighlightUpload(false);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("medicineId", medicine._id);

    try {
      const res = await api.post("/prescriptions/upload", formData);
      if (res.status === 201) {
        await refreshStatus();
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload prescription.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddToCart = () => {
    if (isPrescriptionRequired && !prescriptionStatus) {
      setHighlightUpload(true);
      return;
    }

    if (isPrescriptionRequired && prescriptionStatus !== "Approved") {
      alert(`⛔ Prescription status is "${prescriptionStatus}". You can proceed only after approval.`);
      return;
    }

    console.log("✅ Medicine added to cart:", medicine.name);
    // TODO: Add to cart logic or navigation
  };

  if (loading) return <p className="text-center">Loading medicine details…</p>;
  if (!medicine) return <p className="text-center text-danger">Medicine not found.</p>;

  const imageUrl = medicine.image?.startsWith("/uploads")
    ? `http://localhost:5000${medicine.image}`
    : medicine.image || "/images/azivo.jpg";

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-success">🛒 Buy Medicine</h2>

      <div className="card p-4 shadow-sm">
        <h4 className="text-center mb-3">{medicine.name}</h4>

        <div className="text-center mb-4">
          <img
            src={imageUrl}
            alt={medicine.name}
            style={{
              height: "180px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "1px solid #211a1aff",
              backgroundColor: "#fff",
              maxWidth: "100%",
            }}
          />
        </div>

        <p><b>Category:</b> {medicine.category}</p>
        <p><b>Price:</b> ₹{medicine.price}</p>
        <p><b>Stock:</b> {medicine.stock}</p>
        <p><b>Dosage:</b> {medicine.dosage}</p>
        <p><b>Symptoms:</b> {medicine.symptoms?.join(", ")}</p>
        <p><b>Description:</b> {medicine.description}</p>
        <p><b>Prescription:</b> {medicine.prescriptionRequired}</p>

        {isPrescriptionRequired && (
          <div className="mt-4">
            <label className="form-label"><b>Upload Prescription</b></label>
            <input
              type="file"
              className={`form-control ${highlightUpload ? "border-danger" : ""}`}
              accept="image/*,.pdf"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && (
              <p className="mt-2 text-info">Uploading prescription...</p>
            )}
            {prescriptionFile && !uploading && (
              <p className="mt-2 text-success">
                ✅ File selected: <i>{prescriptionFile.name}</i>
              </p>
            )}
            {highlightUpload && (
              <p className="text-danger mt-2">Prescription is required to proceed.</p>
            )}

            {prescriptionStatus && (
              <div className="mt-3">
                <label className="form-label"><b>Prescription Status</b></label>
                <div className={`alert alert-${prescriptionStatus === "Approved" ? "success" : prescriptionStatus === "Rejected" ? "danger" : "warning"}`}>
                  {prescriptionStatus === "Approved" && "✅ Approved"}
                  {prescriptionStatus === "Pending" && "⏳ Pending"}
                  {prescriptionStatus === "Rejected" && "❌ Rejected"}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-primary mt-4 w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
