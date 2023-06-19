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
  } = userData;
  const [refreshing, setRefreshing] = useState(false);
  console.log("AQUI" + userData.organization_name);

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
    <SafeAreaProvider style={styles.mainContainerLight}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerLight}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileInfo}>
          <Text
            accessible={true}
            accessibilityLabel={
              "Texto na cor preta num fundo branco escrito " + name + surname
            }
            style={[styles.titleText, { marginTop: CONST.boxMargin }]}
          >
            {name + " " + surname}
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={
              "Texto na cor preta num fundo branco escrito " + department_name
            }
            style={[
              styles.normalText,
              { opacity: 0.5, marginTop: CONST.boxMargin },
            ]}
          >
            {department_name}
          </Text>
          <Text
            accessible={true}
            accessibilityLabel={
              "Texto na cor preta num fundo branco escrito " + organization_name
            }
            style={[
              styles.normalText,
              { opacity: 0.5, marginTop: CONST.boxMargin },
            ]}
          >
            {organization_name}
          </Text>
        </View>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito Editar perfil. É acompanhado por um ícone de lápis."
          style={[
            styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Edit2 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Editar perfil</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito Os meus equipamentos. É acompanhado por um ícone composto por 4 quadrados numa disposição 2 por 2."
          style={[
            styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("MyDevices")}
        >
          <Category variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Os meus equipamentos</Text>
        </Pressable>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito As minhas rotinas. É acompanhado por um ícone de calendário."
          style={[
            styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("MyRoutines")}
        >
          <Calendar variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> As minhas rotinas</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito Histórico de pausas. É acompanhado por um ícone de relógio."
          style={[
            styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("historicoPausas")}
        >
          <Clock variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Histórico de pausas</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito As minhas recompensas. É acompanhado por um ícone de medalha."
          style={[
            styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("ProfileRewards")}
        >
          <MedalStar variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> As minhas recompensas</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na cor preta num fundo branco escrito Definições. É acompanhado por um ícone de roda dentada."
          style={[
            styles.boxOptions,
            {
              paddingTop: CONST.textPadding,
              paddingBottom: CONST.textPadding,
              borderBottomWidth: 0,
            },
          ]}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Setting2 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Definições</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
