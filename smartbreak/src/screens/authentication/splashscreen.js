import { StatusBar } from "expo-status-bar";
import { React, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

// Font Gotham
import { useFonts } from "expo-font";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

import * as SecureStore from "expo-secure-store";

export default function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleNavigate = (value) => {
    let id = value;
    navigation.navigate("TabRoutes");
    dispatch(logUser(id));
  };

  useEffect(() => {
    SecureStore.getItemAsync("uid").then((value) => {
      if (!value) {
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 1700); // delay for 1.7 seconds before navigating
      } else {
        handleNavigate(value);
      }
    }, []);
  });

  //console.log(uid);
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });
  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.splashImage}>
        <Image
          source={require("./../../imgs/img_logo_white_version.png")}
          style={{
            width: width * 0.2,
            height: width * 0.2,
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
    backgroundColor: "#0051BA",
    position: "relative",
  },
  splashImage: {
    width: width * 0.2,
    height: width * 0.2,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -(width * 0.2) / 2,
    marginLeft: -(width * 0.2) / 2,
    alignSelf: "center",
  },
});
