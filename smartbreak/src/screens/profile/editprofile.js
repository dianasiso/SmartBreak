//Mudar fonte :p
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>exemplo de página de detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
