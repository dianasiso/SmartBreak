//add storybook (descomentar e comentar o resto se for para ver o storybook)
//export { default } from "./.storybook";

//import { StyleSheet, Text, View } from "react-native";
import AvailableSoon from "./src/errors/availableSoon";

//navegação
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//import TabRoutes from "./src/routes/Routes";
import {
  MainStackNavigation,
  DashboardStackNavigation,
  AuthStackNavigation,
  TabRoutes,
} from "./src/routes/Routes";

//funções navegação
const Stack = createStackNavigator();

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./src/config/firebase.js";

import { Provider } from "react-redux";
import store from "./src/redux/store";

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//import useEffect
import { useState, useEffect } from "react";

const clearAuthStatus = async () => {
  await AsyncStorage.removeItem("authStatus");
};

// const getAuthStatus = async () => {
//   const authStatus = await AsyncStorage.getItem("authStatus");
//   console.log("authStatus", authStatus);
//   return authStatus;
// };

// const getUserStorage = async () => {
//   const userStorage = await AsyncStorage.getItem("userStorage");
//   console.log("userStorage", userStorage);
//   return userStorage;
// };

//export da app

export default function App() {
  console.log("carregou?");
  const [loaded] = useFonts({
    GothamMedium: "./src/fonts/GothamMedium.ttf",
    GothamBook: "./src/fonts/GothamBook.ttf",
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
