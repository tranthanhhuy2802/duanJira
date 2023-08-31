import axios from "axios";
import { getDuLieuLocal } from "../utils/localStore";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzQiLCJIZXRIYW5TdHJpbmciOiIyMi8wMy8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MTEwNjU2MDAwMDAiLCJuYmYiOjE2OTMwNjkyMDAsImV4cCI6MTcxMTIxMzIwMH0.I9k3be3bbxp64NISKJ-A3aR6mEhF4QfCGakizTqBON8";

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
