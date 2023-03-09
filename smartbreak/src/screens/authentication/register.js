import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Password meter
import PassMeter from "react-native-passmeter";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

// Variables
import * as CONST from "./../../styles/variables.js";

// CSS
import { styles } from "./../../styles/css.js";


// ---------- CODE ----------


export default function Register() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // select items
  const [open, setOpen] = useState(false);
  const [valueOrg, setValueOrg] = useState("");
  const [items, setItems] = useState([
    { label: "Universidade de Aveiro", value: "Universidade de Aveiro" },
    { label: "Universidade de Coimbra", value: "Universidade de Coimbra" },
  ]);

  // fields
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    true,
    false,
    false,
    false,
  ]);

  // Firebase store data
  const firestoreUserData = firebase.firestore().collection("users_data");
  const firestoreUserDevices = firebase.firestore().collection("users_devices");
  const firestoreUserRoutines = firebase
    .firestore()
    .collection("users_routines");

  // Firebase authentication
  const auth = getAuth();
  const registerFirebase = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        firestoreUserData.doc(userCredential.user.uid).set({
          name: name,
          lastName: lastName,
          email: email.trim().toLowerCase(),
          password: password.trim(),
          organization: valueOrg,
          uid: userCredential.user.uid,
          rewards: false,
          notifications: notifications,
          shareData: true,
          pause: false,
          battery: 0,
          teams: [],
          admin: false,
        });
        firestoreUserRoutines.doc(userCredential.user.uid).set({
          routines: [],
        });
        firestoreUserDevices.doc(userCredential.user.uid).set({
          devices: [],
        });

        dispatch(logUser(userCredential.user.uid));
        Alert.alert("Sucesso", "Utilizador registado com sucesso.");
        // navigate.navigate("Painel", {idUser: userCredential.user.uid})
      })
      .catch((error) => {
        Alert.alert("Erro", "O e-mail já está em uso.");
        setLoading(false);
      });
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


  const validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const validate_password = (pass, pass2) => {
    if (pass != pass2) {
      alert("As palavras-passe não coincidem.");
      return false;
    }
    if (pass.length < 8) {
      alert("A palavra-passe deve ter no mínimo 8 caracteres.");
      return false;
    }
    return true;
  };

  const submit = () => {
    setLoading(true);

    if (email.length == 0 || validate_email(email.trim()) == false) {
      Alert.alert("Preencha corretamente o campo E-mail");
      setLoading(false);
      return false;
    }
    if (name.length == 0) {
      Alert.alert("Preencha corretamente o campo Nome");
      setLoading(false);
      return false;
    }
    if (lastName.length == 0) {
      Alert.alert("Preencha corretamente o campo Apelido");
      setLoading(false);
      return false;
    }
    if (valueOrg == null) {
      Alert.alert("Preencha corretamente o campo Empresa");
      setLoading(false);
      return false;
    }
    if (password.length == 0) {
      Alert.alert("Preencha corretamente o campo Palavra-passe");
      setLoading(false);
      return false;
    }
    if (confirmPassword.length == 0) {
      Alert.alert("Preencha corretamente o campo Confirmar palavra-passe");
      setLoading(false);
      return false;
    }
    if (!validate_password(password, confirmPassword)) {
      setLoading(false);
      return false;
    }
    registerFirebase();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <ScrollView >
      <Text 
        accessible={true}
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Regista-te."
        style={styles.titleTextWhite}>Regista-te</Text> 
      <Text 
        accessible={true}
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito  Estamos contentes por teres tomado esta iniciativa. Vem fazer energy breaks."
        style={styles.normalTextWhite}>Estamos contentes por teres tomado esta iniciativa. Vem fazer energy breaks.</Text>
      </ScrollView>

      {loading == true ? (
        loadingScreen()
        ) : (
        <View style={styles.subContainer}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{paddingBottom: CONST.cardPadding}}>
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Nome." 
              style={styles.inputLabel}>Nome</Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do Nome." 
              style={styles.inputField}
              onChangeText={(text) => setName(text)}/>
          
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Sobrenome." 
              style={styles.inputLabel}>Sobrenome</Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do Sobrenome." 
              style={styles.inputField}
              onChangeText={(text) => setLastName(text)}/>

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito E-mail." 
              style={styles.inputLabel}>E-mail</Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do E-mail." 
              style={styles.inputField}
              onChangeText={(text) => setEmail(text.toLowerCase())}/>

            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Empresa." 
              style={styles.inputLabel}>Empresa</Text>

            {/* TODO: ADD ACESSIBILIDADE NO DROPDOWNPICKER */}
            <DropDownPicker
              autoScroll={true}
              open={open}
              value={valueOrg}
              items={items}
              setOpen={setOpen}
              setValue={setValueOrg}
              setItems={setItems}
              style={styles.inputField}
              placeholder="" 
              multiple={false}
              showTickIcon={false}
              closeAfterSelecting={true}
              onChangeText={(text) => setOrganization(text)}/>

            <Text accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Palavra-passe." 
              style={styles.inputLabel}>Palavra-passe</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.inputField}
              accessible={true}
              accessibilityLabel="Campo para introdução da Palavra-passe." 
              onChangeText={(text) => setPassword(text)}/>
            <View style={styles.passwordProgressBar}>
              <PassMeter
                showLabels={false}
                password={password}
                maxLength={15}
                minLength={8}
                labels={[]}/> 
            </View>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Confirmar nova palavra-passe." 
              style={styles.inputLabel}>Confirmar nova palavra-passe</Text> 
            <TextInput  
              accessible={true}
              accessibilityLabel="Campo para introdução da Confirmação da nova palavra-passe." 
              secureTextEntry={true} 
              style={styles.inputField} 
              onChangeText={(text) => setConfirmPassword(text)}/>   
          </ScrollView>

          <Pressable 
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o Login. Tem escrito na cor branca a palavra Entrar."
            onPress={() => submit()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Registar</Text>
          </Pressable>

        </View>
      )}
    </SafeAreaProvider>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0051BA",
//     flexDirection: "column",
//   },
//   groupContainer: {
//     paddingLeft: 25,
//     paddingRight: 25,
//   },
//   subContainer: {
//     flexDirection: "column",
//     backgroundColor: "#FFF",
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     borderTopRightRadius: 50,
//     borderTopLeftRadius: 50,
//     paddingLeft: 25,
//     paddingRight: 25,
//     paddingTop: 40,
//     height: (4 * screenHeight) / 5,
//   },
//   registerPhoto: {
//     height: screenWidth / 5,
//     width: screenWidth / 5,
//     marginLeft: "auto",
//     marginRight: "auto",
//     borderRadius: screenWidth / 10,
//     flex: 1 / 2,
//   },
//   inputField: {
//     borderBottomColor: "#000000",
//     borderBottomWidth: 1,
//     marginBottom: 40,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderRadius: 0,
//   },
//   inputFieldPass: {
//     borderBottomColor: "#000000",
//     borderBottomWidth: 1,
//     marginBottom: 10,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderRadius: 0,
//   },
//   buttonText: {
//     fontFamily: "GothamBook",
//     color: "#FFF",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#0051BA",
//     justifyContent: "center",
//     height: 48,
//     borderRadius: 15,
//     marginBottom: 40,
//     marginTop: 20,
//   },
//   textMessageTitle: {
//     fontSize: 24,
//     textAlign: "left",
//     paddingTop: 40,
//     fontFamily: "GothamBook",
//     color: "#FFFFFF",
//   },
//   textMessageBody: {
//     fontSize: 16,
//     lineHeight: 24,
//     textAlign: "left",
//     paddingTop: 15,
//     fontFamily: "GothamBook",
//     color: "#FFFFFF",
//   },
// });
