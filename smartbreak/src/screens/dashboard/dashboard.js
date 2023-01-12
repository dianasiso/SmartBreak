import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const BatteryToggle = () => {
  return (
    <View style={toggleStyles.toggleView}>
      <View style={toggleStyles.toggleContainer} />
    </View>
  );
};

const Battery = () => {
  return (
    <View style={batteryStyles.batteryView}>
      <View style={batteryStyles.batteryContainer} />
      <View style={batteryStyles.batteryTip} />
      <View style={batteryStyles.batteryFill} />
    </View>
  );
};

const VerEquipa = () => {
  return (
    <View>
      <Pressable>
        <Text>Ver equipa</Text>
      </Pressable>
    </View>
  );
};

export default function Dashboard() {
  return (
    <View style={dashboardStyles.pageContainer}>
      <BatteryToggle />
      <Battery />
      <VerEquipa />
      <StatusBar style="auto" />
    </View>
  );
}

const dashboardStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
  },
});

const batteryStyles = StyleSheet.create({
  batteryView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 130,
  },
  batteryContainer: {
    height: 100,
    width: 175,
    backgroundColor: "white",
    borderRadius: 22,
    borderColor: "black",
    borderWidth: 2.5,
  },
  batteryTip: {
    height: 30,
    width: 10,
    backgroundColor: "black",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 2.5,
    marginLeft: 4,
  },
  batteryFill: {
    height: 88,
    width: 90, //máximo 163
    backgroundColor: "#0051BA",
    borderRadius: 18,
    position: "absolute",
    left: 6,
  },
});

const toggleStyles = StyleSheet.create({
  toggleView: {
    top: 65,
  },
  toggleContainer: {
    width: 340,
    height: 32,
    backgroundColor: "#E3ECF7",
    borderRadius: 8,
  },
});
