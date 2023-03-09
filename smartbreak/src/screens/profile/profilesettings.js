import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TouchableHighlight,
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
} from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { getAuth, deleteUser } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user.js";
import * as SecureStore from "expo-secure-store";

// CSS
import { styles } from "./../../styles/css.js";

export default function ProfileSettings({ navigation }) {
  const dispatch = useDispatch();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user.userID);
  const uid = userData;

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
    if (!uid) {
      console.error("UID is undefined");
      return;
    }
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
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.titleText}>Definições</Text>

        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("EditPassword")}
        >
          <Lock1 variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Alterar palavra-passe</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("NotificationsProfile")}
        >
          <Notification variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Notificações</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("SecurityProfile")}
        >
          <SecurityUser variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Segurança</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("TermsofUseProfile")}
        >
          <DocumentText1 variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Termos de utilização</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("HelpCenterProfile")}
        >
          <MessageQuestion variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Centro de ajuda</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          style={styles.profileOptions}
          onPress={() => navigation.navigate("HelpCenterProfile")}
        >
          <MessageQuestion variant="Bold" style={styles.profileIcon} />
          <Text style={styles.profileOptionsText}> Acessibilidade</Text>
          {/*
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          FALTA ICONE PARA ACESSIBILIDADE E LINKAR A PAGINA DE ACESSIBILIDADE
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          !!!!!!!!!!!!!
          */}
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.profileOptions} onPress={apagarconta}>
          <Trash
            variant="Bold"
            style={styles.profileIcon}
            onPress={apagarconta}
          />
          <Text style={styles.profileOptionsText}> Apagar conta</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.profileOptions} onPress={terminarsessao}>
          <Logout
            variant="Bold"
            style={styles.profileIcon}
            onPress={terminarsessao}
          />
          <Text style={styles.profileOptionsText}> Terminar sessão</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get("window").width;

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },

  options: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    width: screenWidth - 50,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    backgroundColor: "#E3ECF7",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
});
*/
