import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

//screenOrientation
import * as ScreenOrientation from "expo-screen-orientation";

// Font Gotham
import { useFonts } from "expo-font";

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  const getAuthStatus = async () => {
    const authStatus = await AsyncStorage.getItem("authStatus");
    console.log("authStatus", authStatus);
    return authStatus;
  };

  const getUserStorage = async () => {
    const userStorage = await AsyncStorage.getItem("userStorage");
    console.log("userStorage", userStorage);
    return userStorage;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await getAuthStatus();
      if (status === "true") {
        const userStorage = await getUserStorage();
        dispatch(logUser(JSON.parse(userStorage))); // Parse the JSON string
        setTimeout(() => {
          navigation.navigate("TabRoutes");
        }, 3500);
      } else {
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 3500);
      }
      console.log("authStatus no useEffect !!!", status);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  //console.log(uid);
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.splashImage}>
        <Image
          source={require("./../../imgs/white-gif-jun.gif")}
          style={{
            width: width * 0.7,
            height: width * 0.7,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07407B",
    position: "relative",
  },
  splashImage: {
    width: width * 0.2,
    height: width * 0.2,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -(width * 0.7) / 2,
    marginLeft: -(width * 0.7) / 2,
    alignSelf: "center",
  },
});
