import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Medicines() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [meds, setMeds] = useState([]);

  async function fetchAll() {
    setLoading(true);
    try {
      // Try unified search endpoint first
      const url = q?.trim()
        ? `/api/medicines?search=${encodeURIComponent(q)}`
        : `/api/medicines`;
      const { data } = await api.get(url);
      setMeds(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setMeds([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Search Medicines</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Search by name, category, or symptoms (e.g., fever, antibiotic)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={fetchAll}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading…</p>}

      {!loading && meds.length === 0 && (
        <p className="text-gray-500">No medicines found.</p>
      )}

      <ul className="grid md:grid-cols-2 gap-3">
        {meds.map((m) => (
          <li key={m._id} className="border rounded p-3">
            <div className="font-semibold">{m.name}</div>
            <div className="text-sm text-gray-600">
              {m.category} • ₹{m.price} • Stock: {m.stock}
            </div>
            {m.symptoms?.length ? (
              <div className="text-sm mt-1">
                <b>Symptoms:</b> {m.symptoms.join(", ")}
              </div>
            ) : null}
            {m.dosage && <div className="text-sm mt-1"><b>Dosage:</b> {m.dosage}</div>}
            <div className="text-sm mt-1">{m.description}</div>
            <div className="text-sm mt-1">
              <b>Prescription:</b> {m.prescriptionRequired || (m.prescriptionRequired === false ? "Not Required" : "Not Required")}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
