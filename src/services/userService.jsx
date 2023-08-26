import { https } from "./config";

export const userService = {
  loginUser: (data) => {
    return https.post(`/api/Users/signin`, data);
  },
  signUpUser: (data) => {
    return https.post(`/api/Users/signup`, data);
  },
  getAllUser: (userId = "") => {
    if (userId.trim() !== "") {
      return https.get(`/api/Users/getUser?keyword=${userId}`);
    } else {
      return https.get(`/api/Users/getUser`);
    }
  },
  deleteUser: (userId) => {
    return https.delete(`/api/Users/deleteUser?id=${userId}`);
  },
};
