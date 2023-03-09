import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Car, Coffee, DollarCircle } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function ProfileRewards() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={[styles.titleText, { paddingBottom: CONST.textPadding }]}>As minhas recompensas</Text>

        <Pressable style={[styles.boxOptions, {borderBottomColor: 'transparent'}]}>
          <View style={styles.iconBackground}>
            <Car variant="Bold"/>
          </View>
          
          <Text style={styles.normalText}>1 dia de férias em setembro</Text>
        </Pressable>

        <Pressable style={styles.options}>
          <Coffee color={CONST.darkerColor} />
          <Text style={styles.text}>10 cafés grátis no bar</Text>
        </Pressable>

        <Pressable style={styles.options}>
          <DollarCircle color={CONST.darkerColor} />
          <Text style={styles.text}>Vale 15€ em refeições</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  options: {
    marginTop: 30,
    borderRadius: 15,
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    marginLeft: 15,
    lineHeight: 24,
  },
});
*/