import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Font Gotham
import { useFonts } from "expo-font";

export default function HelpCenterProfile() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Centro de ajuda</Text>
        <View></View>
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

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },
});
