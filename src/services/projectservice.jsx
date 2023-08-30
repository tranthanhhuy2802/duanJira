import { https } from "./config";

export const projectService = {
  getAllProject: (name = "") => {
    if (name.trim() !== "") {
      return https.get(`/api/Project/getAllProject?keyword=${name}`);
    } else {
      return https.get(`/api/Project/getAllProject`);
    }
  },
  deleteProject: (projectId) => {
    return https.delete(`/api/Project/deleteProject?projectId=${projectId}`);
  },
  //   editUser: (data) => {
  //     return https.put(`/api/Users/editUser`, data);
  //   },
  getProjectCategory: () => {
    return https.get(`/api/ProjectCategory`);
  },
  createProject: (data) => {
    return https.post(`/api/Project/createProjectAuthorize`, data);
  },
  getProjectByNameProject: (name) => {
    return https.get(`/api/Project/getAllProject?keyword=${name}`);
  },
  updateProject: (projectId, data) => {
    return https.put(`/api/Project/updateProject?projectId=${projectId}`, data);
  },
  getProjectDetail: (projectId) => {
    return https.get(`/api/Project/getProjectDetail?id=${projectId}`);
  },
  postAssignUserProject: (assignUser) => {
    return https.post(`/api/Project/assignUserProject`, assignUser);
  },
  deteleAssignUserProject: (assignUser) => {
    return https.post(`/api/Project/removeUserFromProject`, assignUser);
  },
  getAllTypeTask: () => {
    return https.get(`/api/TaskType/getAll`);
  },
  getAllPriority: () => {
    return https.get(`/api/Priority/getAll`);
  },
  getAllStatus: () => {
    return https.get(`/api/Status/getAll`);
  },
  getAllUserByProjectId: (projectId) => {
    return https.get(`/api/Users/getUserByProjectId?idProject=${projectId}`);
  },
};
