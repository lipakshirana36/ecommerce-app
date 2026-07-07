import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-app-kzph.onrender.com/api"
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
