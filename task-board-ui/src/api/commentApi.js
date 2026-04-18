import axios from "./axiosInstance";

// GET comments for a task
export const getComments = async (taskId) => {
  const res = await axios.get(`/tasks/${taskId}/comments`);
  return res.data;
};

// CREATE comment
export const createComment = async (taskId, data) => {
  const res = await axios.post(`/tasks/${taskId}/comments`, data);
  return res.data;
};

// DELETE comment
export const deleteComment = async (id) => {
  const res = await axios.delete(`/comments/${id}`);
  return res.data;
};