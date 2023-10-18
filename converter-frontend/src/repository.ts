import axios from "axios";

const repository = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

export default repository;
