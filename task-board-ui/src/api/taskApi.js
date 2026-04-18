import axios from "./axiosInstance";

// GET tasks 
export const getTasks = async (projectId, params = {}) => {
  const res = await axios.get(`/projects/${projectId}/tasks`, {
    params, 
  });
  return res.data;
};

// GET single task
export const getTaskById = async (id) => {
  const res = await axios.get(`/tasks/${id}`);
  return res.data;
};

// CREATE task
export const createTask = async (projectId, data) => {
  const res = await axios.post(`/projects/${projectId}/tasks`, data);
  return res.data;
};

// UPDATE task
export const updateTask = async (id, data) => {
  const res = await axios.put(`/tasks/${id}`, data);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
//   return res.data;
};