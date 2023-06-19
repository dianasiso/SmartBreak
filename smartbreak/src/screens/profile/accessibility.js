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

import { useSelector } from "react-redux";


// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function Accessibility({ navigation }) {
  
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  let accessibilityArray = [...userData.accessibility];
  const [accessibilityContrast, setAccessibilityContrast] = useState(accessibilityArray[0])
  const [accessibilityMode, setAccessibilityMode] = useState(accessibilityArray[1])


  async function update (value) {
    const updatedAccessibilityArray = [...accessibilityArray];
    if (value == 0) {
      updatedAccessibilityArray[0] = !accessibilityContrast
      setAccessibilityContrast(!accessibilityContrast)
    } else  {
      updatedAccessibilityArray[1] = !accessibilityMode
      setAccessibilityMode(!accessibilityMode)
    }

    try {
      const response = await fetch( "https://sb-api.herokuapp.com/users/" + userData.userID,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userData.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessibility: updatedAccessibilityArray,
        }),
      });
      if (response.ok) {
        // ! DANIEL ATUALIZA O REDUX AQUI PFV
      } else {
        const errorData = await response.json();
        Alert.alert("Erro!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  }

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[dark_mode ? dark_styles.containerLight : styles.containerLight, { paddingTop: CONST.backgroundPaddingTop / 2 }]}
    >
      <ScrollView>
      <StatusBar style={dark_mode ? "light" : "dark" } />
        <Text style={dark_mode ? dark_styles.titleText : styles.titleText}>Acessibilidade {"\n"}</Text>
        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>Alto contraste</Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{ false: CONST.switchOffColor, true: dark_mode ? CONST.lightBlue : CONST.switchOnColor }}
            thumbColor={accessibilityContrast ? CONST.switchIndicatorColor : dark_mode ? CONST.lightBlue: CONST.mainBlue}
            value={accessibilityContrast}
            onValueChange={() => {
              update(0)
              ToastAndroid.show('Alterações efetuadas com sucesso!', ToastAndroid.SHORT);
            }}
          />
        </View>
        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>Modo noturno</Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{ false: CONST.switchOffColor, true: dark_mode ? CONST.lightBlue : CONST.switchOnColor }}
            thumbColor={accessibilityMode ? CONST.switchIndicatorColor : dark_mode ? CONST.lightBlue: CONST.mainBlue}
            value={accessibilityMode}
            onValueChange={() => {
              update(1)
              ToastAndroid.show('Alterações efetuadas com sucesso!', ToastAndroid.SHORT);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

