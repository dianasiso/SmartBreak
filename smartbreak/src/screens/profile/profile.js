import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
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

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

export default function ProfilePage({ navigation, route }) {
  const userData = useSelector((state) => state.user.userID);
  useEffect(() => {
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
  }, [route.params?.updatedUserData, userData]);

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState();
  const [organization, setOrganization] = useState();
  const uid = userData;
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", overflow: "scroll" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.organization}>{organization}</Text>
        </View>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Edit2 color="#000000" />
          <Text style={styles.text}> Editar perfil</Text>
        </Pressable>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("MyDevices")}
        >
          <Category color="#000000" />
          <Text style={styles.text}> Os meus equipamentos</Text>
        </Pressable>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("MyRoutines")}
        >
          <Calendar color="#000000" />
          <Text style={styles.text}> As minhas rotinas</Text>
        </Pressable>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("historicoPausas")}
        >
          <Clock color="#000000" />
          <Text style={styles.text}> Histórico de pausas</Text>
        </Pressable>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("ProfileRewards")}
        >
          <MedalStar color="#000000" />
          <Text style={styles.text}> As minhas recompensas</Text>
        </Pressable>

        <Pressable
          style={styles.options}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Setting2 color="#000000" />
          <Text style={styles.text}> Definições</Text>
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
    paddingTop: 100,
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
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
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
    textAlign: "left",
    backgroundColor: "#E3ECF7",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
});
