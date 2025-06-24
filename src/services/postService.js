import api from "./api"; 

/**
 * Membuat postingan baru.
 * @param {object} postData - Data postingan { caption, imageUrl, location }.
 * @returns {Promise<object>} Postingan yang baru dibuat.
 */
const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error(
      "Create post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to create post");
  }
};

/**
 * Mengambil detail satu postingan berdasarkan ID.
 * @param {string|number} postId - ID dari postingan.
 * @returns {Promise<object>} Data detail postingan.
 */
const getPost = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Get post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch post");
  }
};

/**
 * Memperbarui postingan.
 * @param {string|number} postId - ID dari postingan.
 * @param {object} updateData - Data yang akan diperbarui { caption, location }.
 * @returns {Promise<object>} Postingan yang telah diperbarui.
 */
const updatePost = async (postId, updateData) => {
  try {
    const response = await api.put(`/posts/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(
      "Update post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to update post");
  }
};

/**
 * Menghapus postingan.
 * @param {string|number} postId - ID dari postingan.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Delete post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to delete post");
  }
};


/**
 * Mengambil feed postingan dari orang yang diikuti.
 * @param {object} params - Parameter { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari postingan untuk feed.
 */
const getFeed = async (params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get("/posts/feed", { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get feed service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch feed");
  }
};

/**
 * Mengambil feed untuk halaman jelajah (explore).
 * @param {object} params - Parameter { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari postingan untuk explore.
 */
const getExploreFeed = async (params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get("/posts/explore", { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get explore feed service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch explore feed");
  }
};


/**
 * Menyukai sebuah postingan.
 * @param {string|number} postId - ID dari postingan.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error(
      "Like post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to like post");
  }
};

/**
 * Batal menyukai sebuah postingan.
 * @param {string|number} postId - ID dari postingan.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const unlikePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error(
      "Unlike post service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to unlike post");
  }
};

/**
 * Menambah komentar pada postingan.
 * @param {string|number} postId - ID dari postingan.
 * @param {string} content - Isi komentar.
 * @returns {Promise<object>} Komentar yang baru dibuat.
 */
const addComment = async (postId, content) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error(
      "Add comment service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to add comment");
  }
};

/**
 * Mengambil daftar komentar dari sebuah postingan.
 * @param {string|number} postId - ID dari postingan.
 * @param {object} params - Parameter { limit, offset }.
 * @returns {Promise<Array<object>>} Array dari komentar.
 */
const getPostComments = async (postId, params = { limit: 20, offset: 0 }) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`, { params });
    return response.data;
  } catch (error) {
    console.error(
      "Get comments service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch comments");
  }
};

/**
 * Menghapus komentar.
 * @param {string|number} postId - ID dari postingan.
 * @param {string|number} commentId - ID dari komentar yang akan dihapus.
 * @returns {Promise<object>} Pesan konfirmasi.
 */
const deleteComment = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Delete comment service error:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to delete comment");
  }
};

const postService = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getFeed,
  getExploreFeed,
  likePost,
  unlikePost,
  addComment,
  getPostComments,
  deleteComment,
};

export default postService;
