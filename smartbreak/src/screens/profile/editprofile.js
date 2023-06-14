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

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function EditProfile({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [name, setName] = useState(userData.name);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [rewards, setRewards] = useState(userData.rewards);
  const userID = userData.userID;
  const token = userData.token;
  console.log(token);

  async function updateUserProfile(updatedProfileData) {
    try {
      const apiURLUser = "https://sb-api.herokuapp.com/users/" + userID; // Replace with your API endpoint
      console.log(apiURLUser);
      const response = await fetch(apiURLUser, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedProfileData),
      });

      console.log(JSON.stringify(response));

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
    try {
      const updatedProfileData = {
        name: name,
        lastName: lastName,
        email: email,
        rewards: rewards,
      };

      // chamar a funçao da api para atualizar o perfil
      const response = await updateUserProfile(updatedProfileData);

      // atualizar o redux com os dados do perfil novos
      dispatch({ type: "UPDATE_USER_PROFILE", payload: response });

      Alert.alert("Success", "Profile updated successfully");
      navigation.navigate("ProfilePage");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.containerLight]}
      >
        <View style={styles.profileInfo}>
          <Image
            accessible={true}
            accessibilityLabel="Foto de perfil."
            source={require("../../imgs/ester.png")}
            style={styles.profileImage}
          />
        </View>

        <View>
          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Nome."
            style={styles.inputLabel}
          >
            Nome
          </Text>
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
            style={styles.inputLabel}
          >
            Sobrenome
          </Text>
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
            style={styles.inputLabel}
          >
            Email
          </Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Campo para introdução do E-mail."
            style={styles.inputField}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Recompensas."
            style={styles.inputLabel}
          >
            Recompensas
          </Text>
          <Switch
            accessible={true}
            accessibilityLabel="Interruptor para ativar ou desativar as Recompensas."
            value={rewards}
            onValueChange={(value) => setRewards(value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão para salvar as alterações no perfil do usuário."
            style={[styles.primaryButton, styles.button]}
            onPress={handleProfileUpdate}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
