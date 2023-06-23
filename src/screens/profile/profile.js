import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Edit2,
  Category,
  Calendar,
  Clock,
  MedalStar,
  Setting2,
} from "iconsax-react-native";

// API
import { fetchData } from "../../config/api.js";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateUserData } from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function ProfilePage({ navigation, route }) {
  const userData = useSelector((state) => state.user);
  const {
    name,
    surname,
    userID,
    organization,
    department,
    organization_name,
    department_name,
    permissions,
  } = userData;
  const [refreshing, setRefreshing] = useState(false);

  const dark_mode = userData.accessibility[1];

  useEffect(() => {
    updateUserData(userData);
  }, [userData]);

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider
      style={
        dark_mode ? dark_styles.mainContainerDark : styles.mainContainerLight
      }
    >
      <StatusBar style={dark_mode ? "light" : "dark"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={dark_mode ? dark_styles.containerLight : styles.containerLight}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={dark_mode ? dark_styles.profileInfo : styles.profileInfo}>
          <Text
            accessible={true}
            accessibilityLabel={"Texto escrito " + name + surname}
            style={[
              dark_mode ? dark_styles.titleText : styles.titleText,
              { marginTop: CONST.boxMargin },
            ]}
          >
            {name + " " + surname}
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={"Texto branco escrito " + department_name}
            style={[
              dark_mode ? dark_styles.normalText : styles.normalText,
              { opacity: 0.5, marginTop: CONST.boxMargin },
            ]}
          >
            {department_name}
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={"Texto escrito " + organization_name}
            style={[
              dark_mode ? dark_styles.normalText : styles.normalText,
              { opacity: 0.5, marginTop: CONST.boxMargin },
            ]}
          >
            {organization_name}
          </Text>
        </View>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito Editar perfil. É acompanhado por um ícone de lápis."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Edit2
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Editar perfil
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito Os meus equipamentos. É acompanhado por um ícone composto por 4 quadrados numa disposição 2 por 2."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("MyDevices")}
        >
          <Category
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.boxIcon : styles.normalText}>
            {" "}
            Os meus equipamentos
          </Text>
        </Pressable>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito As minhas rotinas. É acompanhado por um ícone de calendário."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("MyRoutines")}
        >
          <Calendar
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            As minhas rotinas
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito Histórico de pausas. É acompanhado por um ícone de relógio."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("HistoricoPausas")}
        >
          <Clock
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Histórico de pausas
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito As minhas recompensas. É acompanhado por um ícone de medalha."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("ProfileRewards")}
        >
          <MedalStar
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            As minhas recompensas
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão escrito Definições. É acompanhado por um ícone de roda dentada."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            {
              paddingTop: CONST.textPadding,
              paddingBottom: CONST.textPadding,
              borderBottomWidth: 0,
            },
          ]}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Setting2
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Definições
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
