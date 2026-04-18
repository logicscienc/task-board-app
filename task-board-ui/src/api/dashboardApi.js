import axios from "./axiosInstance";

export const getDashboard = async () => {
  const res = await axios.get("/dashboard");
  return res.data;
};