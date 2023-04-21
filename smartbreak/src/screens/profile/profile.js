import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
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

// CSS
import { styles } from "./../../styles/css.js";
//import { Config } from "react-native-config";
//Config();

//import dotenv from "dotenv";
//dotenv.config();

//import { API_KEY, API_URL } from "react-native-dotenv"; // import API_KEY from .env file

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export default function ProfilePage({ navigation, route }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        "api-key": API_KEY, // use API_KEY from .env file
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <SafeAreaProvider style={styles.mainContainerLight}>
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerLight}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileInfo}>
          <Image
            style={styles.profileImage}
            source={require("../../imgs/img_register_photo_default.png")}
          />
          <Text style={styles.profileName}>{name}</Text>
          <Text style={[styles.profileOrganization, { opacity: 0.5 }]}>
            {organization}
          </Text>
        </View>

        <Pressable
          style={styles.boxOptions}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Edit2 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Editar perfil</Text>
        </Pressable>
        <Pressable
          style={styles.boxOptions}
          onPress={() => navigation.navigate("MyDevices")}
        >
          <Category variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Os meus equipamentos</Text>
        </Pressable>

        <Pressable
          style={styles.boxOptions}
          onPress={() => navigation.navigate("MyRoutines")}
        >
          <Calendar variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> As minhas rotinas</Text>
        </Pressable>
        <Pressable
          style={styles.boxOptions}
          onPress={() => navigation.navigate("historicoPausas")}
        >
          <Clock variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Histórico de pausas</Text>
        </Pressable>
        <Pressable
          style={styles.boxOptions}
          onPress={() => navigation.navigate("ProfileRewards")}
        >
          <MedalStar variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> As minhas recompensas</Text>
        </Pressable>
        <Pressable
          style={[styles.boxOptions, { borderBottomWidth: 0 }]}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Setting2 variant="Bold" style={styles.boxIcon} />
          <Text style={styles.normalText}> Definições</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}
