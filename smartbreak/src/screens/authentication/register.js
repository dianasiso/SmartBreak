import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// ImagePicker
import * as ImagePicker from "expo-image-picker";

// Password meter
import PassMeter from "react-native-passmeter";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  // select items
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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

  // Firebase store data
  const firestore = firebase.firestore().collection("users_data");

  // Firebase authentication
  const auth = getAuth();
  const registerFirebase = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        firestore.doc(userCredential.user.uid).set({
          name: name,
          lastName: lastName,
          email: email.trim(),
          password: password.trim(),
          organization: value,
          uid: userCredential.user.uid,
          rewards: false,
        });
        Alert.alert("Sucesso", "Utilizador registado com sucesso.");
        // navigate.navigate("Painel", {idUser: userCredential.user.uid})
      })
      .catch((error) => {
        Alert.alert("Erro", "O e-mail já está em uso.");
        setLoading(false);
      });
  };

  // photo
  const [photo, setPhoto] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(permission.status === "granted");
    })();
  }, []);

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

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

  const loadPhoto = async () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    Alert.alert((await result).assets);
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  if (galleryPermission === false) {
    Alert.alert("Sem permissões da galeria");
  }

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

    if (email.length == 0 || validate_email(email) == false) {
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
    if (value == null) {
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
    navigation.navigate("TabRoutes");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.groupContainer}>
        <Text style={styles.textMessageTitle}>
          <Text style={{ fontFamily: "GothamMedium" }}>Regista-te</Text>
        </Text>
        <Text style={styles.textMessageBody}>
          Estamos contentes por teres tomado esta iniciativa. Vem fazer energy
          breaks.
        </Text>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.subContainer}
      >
        {loading == true ? (
          loadingScreen()
        ) : (
          <View>
            <ScrollView>
              <TouchableOpacity
                onPress={() => loadPhoto()}
                style={{ paddingBottom: 30 }}
              >
                <Image
                  style={styles.registerPhoto}
                  source={
                    photo !== null
                      ? photo
                      : require("./../../imgs/img_register_photo_default.png")
                  }
                />
              </TouchableOpacity>
              <Text>Nome</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setName(text)}
              />
              <Text>Apelido</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setLastName(text)}
              />
              <Text>Email</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setEmail(text)}
              />
              <Text>Empresa</Text>
              <DropDownPicker
                style={styles.inputField}
                onChangeText={(text) => setOrganization(text)}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              <Text>Palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputFieldPass}
                onChangeText={(text) => setPassword(text)}
              />
              <View
                style={{
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: 8,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <PassMeter
                  showLabels={false}
                  password={password}
                  maxLength={15}
                  minLength={8}
                  labels={[]}
                />
              </View>
              <Text style={{ marginTop: 40 }}>Confirmar palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => submit()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Registar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: "#0051BA",
    flexDirection: "column",
  },
  groupContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  subContainer: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 40,
    height: (4 * screenHeight) / 5,
  },
  registerPhoto: {
    height: screenWidth / 5,
    width: screenWidth / 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: screenWidth / 10,
    flex: 1 / 2,
  },
  inputField: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  inputFieldPass: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
  buttonText: {
    fontFamily: "GothamBook",
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0051BA",
    justifyContent: "center",
    height: 48,
    borderRadius: 15,
    marginBottom: 40,
    marginTop: 20,
  },
  textMessageTitle: {
    fontSize: 24,
    textAlign: "left",
    paddingTop: 40,
    fontFamily: "GothamBook",
    color: "#FFFFFF",
  },
  textMessageBody: {
    fontSize: 16,
    textAlign: "left",
    paddingTop: 15,
    fontFamily: "GothamBook",
    color: "#FFFFFF",
  },
});
