import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

// Font Gotham
import { useFonts } from "expo-font";

export default function EditPassword({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [passwordStored, setPasswordStored] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const userData = useSelector((state) => state.user.userID);
  const uid = userData;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users_data")
      .doc(uid)
      .get()
      .then((doc) => {
        setPasswordStored(doc.data().password);
      });

  }, [])


  const validate_password = (pass) => {
    if (pass.length < 8) {
      Alert.alert("Erro!", "A palavra-passe deve ter no mínimo 8 caracteres.");
      return false;
    }
    return true;
  };

  const validate = () => {
    if (passwordStored != password) {
      Alert.alert(
        "Falha de autenticação!",
        "Insira corretamente a sua palavra-passe atual."
      );
      return false;
    } else if (newPassword != confirmPassword) {
      Alert.alert(
        "Erro!",
        "Digite corretamente a confirmação da palavra-passe."
      );
      return false;
    } else if (password == newPassword) {
      Alert.alert("Erro!", "As palavras-passe não podem ser iguais.");
      return false;
    } else {
      return validate_password(newPassword);
    }
  };

  const editarpasse = () => {
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          if (validate()) {
            firebase.firestore().collection("users_data").doc(uid).update({
              password: password,
            });
            navigation.navigate("ProfileSettings");
          }
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
        <StatusBar style="dark" />
        <Text 
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Alterar Palavra-passe. É o título da página."
          style={styles.titleText}>Alterar palavra-passe{"\n"}</Text>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Palavra-passe atual."
          style={styles.inputLabel}>{"\n"}Palavra-passe atual</Text>
        <TextInput
          secureTextEntry={true}
          placeholder=""
          accessible={true}
          accessibilityLabel="Campo para introdução da Palavra-passe atual."
          style={styles.inputField}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Text
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Nova palavra-passe."
          style={styles.inputLabel}>{"\n"}Nova palavra-passe</Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução da Nova palavra-passe."
          secureTextEntry={true}
          placeholder=""
          style={styles.inputField}
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
        />

        <Text
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Confirmar nova palavra-passe."
          style={styles.inputLabel}>{"\n"}Confirmar nova palavra-passe</Text>
        <TextInput
        accessible={true}
        accessibilityLabel="Campo para introdução da Confirmação da nova palavra-passe."
          secureTextEntry={true}
          placeholder=""
          style={styles.inputField}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />

        <View>
          <Pressable 
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de guardar as alterações. Tem escrito na cor branca a palavra Concluído."
            onPress={() => editarpasse()} style={[styles.primaryButton, {marginTop: CONST.backgroundPaddingLateral}]}>
            <Text style={styles.primaryButtonText}>
              Concluído
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
} 