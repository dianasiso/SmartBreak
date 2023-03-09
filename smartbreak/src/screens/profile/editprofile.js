import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function EditProfile({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [organization, setOrganization] = useState();
  const [rewards, setRewards] = useState();
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users_data")
      .doc(uid)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setLastName(doc.data().lastName);
        setEmail(doc.data().email);
        setOrganization(doc.data().organization);
        setRewards(doc.data().rewards);
      });
  }, []);

  const validate_email = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  const editarperfil = () => {
    let updatedUserData = {};
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          if (validate_email) {
            firebase.firestore().collection("users_data").doc(uid).update({
              name: name,
              lastName: lastName,
              email: email,
              rewards: rewards,
            });
            navigation.navigate("ProfilePage", {
              updatedUserData: { name, lastName, email, rewards },
            });
          } else {
            Alert.alert(
              "Email inválido!",
              "Preencha corretamente o campo E-mail."
            );
          }
        },
      },
    ]);
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleSwitch = () => {
    setRewards(!rewards);
  };

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <StatusBar style="auto" />
      <ScrollView
        sstyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        <View style={styles.profileInfo}>
          <Image
            source={require("../../imgs/ester.png")}
            style={styles.profileImage}
          />
        </View>

        <View>
          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Nome."
            style={styles.inputLabel}>Nome</Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Campo para introdução do Nome."
            style={styles.inputField}
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Sobrenome."
            style={styles.inputLabel}>Sobrenome</Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Campo para introdução do Sobrenome."
            style={styles.inputField}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />

          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito E-mail."
            style={styles.inputLabel}>Email</Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Campo para introdução do E-mail."
            style={styles.inputField}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            value={email}
          />

          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Empresa."
            style={styles.inputLabel}>Empresa</Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Campo para introdução do E-mail."
            style={styles.inputField}
            placeholder={organization}
            editable={false}
          />

          <View style={styles.editprofileRewards} >
            <Text style={styles.normalText}>
              Tornar as recompensas públicas
            </Text>
            <Switch
              trackColor={{ false: "#BBBABA", true: "#0051BA" }}
              thumbColor={rewards ? "#E3ECF7" : "#0051ba"}
              value={rewards}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>
        <View>
          <Pressable onPress={() => editarperfil()} style={styles.button}>
            <Text
              style={{
                color: "#FFFFFF",
                fontFamily: "GothamBook",
                fontSize: 16,
                lineHeight: 24,
                textAlign: "center",
              }}
            >
              {" "}
              Concluído{" "}
            </Text>
          </Pressable>
        </View>
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
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 16,
  },

  rewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },

  button: {
    alignSelf: "stretch",
    marginTop: 40,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: "#0051BA",
    width: screenWidth - 50,
  },

  text: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    marginTop: 40,
    lineHeight: 24,
  },
});
*/