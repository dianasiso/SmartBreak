import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, Text, Linking, ScrollView, Pressable } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";


// Font Gotham
import { useFonts } from 'expo-font';

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";
import { useNavigation } from "@react-navigation/native";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";


export default function Password() {

  const apiURL = "https://sb-api.herokuapp.com/emails/recover";
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require('./../../fonts/GothamMedium.ttf'),
    GothamBook: require('./../../fonts/GothamBook.ttf'),
  });

  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/emails", {
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          const message = data.message;
          for (let i = 0; i < message.length; i++) {
            emails[message[i].email] = message[i].date_created;
          }

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        //Alert.alert("Error", error.message);
      }
    }

    fetchData();
  }, []);

  const updateData = async () => {
    if (email.trim() in emails) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          pass: password,
        }),
      });

      if (response.ok) {
        Alert.alert("E-mail enviado!", "Enviamos uma nova palavra-passe por e-mail.");
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

    } else {
      Alert.alert("Email não registado!", "Por favor, registe-se primeiro na aplicação.");
    }
  }


  const submit = () => {
    if (email.length == 0) {
      Alert.alert('Preencha corretamente o campo E-mail');
      return false;
    }

    updateData();
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <Text
        accessible={true}
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Esqueceu-se da palavra-passe?"
        style={styles.titleTextWhite}>Esqueceu-se da palavra-passe?</Text>
      <Text
        accessible={true}
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Introduza o seu e-mail para que possa recuperar a sua palavra-passe."
        style={[styles.normalTextWhite, { paddingTop: CONST.boxPadding, paddingBottom: CONST.inputMargin }]}>
        Introduza o seu e-mail para que possa recuperar a sua palavra-passe.</Text>

      <ScrollView style={{ marginTop: CONST.backgroundPaddingTop }}>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito E-mail."
          style={styles.inputLabelWhite}>E-mail</Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução do E-mail."
          style={styles.inputFieldWhite}
          onChangeText={(text) => setEmail(text)} />
        {/* <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Nova palavra-passe."
          style={styles.inputLabelWhite}>Nova palavra-passe</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.inputFieldWhite}
          accessible={true}
          accessibilityLabel="Campo para introdução da Nova palavra-passe."
          onChangeText={(text) => setPassword(text)} />
        <View style={styles.passwordProgressBar}>
          <PassMeter
            showLabels={false}
            password={password}
            maxLength={15}
            minLength={8}
            labels={[]}
          />
        </View>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Confirmar nova palavra-passe."
          style={styles.inputLabelWhite}>Confirmar nova palavra-passe</Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução da Confirmação da nova palavra-passe."
          secureTextEntry={true}
          style={styles.inputFieldWhite}
          onChangeText={(text) => setConfirmPassword(text)} /> */}
        <Pressable
          accessible={true}
          accessibilityLabel="Botão da cor branca num fundo azul escuro com o objetivo de efetuar a redefinição da palavra-passe. Tem escrito na cor azul escuro Redefinir palavra-passe."
          onPress={() => submit()} style={[styles.buttonWhite, { marginBottom: CONST.backgroundPaddingLateral, marginTop: CONST.backgroundPaddingLateral }]}>
          <Text style={styles.buttonWhiteText}>Redefinir palavra-passe</Text>
        </Pressable>
      </ScrollView>

    </SafeAreaProvider>
  );
}

