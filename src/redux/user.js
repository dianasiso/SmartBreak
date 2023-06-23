import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  notifications: [false, true, true],
  created: "",
  connected_in: "",
  token: "",
  organization_name: "",
  full: 1000,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, action) => {
      const userData = action.payload;
      Object.assign(state, userData);
    },
    logoutUser: () => initialState,
    updateUserData: (state, action) => {
      const { name, surname, email, permissions } = action.payload;
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

export const saveUserDataToAsyncStorage = async (updatedFields) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, ...updatedFields };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewPasswordToAsyncStorage = async (password) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, password: password };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewNotificationsToAsyncStorage = async (notifications) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, notifications: notifications };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewAccessibilityToAsyncStorage = async (accessibility) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, accessibility: accessibility };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewSecurityToAsyncStorage = async (security) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, permissions: security };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewPauseToAsyncStorage = async (pause) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, pause: pause };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewBatteryToAsyncStorage = async (battery) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, battery: battery };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};

export const saveNewTotalBatteryToAsyncStorage = async (total_battery) => {
  try {
    const savedData = await AsyncStorage.getItem("userStorage");
    const userData = JSON.parse(savedData);
    const updatedUserData = { ...userData, total_battery: total_battery };
    const updatedDataString = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem("userStorage", updatedDataString);
    console.log("User data saved to AsyncStorage:", updatedUserData);
  } catch (error) {
    console.error("Error saving user data to AsyncStorage:", error);
  }
};



export default userSlice.reducer;
