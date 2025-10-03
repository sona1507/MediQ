import axios from "axios";

// ✅ Determine base URL from environment or fallback
const baseURL =
  typeof process.env.REACT_APP_API_URL === "string" && process.env.REACT_APP_API_URL.trim()
    ? process.env.REACT_APP_API_URL.trim()
    : "http://localhost:5000/api";

// ✅ Create Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ Request interceptor: set headers
api.interceptors.request.use(config => {
  config.headers["Accept"] = "application/json";

  const isFormData = config.data instanceof FormData;
  const isMultipart = config.headers["Content-Type"]?.includes("multipart/form-data");

  if (!isFormData && !isMultipart) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// ✅ Response interceptor: global error logging
api.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message || error?.message || "Unknown error";
    console.error("API error:", message);
    return Promise.reject(error);
  }
);

export default api;
