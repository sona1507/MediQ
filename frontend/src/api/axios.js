import axios from "axios";

const baseURL =
  typeof process.env.REACT_APP_API_URL === "string" && process.env.REACT_APP_API_URL.trim()
    ? process.env.REACT_APP_API_URL.trim()
    : "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ Automatically handle headers
api.interceptors.request.use(config => {
  config.headers["Accept"] = "application/json";

  const isFormData = config.data instanceof FormData;
  const isMultipart = config.headers["Content-Type"]?.includes("multipart/form-data");

  if (!isFormData && !isMultipart) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// ✅ Global error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
