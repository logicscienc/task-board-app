import axios from "./axiosInstance";

// GET all projects
export const getProjects = async () => {
  const res = await axios.get("/projects");
  return res.data;
};

// GET single project
export const getProjectById = async (id) => {
  const res = await axios.get(`/projects/${id}`);
  return res.data;
};

// CREATE project
export const createProject = async (data) => {
  const res = await axios.post("/projects", data);
  return res.data;
};

// UPDATE project
export const updateProject = async (id, data) => {
  const res = await axios.put(`/projects/${id}`, data);
  return res.data;
};

// DELETE project
export const deleteProject = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};