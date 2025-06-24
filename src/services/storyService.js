import api from "./api"; 

/**
 * Membuat story baru.
 * @param {object} storyData - Data story { imageUrl }.
 * @returns {Promise<object>} Story yang baru dibuat.
 */
const createStory = async (storyData) => {
  try {
    const response = await api.post("/stories", storyData);
    return response.data;
  } catch (error) {
    console.error(
      "Create story service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to create story");
  }
};

/**
 * Mengambil detail satu story berdasarkan ID.
 * @param {string|number} storyId - ID dari story.
 * @returns {Promise<object>} Data detail story.
 */
const getStory = async (storyId) => {
  try {
    const response = await api.get(`/stories/${storyId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get story service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch story");
  }
};

/**
 * Mengambil semua story aktif dari seorang pengguna.
 * @param {string|number} userId - ID dari pengguna.
 * @returns {Promise<Array<object>>} Array dari stories pengguna.
 */
const getUserStories = async (userId) => {
  try {
    const response = await api.get(`/stories/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get user stories service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch user stories");
  }
};

/**
 * Mengambil story aktif dari pengguna yang diikuti (untuk barisan story di home).
 * @returns {Promise<Array<object>>} Array dari story yang aktif.
 */
const getActiveStories = async () => {
  try {
    const response = await api.get("/stories/active");
    return response.data;
  } catch (error) {
    console.error(
      "Get active stories service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch active stories");
  }
};

/**
 * Menghapus story.
 * @param {string|number} storyId - ID dari story yang akan dihapus.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const deleteStory = async (storyId) => {
  try {
    const response = await api.delete(`/stories/${storyId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Delete story service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to delete story");
  }
};

const storyService = {
  createStory,
  getStory,
  getUserStories,
  getActiveStories,
  deleteStory,
};

export default storyService;
