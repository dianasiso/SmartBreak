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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action) => {
      const {
        userID,
        name,
        surname,
        email,
        password,
        admin,
        organization,
        department,
        battery,
        total_battery,
        pause,
        rewards,
        accessibility,
        permissions,
        notifications,
        created,
        connected_in,
        token,
        battery_full,
        organization_name,
        full,
        department_name,
        department_description,
      } = action.payload;

      state.userID = userID;
      state.name = name;
      state.surname = surname;
      state.email = email;
      state.password = password;
      state.admin = admin;
      state.organization = organization;
      state.department = department;
      state.battery = battery;
      state.total_battery = total_battery;
      state.pause = pause;
      state.rewards = rewards;
      state.accessibility = accessibility;
      state.permissions = permissions;
      state.notifications = notifications;
      state.created = created;
      state.connected_in = connected_in;
      state.token = token;
      state.battery_full = battery_full;
      state.organization_name = organization_name;
      state.full = full;
      state.department_name = department_name;
      state.department_description = department_description;
      console.log("Login State:", state);
    },
    logoutUser: (state) => {
      state.userID = "";
      state.name = "";
      state.surname = "";
      state.email = "";
      state.password = "";
      state.admin = "";
      state.organization = "";
      state.department = "";
      state.battery = 0;
      state.total_battery = 0;
      state.pause = false;
      state.rewards = [];
      state.accessibility = [];
      state.permissions = [];
      state.notifications = [];
      state.created = "";
      state.connected_in = "";
      state.token = "";
      state.battery_full = 0;
      state.organization_name = "";
      state.full = 0;
      state.department_name = "";
      state.department_description = "";
      console.log("Logout State:", state);
    },
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
  updatePassword,
  updateNotifications,
  updateAccessibility,
  updateSecurity,
} = userSlice.actions;

export default userSlice.reducer;
