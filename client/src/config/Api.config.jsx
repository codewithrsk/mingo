import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:4500",
  withCredentials:true
});

export default api;










