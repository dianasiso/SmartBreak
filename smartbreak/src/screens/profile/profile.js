import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Edit2,
  Category,
  Calendar,
  Clock,
  MedalStar,
  Setting2,
} from "iconsax-react-native";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

export default function ProfilePage() {
  const userData = useSelector((state) => state.user.userID);
  useEffect(() => {}, [userData]);

  //const { idUser } = route.params.idUser;
  //console.log(route);
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [name, setName] = useState();
  const [organization, setOrganization] = useState();
  const uid = userData; // Posteriormente pegar da navegation

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  const navigation = useNavigation();

  // Get data from firestore

  firebase
    .firestore()
    .collection("users_data")
    .doc(uid)
    .get()
    .then((doc) => {
      let getName = doc.data().name;
      let getLastName = doc.data().lastName;
      let getOrganization = doc.data().organization;
      setName(getName + " " + getLastName);
      setOrganization(getOrganization);
    });

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../imgs/ester.png")}
            style={styles.profilepicture}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.organization}>{organization}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("EditProfile")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <Edit2 color="#000000" /> Editar perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <Category color="#000000" /> Os meus equipamentos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <Calendar color="#000000" /> As minhas rotinas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <Clock color="#000000" /> Histórico de pausas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("ProfileRewards")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <MedalStar color="#000000" /> As minhas recompensas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.options}
          onPress={() => navigation.navigate("ProfileSettings")}
          underlayColor={"transparent"}
        >
          <Text style={styles.text}>
            <Setting2 color="#000000" /> Definições
          </Text>
        </TouchableOpacity>
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

  profilepicture: {
    backgroundColor: "#F5F5F5",
    height: 170,
    width: 170,
    borderRadius: 100,
    marginTop: 65,
  },

  name: {
    marginTop: 30,
    marginBottom: 0,
    fontFamily: "GothamMedium",
    fontSize: 24,
    textTransform: "capitalize",
  },

  organization: {
    marginTop: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },

  options: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,
    //width: screenWidth - 50,
    flexDirection: "row",
    alignItems: "center",
    //textAlign: 'left',
    backgroundColor: "#E3ECF7",
    justifyContent: "space-between",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
});
