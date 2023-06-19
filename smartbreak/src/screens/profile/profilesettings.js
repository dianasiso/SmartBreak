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

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import { getAuth, deleteUser } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user.js";
import * as SecureStore from "expo-secure-store";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function ProfileSettings({ navigation }) {
  const dispatch = useDispatch();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]
  const uid = userData.userID;

  const apagarconta = () => {
    Alert.alert("Atenção", "Deseja apagar a sua conta permanentemente?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          getAuth().currentUser.delete();
          firebase.firestore().collection("users_data").doc(uid).delete();
          firebase.firestore().collection("users_devices").doc(uid).delete();
          firebase.firestore().collection("users_routines").doc(uid).delete();

          handleLogout();
        },
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("uid");
      navigation.navigate("Welcome");
    } catch (err) {
      console.error(err);
    }
  };

  const terminarsessao = () => {
    // if (!uid) {
    //   console.error("UID is undefined");
    //   return;
    // }
    Alert.alert("Atenção", "Tem a certeza que deseja terminar a sessão? ", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          firebase.firestore().collection("users_data").doc(uid).update({
            pause: false,
          });
          handleLogout();
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider
      style={styles.containerLight}
    >
      <ScrollView
      showsHorizontalScrollIndicator={false}>
        <StatusBar style="dark" />
        <Text 
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Definições. É o título da página."
          style={styles.titleText}>Definições{"\n"}</Text>

        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Alterar palavra-passe. É acompanhado por um icon de cadeado trancado."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("EditPassword")}
        >
          <Lock1 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Alterar palavra-passe</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Notificações. É acompanhado por um icon de sino."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("NotificationsProfile")}
        >
          <Notification variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Notificações</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Segurança. É acompanhado por um icon de escudo com uma pessoa estampada."
         style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("SecurityProfile")}>
          <SecurityUser variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Segurança</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Acessibilidade. É acompanhado por um icon da letra A."
         style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("Accessibility")}>
          <Autobrightness variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Acessibilidade</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Termos de utilização. É acompanhado por um icon de folha de bloco de notas."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("TermsofUseProfile")}>
          <DocumentText1 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Termos de utilização</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Centro de Ajuda. É acompanhado por um icon de ponto de interrogação."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={() => navigation.navigate("HelpCenterProfile")}>
          <MessageQuestion variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Centro de ajuda</Text>
        </Pressable>
        <Pressable 
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Aapgar conta. É acompanhado por um icon de caixote de lixo."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding}]}
          onPress={apagarconta}>
          <Trash
            variant="Bold"
            style={styles.boxIcon}
            onPress={apagarconta}/>
          <Text style={styles.normalText}> Apagar conta</Text>
        </Pressable>
        <Pressable 
          accessible={true}
          accessibilityLabel="Botão transparente com texto na preta num fundo branco escrito Terminar sessão. É acompanhado por um icon de porta com indicação de saída."
          style={[styles.boxOptions, {paddingTop: CONST.textPadding, paddingBottom: CONST.textPadding, borderBottomWidth: 0}]}
          onPress={terminarsessao}>
          <Logout
            variant="Bold"
            style={styles.boxIcon}
            onPress={terminarsessao}/>
          <Text style={styles.normalText}> Terminar sessão</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
