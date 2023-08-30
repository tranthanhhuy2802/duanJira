import { https } from "./config";
export const taskService = {
  createTask: (data) => {
    return https.post(`/api/Project/createTask`, data);
  },
};
