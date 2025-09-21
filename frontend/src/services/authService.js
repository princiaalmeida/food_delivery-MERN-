import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};
