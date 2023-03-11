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
      style={styles.mainContainerLight}
    >
      <StatusBar style="dark" />
      <ScrollView
        style={[styles.containerLight, {paddingTop: 0}]}
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
            style={[styles.inputField, {opacity:0.5, marginBottom: 20}]}
            placeholder={organization}
            placeholderTextColor={CONST.darkerColor}
            editable={false}
          />

          <View style={styles.editProfileRewards} >
            <Text style={styles.normalText}>
              Tornar as recompensas públicas
            </Text>
            <Switch
              trackColor={{ false: CONST.switchOffColor, true: CONST.switchOnColor }}
              thumbColor={rewards ? CONST.switchIndicatorColor : CONST.mainBlue}
              value={rewards}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>
        <View>
          <Pressable onPress={() => editarperfil()} style={styles.primaryButton}>
            <Text
              style={styles.primaryButtonText}
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