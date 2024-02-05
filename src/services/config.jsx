import axios from "axios";
import { getDuLieuLocal } from "../utils/localStore";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0OCIsIkhldEhhblN0cmluZyI6IjEzLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDI4ODAwMDAwMCIsIm5iZiI6MTY3OTY3NzIwMCwiZXhwIjoxNzEwNDM1NjAwfQ.lSPZOlcWH-N1gVY8QLGpPHPcKYEMpoh0FJuMEJbeJQQ";

const tokkenAuthorization = getDuLieuLocal("user");
const configHeaderAxios = () => {
  return {
    TokenCybersoft,
    Authorization: "Bearer " + tokkenAuthorization?.accessToken,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
