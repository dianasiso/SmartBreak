import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action) => {
      console.log("logUser action being called:", action);
      state.userID = action.payload;
      console.log("state:", state);
    },
    logoutUser: (state) => {
      state.userID = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
