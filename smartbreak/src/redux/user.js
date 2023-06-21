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
  battery: 0,
  total_battery: 0,
  pause: false,
  rewards: [],
  accessibility: [false, false],
  permissions: [false, true],
  notifications: [false, true, true, true],
  created: "",
  connected_in: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action) => {
      const userData = action.payload;
      Object.assign(state, userData);
      // console.log("Login State:", state);
    },
    logoutUser: () => initialState,
    updateUserData: (state, action) => {
      const { name, surname, email, permissions } = action.payload.message;
      state.name = name;
      state.surname = surname;
      state.email = email;
      state.permissions = permissions;
      console.log("Updated user data state:", state);
    },
    updatePassword: (state, action) => {
      const { password } = action.payload;
      state.password = password;
      console.log("Updated password state:", state);
    },
    updateNotifications: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
      console.log("Updated notifications state:", state);
    },
    updateBattery: (state, action) => {
      state.battery = action.payload;
      console.log("Updated Battery State:", state);
    },
    updateTotalBattery: (state, action) => {
      state.total_battery = action.payload;
      console.log("Updated Battery State:", state);
    },
    updateAccessibility: (state, action) => {
      state.accessibility = action.payload;
      console.log("Updated accessibility State:", state);
    },
    updateSecurity: (state, action) => {
      state.permissions = action.payload;
      console.log("Updated security State:", state);
    },
    updatePause: (state, action) => {
      state.pause = action.payload;
      console.log("Pause State:", state);
    },
  },
});

export const {
  logUser,
  logoutUser,
  updateUserData,
  updateBattery,
  updatePause,
  updateTotalBattery,
  updatePassword,
  updateNotifications,
  updateAccessibility,
  updateSecurity,
} = userSlice.actions;

export default userSlice.reducer;
