import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citizenInfo: localStorage.getItem("citizenInfo")
    ? JSON.parse(localStorage.getItem("citizenInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.citizenInfo = action.payload;
      localStorage.setItem("citizenInfo", JSON.stringify(action.payload));
    },

    clearCredentials: (state) => {
      state.citizenInfo = null;
      localStorage.removeItem("citizenInfo");
    },

    logout: (state) => {
      state.citizenInfo = null;
      localStorage.removeItem("citizenInfo");
    },
  },
});

export const { setCredentials, clearCredentials,logout } = authSlice.actions;

export default authSlice.reducer;
