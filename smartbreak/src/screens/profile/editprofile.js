import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";
import { dark_styles } from "../../styles/darkcss.js";

export default function EditProfile({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const dark_mode = userData.accessibility[1];

  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [email, setEmail] = useState(userData.email);
  const [rewards, setRewards] = useState(userData.permissions[0]);
  const userID = userData.userID;
  const token = userData.token;

  //API
  async function updateUserProfile(updatedProfileData) {
    try {
      const apiURLUser = "https://sb-api.herokuapp.com/users/" + userID;
      //console.log(apiURLUser);
      const response = await fetch(apiURLUser, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedProfileData),
      });

      //console.log(JSON.stringify(response));

      if (response.ok) {
        const data = await response.json();
        return data; // retorna os dados do perfil atualizado
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      throw new Error("Failed to update profile" + error); // dá erro se nao conseguir atualizar o perfil
    }
  }

  const handleProfileUpdate = async () => {
    const updatedProfileData = {};
    try {
      if (name !== userData.name) {
        updatedProfileData.name = name;
      }
      if (surname !== userData.surname) {
        updatedProfileData.surname = surname;
      }
      if (email !== userData.email) {
        updatedProfileData.email = email;
      }
      if (rewards !== userData.permissions[0]) {
        updatedProfileData.permissions = [rewards, userData.permissions[1]];
      }

      if (Object.keys(updatedProfileData).length === 0) {
        Alert.alert("Erro!", "Nenhuma alteração foi feita.");
        return;
      }

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        Alert.alert("Erro!", "O formato do e-mail introduzido não é válido.");
        return;
      }

      const response = await updateUserProfile(updatedProfileData);
      //guardar no redux
      console.log("A RESPOSTA ATUAL É:", response);
      dispatch(updateUserData(response));

      Alert.alert("Sucesso", "Alterações efetuadas com sucesso!");
      navigation.navigate("ProfilePage");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <SafeAreaProvider
      style={[
        dark_mode ? dark_styles.containerLight : styles.containerLight,
        { paddingTop: CONST.backgroundPaddingTop / 2 },
      ]}
    >
      <StatusBar style={dark_mode ? "light" : "dark"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Editar Perfil. É o título da página."
          style={dark_mode ? dark_styles.titleText : styles.titleText}
        >
          Editar perfil{"\n"}
        </Text>
        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Nome."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}
        >
          {"\n"}Nome
        </Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução do Nome."
          style={dark_mode ? dark_styles.inputField : styles.inputField}
          onChangeText={(text) => setName(text.trim())}
          value={name}
        />

        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Sobrenome."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}
        >
          {"\n"}Sobrenome
        </Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução do Sobrenome."
          style={dark_mode ? dark_styles.inputField : styles.inputField}
          onChangeText={(text) => setSurname(text.trim())}
          value={surname}
        />

        <Text
          accessible={true}
          accessibilityLabel="Texto escrito E-mail."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}
        >
          {"\n"}E-mail
        </Text>
        <TextInput
          accessible={true}
          accessibilityLabel="Campo para introdução do E-mail."
          style={[
            dark_mode ? dark_styles.inputField : styles.inputField,
            { marginBottom: CONST.backgroundPaddingTop },
          ]}
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
        />

        <View style={styles.editprofileRewards}>
          <Text
            accessible={true}
            accessibilityLabel="Texto Tornar as recompensas públicas. Possui um switch à frente para ativar ou desativar a opção."
            style={dark_mode ? dark_styles.normalText : styles.normalText}
          >
            Tornar as recompensas públicas
          </Text>
          <Switch
            accessible={true}
            accessibilityLabel={rewards ? "Ativado" : "Desativado"}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              rewards
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={rewards}
            onValueChange={(value) => setRewards(value)}
          />
        </View>

        <View>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão para salvar as alterações no perfil do utilizador."
            onPress={handleProfileUpdate}
            style={[
              dark_mode ? dark_styles.primaryButton : styles.primaryButton,
              { marginTop: CONST.backgroundPaddingLateral },
            ]}
          >
            <Text
              style={
                dark_mode
                  ? dark_styles.primaryButtonText
                  : styles.primaryButtonText
              }
            >
              Guardar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
