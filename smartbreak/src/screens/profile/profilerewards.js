import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Car, Coffee, DollarCircle } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

export default function ProfileRewards() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>As minhas recompensas</Text>

        <View style={styles.options}>
          <Car color="#000000" />
          <TouchableHighlight
            onPress={() => navigation.navigate("EditPassword")}
            underlayColor={"transparent"}
          >
            <Text style={styles.text}>1 dia de férias em setembro</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <Coffee color="#000000" />
          <TouchableHighlight
            onPress={() => navigation.navigate("NotificationsProfile")}
            underlayColor={"transparent"}
          >
            <Text style={styles.text}>10 cafés grátis no bar</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <DollarCircle color="#000000" />
          <TouchableHighlight
            onPress={() => navigation.navigate("SecurityProfile")}
            underlayColor={"transparent"}
          >
            <Text style={styles.text}>Vale 15€ em refeições</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
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
