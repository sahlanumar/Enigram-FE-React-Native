import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationService from "./NavigationService";

const API_BASE_URL = "http://10.10.102.131:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  async (config) => {

    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");

      NavigationService.navigate("Login");
    }
    return Promise.reject(error);
  }
);

export default api;
