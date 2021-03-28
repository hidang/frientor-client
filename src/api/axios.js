import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://frientor-server.herokuapp.com/",
  headers: {
    "content-type": "application/json",
  },
});
