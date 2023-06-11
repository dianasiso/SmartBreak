import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  name: "",
  surname: "",
  email: "",
  password: "",
  admin: "",
  organization: "",
  department: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action) => {
      console.log("logUser action being called:", action);
      state.userID = action.payload;
      state.token = action.payload;
      state.email = action.payload;
      state.password = action.payload;
      state.name = action.payload;
      state.surname = action.payload;
      state.admin = action.payload;
      state.organization = action.payload;
      state.department = action.payload;
      console.log("state:", state);
    },
    logoutUser: (state) => {
      state.userID = "";
      state.token = "";
      state.name = "";
      state.surname = "";
      state.email = "";
      state.password = "";
      state.admin = "";
      state.organization = "";
      state.department = "";
      console.log("state:", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
