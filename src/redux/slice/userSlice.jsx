import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { getDuLieuLocal } from "../../utils/localStore";



export const getAllUser = createAsyncThunk(
  "nguoiDung/getAllUser",
  async (userId = "") => {
    const res = await userService.getAllUser(userId);
    return res.data.content;
  }
);

const initialState = {
  hoTen: getDuLieuLocal("user"),
  users: [],
  findUsers: [],
};

export const userSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    setDuLieuHoTen: (state, action) => {
      if (state.hoTen == null) {
        console.log(action.payload);
        state.hoTen = action.payload;
      }
    },
    setLogout: (state, action) => {
      state.hoTen = action.payload;
    },
  },
  extraReducers: (builder) => { 
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { setDuLieuHoTen } = userSlice.actions;

export default userSlice.reducer;
