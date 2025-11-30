
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // هنستخدم api routes في Next
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
