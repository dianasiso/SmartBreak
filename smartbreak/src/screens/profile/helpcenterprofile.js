import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";

export default function HelpCenterProfile() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ marginTop: 30 }}>Centro de ajuda</Text>
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
  },
});
