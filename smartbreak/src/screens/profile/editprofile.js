import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Font Gotham
import { useFonts } from "expo-font";


// Firebase
import firebase from "./../../config/firebase.js"


export default function EditProfile({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require('./../../fonts/GothamMedium.ttf'),
    GothamBook: require('./../../fonts/GothamBook.ttf'),
  });


  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [organization, setOrganization] = useState();
  const [rewards, setRewards] = useState()
  const uid = 'Y8f9M4o03ceZrFjoWu6iOA8rm2F2'; // Posteriormente pegar da navegation

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  // Get data from firestore
  firebase.firestore()
  .collection("users_data")
  .doc(uid)
  .get()
  .then((doc) => {
      setName(doc.data().name);
      setLastName(doc.data().lastName);
      setEmail(doc.data().email);
      setOrganization(doc.data().organization);
      setRewards(doc.data().rewards);
      })

  const editarperfil = () => {
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("ProfilePage"),
      },
    ]);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../imgs/ester.png")}
            style={styles.profilepicture}
          />
          <View style={styles.edit}>
            <Text style={styles.text}>Nome</Text>
            <TextInput placeholderTextColor="#000" placeholder={name} style={styles.input} />
            <Text style={styles.text}>Apelido</Text>
            <TextInput placeholderTextColor="#000" placeholder={lastName} style={styles.input} />
            <Text style={styles.text}>Email</Text>
            <TextInput placeholderTextColor="#000" placeholder={email} style={styles.input}/>
            <Text style={styles.text}>Empresa</Text>
            <TextInput placeholderTextColor="#999" placeholder={organization} style={styles.input} editable={false}/>
            <View style={styles.rewards}>
              <Text
                style={{
                  fontFamily: "GothamBook",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Tornar as recompensas públicas
              </Text>
              <Switch
                trackColor={{ false: "#BBBABA", true: "#0051BA" }}
                onValueChange={true}
              />
            </View>
          </View>
          <View style={styles.options}>
            <TouchableHighlight
              onPress={editarperfil}
              underlayColor={"transparent"}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontFamily: "GothamBook",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Concluído
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
  },

  profilepicture: {
    backgroundColor: "#F5F5F5",
    //mudar os tamanhos para percentagens para funcionar bem em todos os ecrãs
    height: 110,
    width: 110,
    borderRadius: 100,
    marginTop: 40,
  },

  edit: {
    marginTop: 30,
    width: "100%",
  },

  input: {
    marginTop: 0,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 5,
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
  },

  rewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },

  options: {
    marginTop: 40,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0051BA",
  },

  text: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    marginTop: 30,
    lineHeight: 24,
  },
});
