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
const initialState = {
  projects: [],
  projectCategory: [],
  projectByName: {},
  projectDetail: {},
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
        // console.log(action.payload);
        state.projectDetail = action.payload;
      });
  },
});
export const {} = projecSlice.actions;

export default projecSlice.reducer;
