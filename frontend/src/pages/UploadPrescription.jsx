import { useState } from "react";
import api from "../api/axios";

export default function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Choose a file");

    const form = new FormData();
    form.append("file", file);
    if (userId) form.append("userId", userId);

    try {
      const { data } = await api.post("/api/prescriptions/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded ✅");
      console.log(data);
    } catch (e) {
      console.error(e);
      alert("Upload failed");
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Upload Prescription</h2>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="User ID (optional)"
          className="border px-3 py-2 rounded w-full"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button className="px-4 py-2 rounded bg-black text-white">Upload</button>
      </form>
    </section>
  );
}
