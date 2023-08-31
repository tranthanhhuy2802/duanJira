import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";

export const updateStatus = createAsyncThunk(
  "task/updateStatus",
  async (taskUpdateStatus) => {
    const res = await taskService.updateStatus(taskUpdateStatus);
    return res.data.content;
  }
);
export const getTaskDetail = createAsyncThunk(
  "task/getTaskDetail",
  async (taskId) => {
    const res = await taskService.getTaskDetail(taskId);
    return res.data.content;
  }
);
export const assignUserTask = createAsyncThunk(
  "task/assignUserTask",
  async (taskId) => {
    const res = await taskService.assignUserTask(taskId);
    return res.data.content;
  }
);
export const updatePriority = createAsyncThunk(
  "task/updatePriority",
  async (data) => {
    const res = await taskService.updatePriority(data);
    return res.data.content;
  }
);
export const addComment = createAsyncThunk("task/addComment", async (data) => {
  const res = await taskService.addComment(data);
  return res.data.content;
});
const initialState = {
  task: [],
  taskDetail: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStatus.fulfilled, (state, action) => {
        // console.log(action);
      })
      .addCase(getTaskDetail.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.taskDetail = action.payload;
      })
      .addCase(assignUserTask.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});
export const {} = taskSlice.actions;

export default taskSlice.reducer;
