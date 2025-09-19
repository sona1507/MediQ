import axios from "axios";

// ✅ Create Axios instance with fallback for local dev
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL?.trim() || "http://localhost:5000/api",
  withCredentials: true, // ✅ Sends cookies if needed
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
