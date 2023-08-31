import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { deleteLocal, getDuLieuLocal } from "../../utils/localStore";

export const getAllUser = createAsyncThunk(
  "nguoiDung/getAllUser",
  async (userId = "") => {
    const res = await userService.getAllUser(userId);
    return res.data.content;
  }
);
export const getUserById = createAsyncThunk(
  "nguoiDung/getUserById",
  async (userId) => {
    const res = await userService.getUserbyId(userId);
    return res.data.content;
  }
);

const initialState = {
  hoTen: getDuLieuLocal("user"),
  users: [],
  editUser: [],
  listMembers: [],
  userSearch: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDuLieuHoTen: (state, action) => {
      if (state.hoTen == null) {
        console.log(action.payload);
        state.hoTen = action.payload;
      }
    },
    setlistMembers: (state, action) => {
      // console.log(action.payload);
      state.listMembers = action.payload;
    },
    logOut: (state, action) => {
      return (state.hoTen = null), deleteLocal("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.listMembers = [action.payload];
        state.userSearch = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.editUser = action.payload;
      });
  },
});
export const { setDuLieuHoTen, logOut, setlistMembers } = userSlice.actions;

export default userSlice.reducer;
