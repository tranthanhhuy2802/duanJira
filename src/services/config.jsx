import axios from "axios";
import { getDuLieuLocal } from "../utils/localStore";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzQiLCJIZXRIYW5TdHJpbmciOiIxMS8wNC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MTI3OTM2MDAwMDAiLCJuYmYiOjE2OTMwNjkyMDAsImV4cCI6MTcxMjk0MTIwMH0.dcAxAOtlLVw2muO5YfsiVtNNxI5pFOC3YUAx-VQvbPQ";

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
