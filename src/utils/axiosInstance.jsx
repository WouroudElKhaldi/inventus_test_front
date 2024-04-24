import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9876",
  withCredentials: true,
});

export default axiosInstance;
