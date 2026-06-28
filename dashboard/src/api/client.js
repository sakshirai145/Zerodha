import axios from "axios";
import API_URL from "./config";

const FRONTEND_LOGIN_URL = process.env.REACT_APP_FRONTEND_URL
  ? process.env.REACT_APP_FRONTEND_URL.replace(/\/+$/, "") + "/login"
  : "/login";

const STATUS_MESSAGES = {
  401: "Session expired. Please log in again.",
  403: "Access denied. You don't have permission for this action.",
  404: "The requested resource was not found.",
  500: "Server error. Please try again later.",
};

const client = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage = "Request timed out. Please try again.";
      return Promise.reject(error);
    }

    if (!error.response) {
      error.userMessage = "Network error. Check your connection and try again.";
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = FRONTEND_LOGIN_URL;
      return Promise.reject(error);
    }

    if (status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = FRONTEND_LOGIN_URL;
      return Promise.reject(error);
    }

    error.userMessage =
      error.response.data?.error || STATUS_MESSAGES[status] || "Something went wrong. Please try again.";
    return Promise.reject(error);
  }
);

export default client;
