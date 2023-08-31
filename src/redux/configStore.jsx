import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import projecSlice from "./slice/projectSlice";
import taskSlice from "./slice/taskSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projecSlice,
    task: taskSlice,
  },
});
