import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectService } from "../../services/projectservice";

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async (name = "") => {
    const res = await projectService.getAllProject(name);
    return res.data.content;
  }
);
export const getProjectCategory = createAsyncThunk(
  "project/getProjectCategory",
  async () => {
    const res = await projectService.getProjectCategory();
    return res.data.content;
  }
);
export const getProjectByNameProject = createAsyncThunk(
  "project/getProjectByName",
  async (name) => {
    const res = await projectService.getProjectByNameProject(name);
    return res.data.content;
  }
);
export const getProjectDetail = createAsyncThunk(
  "project/getProjectDetail",
  async (projectId) => {
    const res = await projectService.getProjectDetail(projectId);
    return res.data.content;
  }
);
export const getAllTypeTask = createAsyncThunk(
  "project/getAllTypeTask",
  async () => {
    const res = await projectService.getAllTypeTask();
    return res.data.content;
  }
);
export const getAllPriority = createAsyncThunk(
  "project/getAllPriority",
  async () => {
    const res = await projectService.getAllPriority();
    return res.data.content;
  }
);
export const getAllStatus = createAsyncThunk(
  "project/getAllStatus",
  async () => {
    const res = await projectService.getAllStatus();
    return res.data.content;
  }
);
export const getAllUserByProjectId = createAsyncThunk(
  "project/getAllUserByProjectId",
  async (projectId) => {
    const res = await projectService.getAllUserByProjectId(projectId);
    return res.data.content;
  }
);
// export const getAssignUserProject = createAsyncThunk(
//   "project/getAssignUserProject",
//   async (assignUser) => {
//     const res = await projectService.getAssignUserProject(assignUser);
//     return res.data.content;
//   }
// );
const initialState = {
  projects: [],
  projectCategory: [],
  projectByName: {},
  projectDetail: [],
  projectMembers: [],
  nameProject: [],
  allTypeTask: [],
  allPriority: [],
  allStatus: [],
  AllUserByProjectId: [],
};

export const projecSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProject.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.projects = action.payload;
        state.nameProject = action.payload.projectName;
      })
      .addCase(getProjectCategory.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.projectCategory = action.payload;
      })
      .addCase(getProjectByNameProject.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.projectByName = action.payload;
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        // console.log(action.payload.members);
        state.projectDetail = action.payload;
        state.projectMembers = [action.payload.members];
      })
      .addCase(getAllTypeTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.allTypeTask = action.payload;
      })
      .addCase(getAllPriority.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.allPriority = action.payload;
      })
      .addCase(getAllStatus.fulfilled, (state, action) => {
        state.allStatus = action.payload;
      })
      .addCase(getAllUserByProjectId.fulfilled, (state, action) => {
        state.AllUserByProjectId = action.payload;
      })
      .addCase(getAllUserByProjectId.rejected, (state, action) => {
        state.AllUserByProjectId = [];
      });
    // .addCase(getAssignUserProject.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.projectMembers = action.payload;
    // });
  },
});
export const {} = projecSlice.actions;

export default projecSlice.reducer;
