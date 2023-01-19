import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
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

import { useSelector } from "react-redux";

export default function ProfileSettings({ navigation }) {
  //const dispatch = useDispatch();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user.userID);
  const uid = userData;

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  const apagarconta = () => {
    Alert.alert("Atenção", "Deseja apagar a sua conta permanentemente?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: (() => {
          getAuth().currentUser.delete()
          firebase.firestore().collection('users_data').doc(uid).delete()
          
          handleLogout();
        })
      },
    ]);
  };

  const handleLogout = () => {
    try {
      navigation.navigate("Welcome");
    } catch (err) {
      console.error(err);
    }
  };

  const terminarsessao = () => {
    Alert.alert("Atenção", "Tem a certeza que deseja terminar a sessão? ", [
      { text: "Cancelar" },
      {
        text: "Confirmar",

        onPress: () => handleLogout(),
      },
    ]);
  };

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Definições</Text>

        <Pressable style={styles.options} onPress={() => navigation.navigate("EditPassword")}>
            <Lock1 color="#000000"  />
            <Text style={styles.text}>  Alterar palavra-passe</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={() => navigation.navigate("NotificationsProfile")}>
            <Notification color="#000000"/>
            <Text style={styles.text}>  Notificações</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={() => navigation.navigate("SecurityProfile")}>
            <SecurityUser color="#000000" /> 
            <Text style={styles.text}>  Segurança</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={() => navigation.navigate("TermsofUseProfile")}>
            <DocumentText1 color="#000000"/>
            <Text style={styles.text}>  Termos de utilização</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={() => navigation.navigate("HelpCenterProfile")}>
            <MessageQuestion color="#000000" />
            <Text style={styles.text}>  Centro de ajuda</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={apagarconta} >
            <Trash color="#000000"  onPress={apagarconta}/>
            <Text style={styles.text}>  Apagar conta</Text>
        </Pressable>

        <Pressable style={styles.options} onPress={terminarsessao} >
            <Logout color="#000000" onPress={terminarsessao}/>
            <Text style={styles.text}>  Terminar sessão</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get("window").width;

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
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
});
