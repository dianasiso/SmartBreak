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
import { logUser, logoutUser } from "../../redux/user.js";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  const getAuthStatus = async () => {
    const authStatus = await AsyncStorage.getItem("authStatus");
    console.log("AuthStatus atual", authStatus);
    return authStatus;
  };

  const getUserStorage = async () => {
    const userStorage = await AsyncStorage.getItem("userStorage");
    console.log("Dados do user no Async Storage", userStorage);
    return userStorage;
  };

  const tokenCheck = (dataConexao, dataAtual) => {
    // Adiciona 3 meses à data de conexão
    const threeMonthsLater = new Date(dataConexao);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    // Verifica se a data atual é maior ou igual a três meses após a data de conexão
    return dataAtual >= threeMonthsLater;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await getAuthStatus();
      if (status === "true") {
        const userStorage = await getUserStorage();
        dispatch(logUser(JSON.parse(userStorage))); // Parse the JSON string
        const dataConexao = new Date(
          JSON.parse(userStorage).connected_in.replace("Z", "")
        );
        const dataAtual = new Date(Date.now());

        console.log("Data de conexão:", dataConexao);
        console.log("Data atual:", dataAtual);

        if (tokenCheck(dataConexao, dataAtual)) {
          console.log("Já se passaram três meses!");
          dispatch(logoutUser());
          AsyncStorage.removeItem("userStorage");

          setTimeout(() => {
            navigation.navigate("Welcome");
          }, 3500);
        } else {
          console.log("Ainda não se passaram três meses.");

          setTimeout(() => {
            navigation.navigate("TabRoutes");
          }, 3500);
        }
      } else {
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 3500);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

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
