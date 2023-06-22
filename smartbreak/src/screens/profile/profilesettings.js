import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  Dimensions,
  ScrollView,
  View,
  Text,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Lock1,
  Notification,
  SecurityUser,
  DocumentText1,
  MessageQuestion,
  Trash,
  Logout,
  Autobrightness,
} from "iconsax-react-native";

import { useRoute } from "@react-navigation/native";

// Font Gotham
import { useFonts } from "expo-font";

import { useDispatch, useSelector } from "react-redux";
import user, { logoutUser } from "../../redux/user.js";

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function ProfileSettings({ route, navigation }) {
  let flag = false;

  const cleanUserData = async () => {
    const userStorage = await AsyncStorage.removeItem("userStorage");
    const authStatus = await AsyncStorage.removeItem("authStatus");
    console.log("cleaned user and auth", authStatus + userStorage);
    flag = true;
    return authStatus, userStorage;
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const password = userData.password;
  const dark_mode = userData.accessibility[1];
  const uid = userData.userID;
  const props = route.params;
  const [reload, setReload] = useState(false);

  const deleteAccount = async () => {
    console.log("user data id", userData.userID);
    try {
      const response = await fetch(
        "https://sb-api.herokuapp.com/users/" + userData.userID,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      );
      if (response.ok) {
        handleLogout();
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };
  /*
  useEffect(() => {
    if (route.params && route.params.reload) {
      if (props !== undefined) {
        setReload(true);
      }

      if (reload) {
        setReload(false);
      }
    }
  }, [route.params]);*/

  console.log("Password stored in Redux:", password);
  console.log("Notifications:", userData.notifications);
  console.log("Accessibility:", userData.accessibility);

  const apagarconta = () => {
    Alert.alert("Atenção", "Deseja apagar a sua conta permanentemente?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          deleteAccount();
        },
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await cleanUserData();
      dispatch(logoutUser());
      if (flag) {
        navigation.navigate("Welcome");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const terminarsessao = () => {
    Alert.alert("Atenção", "Tem a certeza que deseja terminar a sessão? ", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          handleLogout();
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[
        dark_mode ? dark_styles.containerLight : styles.containerLight,
        { paddingTop: CONST.backgroundPaddingTop / 2 },
      ]}
    >
      <ScrollView>
        <StatusBar style={dark_mode ? "light" : "dark"} />
        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Definições. É o título da página."
          style={dark_mode ? dark_styles.titleText : styles.titleText}
        >
          Definições{"\n"}
        </Text>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Alterar palavra-passe. É acompanhado por um icon de cadeado trancado."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("EditPassword")}
        >
          <Lock1
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Alterar palavra-passe
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Notificações. É acompanhado por um icon de sino."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("NotificationsProfile")}
        >
          <Notification
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Notificações
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Segurança. É acompanhado por um icon de escudo com uma pessoa estampada."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("SecurityProfile")}
        >
          <SecurityUser
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Segurança
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Acessibilidade. É acompanhado por um icon da letra A."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("Accessibility")}
        >
          <Autobrightness
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Acessibilidade
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Termos de utilização. É acompanhado por um icon de folha de bloco de notas."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("TermsofUseProfile")}
        >
          <DocumentText1
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Termos de utilização
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Centro de Ajuda. É acompanhado por um icon de ponto de interrogação."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={() => navigation.navigate("HelpCenterProfile")}
        >
          <MessageQuestion
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Centro de ajuda
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Aapgar conta. É acompanhado por um icon de caixote de lixo."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            { paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding },
          ]}
          onPress={apagarconta}
        >
          <Trash
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
            onPress={apagarconta}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Apagar conta
          </Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Terminar sessão. É acompanhado por um icon de porta com indicação de saída."
          style={[
            dark_mode ? dark_styles.boxOptions : styles.boxOptions,
            {
              paddingTop: CONST.textPadding,
              paddingBottom: CONST.textPadding,
              borderBottomWidth: 0,
            },
          ]}
          onPress={terminarsessao}
        >
          <Logout
            variant="Bold"
            style={dark_mode ? dark_styles.boxIcon : styles.boxIcon}
            onPress={terminarsessao}
          />
          <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
            {" "}
            Terminar sessão
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
