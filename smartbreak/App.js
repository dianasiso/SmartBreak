import React from "react";
//import { StyleSheet, Text, View } from "react-native";
//import Maintenance from "./src/errors/maintenance";

import Dashboard from "./src/screens/dashboard";
import Goals from "./src/screens/goals";
import Profile from "./src/screens/profile";
import Stats from "./src/screens/stats";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import { AppstoreOutlined } from 'antd';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          position: "absolute",
          padding: 6,
          fontWeight: "600",
          fontSize: 11,
        },
        tabBarIconStyle: {
          padding: 7,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "transparent",
          height: 60,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          position: "absolute",
        },

        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Painel",
          tabBarActiveTintColor: "#0051BA",
        }}
      />

      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          tabBarLabel: "Dicas",
          tabBarActiveTintColor: "#0051BA",
        }}
      />

      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: "Estatísticas",
          tabBarActiveTintColor: "#0051BA",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: "#0051BA",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
