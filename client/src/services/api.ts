import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin authentication
export const loginAdmin = async (username: string, password: string) => {
  const response = await api.post("/admin/login", { username, password });
  return response.data;
};

// Section order management
export const getSectionOrder = async () => {
  const response = await api.get("/admin/section-order");
  return response.data;
};

export const updateSectionOrder = async (sections: string[]) => {
  const response = await api.put("/admin/section-order", { sections });
  return response.data;
};

export default api;