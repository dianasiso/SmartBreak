import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {TextInput, Text, View, ScrollView, Image, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { collection, where, query, getDocs } from "firebase/firestore";

//secure store para guardar a sessao
import * as SecureStore from "expo-secure-store";

// CSS
import { styles } from "./../../styles/css.js";


export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //const userData = useSelector((state) => state.userID);

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");


  const submit = async () => {
    const user = query(
      collection(firebase.firestore(), "users_data"),
      where("email", "==", email.trim())
    );
    const querySnapshot = await getDocs(user);
    var uid = null;
    var emailCheck = false;
    var passCheck = false;
    querySnapshot.forEach((doc) => {
      if (typeof doc.data() == "object") {
        emailCheck = true;
      }
    });

    if (!emailCheck) {
      Alert.alert(
        "Email não registado!",
        "Por favor, registe-se primeiro na aplicação."
      );
    } else {
      const pass = query(user, where("password", "==", password));
      const querySnapshot2 = await getDocs(pass);
      querySnapshot2.forEach((doc) => {
        if (typeof doc.data() == "object") {
          passCheck = true;
          console.log(doc.data().uid);
          uid = doc.data().uid;
        }
      });

      if (!passCheck) {
        Alert.alert(
          "Palavra passe incorreta!",
          "A palavra-passe não coincide com o email registado."
        );
      } else {
        // navigate.navigate("Painel", {idUser: uid})
        await SecureStore.setItemAsync("uid", uid);
        handleNavigate(uid);
      }
    }
  };

  const handleNavigate = (uid) => {
    //console.log(uid + "o uid tá aqui");
    let id = uid;
    navigation.navigate("TabRoutes");
    dispatch(logUser(id));
  };

  const loadingScreen = () => {
    return (
      <Image
        source={require("./../../imgs/img_loading_v2.gif")}
        style={{
          height: screenWidth / 3.4,
          width: screenWidth / 4,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
        <Text 
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Login!"
          style={styles.titleTextWhite}>Login</Text>
        <Text
          accessible={true}
          accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Estamos contentes por continuares a melhorar o teu local de trabalho."
          style={styles.normalTextWhite}>Estamos contentes por continuares a melhorar o teu local de trabalho.</Text>
        <View style={styles.imageLogo}>
          <Image
            accessible={true}
            accessibilityLabel="Imagem com três pessoas num fundo azul escuro. A primeira está virada para o lado direito e veste um casaco verde, a
            segunda está sentada à frente com um casaco laranja e também virada para o lado direito e a terceira está do lado direito, virada para o lado
            esquerdo e com um casaco vermelho." 
            style={{ width: 300, height: 200 }}
            source={require("./../../imgs/img_login.png")}
            />
        </View>

      <ScrollView style={styles.subContainer}>
        {loading == true ? (
          loadingScreen()
        ) : (
          <View>
            <ScrollView>
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor preta num fundo branco escrito E-mail." 
                style={styles.inputLabel}>E-mail</Text>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução do E-mail." 
                style={styles.inputField}
                onChangeText={(text) => setEmail(text.toLowerCase())}
              />
              <Text accessible={true}
                accessibilityLabel="Texto na cor preta num fundo branco escrito Palavra-passe." 
                style={styles.inputLabel}>Palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                accessible={true}
                accessibilityLabel="Campo para introdução da Palavra-passe." 
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable 
                accessible={true}
                accessibilityLabel="Texto na cor cinza num fundo branco escrito Esqueceu.se da palavra-passe?." 
                onPress={() => navigation.navigate("Password")}>
                <Text style={styles.forgotPasswordText}>Esqueceu-se da palavra-passe?</Text>
              </Pressable>
              <Pressable 
                accessible={true}
                accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o Login. Tem escrito na cor branca a palavra Entrar."
                onPress={() => submit()} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Entrar</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}

