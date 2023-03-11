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
        <StatusBar style="dark" />
        <Text style={styles.titleText}>As minhas recompensas</Text>

        <View style={styles.metricsElement}>
          <View style={styles.metricsCircle}>
            <Car color={CONST.darkerColor} />
          </View>
          <Text style={styles.smallText}>
            1 dia de férias em setembro
          </Text>
        </View>

        <View style={styles.metricsElement}>
          <View style={styles.metricsCircle}>
            <Coffee color={CONST.darkerColor} />
          </View>
          <Text style={styles.metricsElementText}>
            10 cafés grátis no bar
          </Text>
        </View>

        <View style={styles.metricsElement}>
          <View style={styles.metricsCircle}>
            <DollarCircle color={CONST.darkerColor} />
          </View>
          <Text style={styles.metricsElementText}>
            Vale 15€ em refeições
          </Text>
        </View>

      </ScrollView>
    </SafeAreaProvider>
  );
}