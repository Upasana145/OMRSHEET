import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  token: null,
  role: null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      console.log("LoginHandler called with payload:", action.payload);
      state.value = true;
      state.role = action?.payload?.data[0]?.role;
      state.username = action?.payload?.data[0]?.username;
      state.auth_id = action?.payload?.data[0]?.auth_id;
      console.log("Updated state after login:", state);
      console.log("Hey I am auth_id:", state.auth_id);
    },
    logoutHandler: (state) => {
      console.log("LogoutHandler called. Current state:", state);
      state.value = false;
      state.role = null;
      state.username = null;
      console.log("Updated state after logout:", state);
    },
    tokenHandler: (state, action) => {
      console.log("TokenHandler called with payload:", action.payload);
      state.token = action.payload; // Set the token with the payload value
      console.log("Updated state after setting token:", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginHandler, logoutHandler, tokenHandler } = authSlice.actions;

export default authSlice.reducer;
