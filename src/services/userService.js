import axios from "axios";

const API_URL = "http://localhost:8000/api";
const accessToken = localStorage.getItem("access_token");

const headers = {
  Authorization: `Bearer ${accessToken}`,
};

export default {
  getUsers() {
    return axios.get(API_URL + "/user", { headers });
  },
  getUser(id) {
    return axios.get(`${API_URL + "/user/show"}/${id}`, { headers });
  },
  createUser(userData) {
    return axios.post(API_URL + "/register", userData);
  },
  updateUser(id, userData) {
    return axios.put(`${API_URL + "/user/update"}/${id}`, userData, {
      headers,
    });
  },
  deleteUser(id) {
    return axios.delete(`${API_URL + "/user/destroy"}/${id}`, { headers });
  },

  async login(email, password) {
    try {
      const response = await axios.post(API_URL + "/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access_token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
