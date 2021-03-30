import axios from "axios";
require("dotenv").config();
export const Axios = axios.create({
  baseURL: "https://frientor-server.herokuapp.com/",
  headers: {
    "content-type": "application/json",
  },
});
