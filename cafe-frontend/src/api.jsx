// src/lib/axios.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with API base URL
//   withCredentials: true, 
});

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Example: attach token from localStorage
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Global error handling
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized. Redirect to login.");
//       // You can force logout or redirect here
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
