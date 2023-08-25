import { https } from "./config";

export const userService = {
  loginUser: (data) => {
    return https.post(`/api/Users/signin`, data);
  },
  signUpUser: (data) => {
    return https.post(`/api/Users/signup`, data);
  },
};
