import { https } from "./config";
export const taskService = {
  createTask: (data) => {
    return https.post(`/api/Project/createTask`, data);
  },
  updateStatus: (taskUpdateStatus) => {
    return https.put(`/api/Project/updateStatus`, taskUpdateStatus);
  },
  getTaskDetail: (taskId) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${taskId}`);
  },
  deteleTask: (taskId) => {
    return https.delete(`/api/Project/removeTask?taskId=${taskId}`);
  },
  assignUserTask: (data) => {
    return https.post(`/api/Project/assignUserTask`, data);
  },
  updatePriority: (data) => {
    return https.put(`/api/Project/updatePriority`, data);
  },
  updateTask: (data) => {
    return https.post(`/api/Project/updateTask`, data);
  },
  addComment: (data) => {
    return https.post(`/api/Comment/insertComment`, data);
  },
};
