import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ToastAndroid,
  ScrollView,
  View,
  Text,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { updateAccessibility } from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function Accessibility({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1];

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [accessibilityContrast, setAccessibilityContrast] = useState(userData.accessibility[0])
  const [accessibilityMode, setAccessibilityMode] = useState(userData.accessibility[1])

  async function update(position, value) {
    let accessibilityArray = []
    if (position == 0) {
      setAccessibilityContrast(!accessibilityContrast)
      accessibilityArray = [value, accessibilityMode]
      if (value) {
        accessibilityArray = [value, false]
        setAccessibilityMode(false)
      }
    } else {
      setAccessibilityMode(!accessibilityMode)
      accessibilityArray = [accessibilityContrast, value]
    }

    console.log("aaaa", accessibilityArray)

    try {
      const response = await fetch(
        "https://sb-api.herokuapp.com/users/" + userData.userID,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userData.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessibility: accessibilityArray,
          }),
        }
      );
      if (response.ok) {
        const updateArray = accessibilityArray
        console.log("............", updateArray)
        dispatch(updateAccessibility(updateArray));
        console.log(userData)
        ToastAndroid.show(
          "Alterações efetuadas com sucesso!",
          ToastAndroid.SHORT
        );
      } else {
        const errorData = await response.json();
        Alert.alert("Erro!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  }

  useEffect(() => {

  }, [accessibilityContrast, accessibilityMode])

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[
        dark_mode ? dark_styles.containerLight : styles.containerLight,
        { paddingTop: CONST.backgroundPaddingTop / 2 },
      ]}
    >
      <ScrollView>
        <StatusBar style={dark_mode ? "light" : "dark"} />
        <Text style={dark_mode ? dark_styles.titleText : styles.titleText}>
          Acessibilidade {"\n"}
        </Text>
        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            Alto contraste
          </Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              accessibilityContrast
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={ accessibilityContrast}
            onValueChange={() => {
              update(0, !accessibilityContrast);
            }}
          />
        </View>
        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            Modo noturno
          </Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              accessibilityMode
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={ accessibilityMode}
            onValueChange={() => {
              update(1, !accessibilityMode);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
