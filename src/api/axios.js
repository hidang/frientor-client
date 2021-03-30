import axios from "axios";
export const Axios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
  },
});
