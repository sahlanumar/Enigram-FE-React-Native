import api from "./api"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Melakukan registrasi pengguna baru.
 * @param {object} userData - Data pengguna { username, email, password, fullName }
 * @returns {Promise<object>} Data pengguna yang terdaftar.
 */
const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    if (response.data && response.data.token) {
      const { user, token } = response.data;

      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Registration service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Registration failed");
  }
};

/**
 * Melakukan login pengguna.
 * @param {object} credentials - Kredensial pengguna { email, password }
 * @returns {Promise<object>} Data pengguna yang berhasil login.
 */
const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    if (response.data && response.data.token) {
      const { user, token } = response.data;

      await AsyncStorage.setItem("accessToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  } catch (error) {
    console.error(
      "Login service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Login failed");
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Logout service error:", error.message);
    throw new Error("Logout failed");
  }
};

/**
 * Mengambil profil pengguna yang sedang login.
 * @returns {Promise<object>} Data profil pengguna.
 */
const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Get profile service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch profile");
  }
};

/**
 * Memperbarui profil pengguna.
 * @param {object} profileData - Data yang akan diperbarui { fullName, bio, profilePictureUrl }
 * @returns {Promise<object>} Data profil yang sudah diperbarui.
 */
const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/auth/profile", profileData);
    return response.data;
  } catch (error) {
    console.error(
      "Update profile service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to update profile");
  }
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService;
