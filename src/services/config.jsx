import axios from "axios";
import { getDuLieuLocal } from "../utils/localStore";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0OSIsIkhldEhhblN0cmluZyI6IjA2LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTY4MzIwMDAwMCIsIm5iZiI6MTY4MjYxNDgwMCwiZXhwIjoxNzA5ODMwODAwfQ.k43D4dhebGpNofw1VImBYXXnqBcxtrDhQaHzcaN4mr8";

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
