import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";
import { collection, where, query, getDocs } from "firebase/firestore";

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

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

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
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.groupContainer}>
        <Text style={styles.textMessageTitle}>
          <Text style={{ fontFamily: "GothamMedium" }}>Login</Text>
        </Text>
        <Text style={styles.textMessageBody}>
          Estamos contentes por continuares a melhorar o teu local de trabalho.
        </Text>
        <View style={styles.imageLogo}>
          <Image source={require("./../../imgs/img_login.png")} />
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={screenHeight}
        style={styles.subContainer}
      >
        {loading == true ? (
          loadingScreen()
        ) : (
          <View>
            <ScrollView>
              <Text>Email</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setEmail(text)}
              />
              <Text>Palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                onChangeText={(text) => setPassword(text)}
              />
              <Text style={styles.extra}>Esqueceu-se da palavra-passe?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => submit()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 65,
    //height: screenHeight/2,
  },
  registerPhoto: {
    height: screenWidth / 5,
    width: screenWidth / 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: screenWidth / 10,
    flex: 1 / 2,
  },
  extra: {
    color: "#888",
    fontSize: 12,
    textAlign: "right",
    marginBottom: 40,
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
    marginTop: 10,
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
    lineHeight: 24,
  },
  imageLogo: {
    alignItems: "center",
    paddingTop: 28,
  },
});
