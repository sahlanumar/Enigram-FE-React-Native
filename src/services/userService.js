import api from "./api"; 

/**
 * Mengambil data profil publik seorang pengguna berdasarkan username.
 * @param {string} username - Username pengguna yang akan dicari.
 * @returns {Promise<object>} Data profil pengguna.
 */
const getUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get user service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch user profile");
  }
};

/**
 * Mengambil daftar postingan dari seorang pengguna.
 * @param {string} username - Username pengguna.
 * @param {object} params - Parameter paginasi { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari postingan pengguna.
 */
const getUserPosts = async (username, params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get(`/users/${username}/posts`, { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get user posts service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch user posts");
  }
};

/**
 * Mengikuti (follow) seorang pengguna.
 * @param {string} username - Username pengguna yang akan diikuti.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const followUser = async (username) => {
  try {
    const response = await api.post(`/users/${username}/follow`);
    return response.data;
  } catch (error) {
    console.error(
      "Follow user service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to follow user");
  }
};

/**
 * Berhenti mengikuti (unfollow) seorang pengguna.
 * @param {string} username - Username pengguna yang akan di-unfollow.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const unfollowUser = async (username) => {
  try {
    const response = await api.delete(`/users/${username}/follow`);
    return response.data;
  } catch (error) {
    console.error(
      "Unfollow user service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to unfollow user");
  }
};

/**
 * Mengambil daftar pengikut (followers) dari seorang pengguna.
 * @param {string} username - Username pengguna.
 * @param {object} params - Parameter paginasi { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari pengguna yang menjadi follower.
 */
const getFollowers = async (username, params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get(`/users/${username}/followers`, { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get followers service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch followers");
  }
};

/**
 * Mengambil daftar orang yang diikuti (following) oleh seorang pengguna.
 * @param {string} username - Username pengguna.
 * @param {object} params - Parameter paginasi { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari pengguna yang di-follow.
 */
const getFollowing = async (username, params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get(`/users/${username}/following`, { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get following service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch following list");
  }
};

const userService = {
  getUser,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};

export default userService;
