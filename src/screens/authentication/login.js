import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Eye, EyeSlash } from "iconsax-react-native";

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

import { useFonts } from "expo-font";

//storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Variables
import * as CONST from "./../../styles/variables.js";

const apiURL = "https://sb-api.herokuapp.com/auth/login";

// STYLES -- CSS
import { styles } from "./../../styles/css.js";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  //const navigation = useNavigation();
  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (responseData && responseData.message === "Logged in successfully") {
      const userData = {
        userID: responseData.user._id,
        token: responseData.token,
        email: email.trim(),
        password: password,
        name: responseData.user.name,
        surname: responseData.user.surname,
        admin: responseData.user.admin,
        organization: responseData.user.organization,
        department: responseData.user.department,
        battery: responseData.user.battery,
        total_battery: responseData.user.total_battery,
        pause: responseData.user.pause,
        rewards: responseData.user.rewards,
        accessibility: responseData.user.accessibility,
        permissions: responseData.user.permissions,
        notifications: responseData.user.notifications,
        created: responseData.user.created,
        connected_in: responseData.user.connected_in,
        organization_name: responseData.userOrganization.name,
        full: responseData.userOrganization.battery_full,
        department_name: responseData.userDepartment.name,
        department_description: responseData.userDepartment.description,
      };

      dispatch(logUser(userData)); // dispatch the logUser action para Redux
      handleNavigate(responseData.user._id); // navega para outra pagina
    } else if (responseData && responseData.message) {
      Alert.alert("Login failed", responseData.message);
    }
  }, [responseData]);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);

        // Save user data to AsyncStorage
        const userData = {
          userID: data.user._id,
          token: data.token,
          email: email.trim(),
          password: password,
          name: data.user.name,
          surname: data.user.surname,
          admin: data.user.admin,
          organization: data.user.organization,
          department: data.user.department,
          battery: data.user.battery,
          total_battery: data.user.total_battery,
          pause: data.user.pause,
          rewards: data.user.rewards,
          accessibility: data.user.accessibility,
          permissions: data.user.permissions,
          notifications: data.user.notifications,
          created: data.user.created,
          connected_in: data.user.connected_in,
          organization_name: data.userOrganization.name,
          full: data.userOrganization.battery_full,
          department_name: data.userDepartment.name,
          department_description: data.userDepartment.description,
        };

        await AsyncStorage.setItem("userStorage", JSON.stringify(userData));
        console.log("User data saved to AsyncStorage");

        const storedData = await AsyncStorage.getItem("userStorage");
        console.log("Current async storage data:", storedData);

        const authStatus = "true";

        await AsyncStorage.setItem("authStatus", authStatus);
        console.log("AuthStatus saved to AsyncStorage");

        const strotedStatus = await AsyncStorage.getItem("authStatus");
        console.log("Current AuthStatus:", strotedStatus);

        dispatch(logUser(userData));
        handleNavigate(data.user._id);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      //Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (uid) => {
    navigation.navigate("TabRoutes", { screen: "TabRoutes" });
  };

  const loadingScreen = () => {
    return (
      <Image
        source={require("./../../imgs/white-gif-jun.gif")}
        style={{
          height: CONST.screenWidth / 4,
          width: CONST.screenWidth / 4,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: CONST.screenHeight / 5,
        }}
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <Text
        accessible={true}
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Login."
        style={styles.titleTextWhite}
      >
        Login
      </Text>
      <Text
        accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Estamos contentes por continuares a melhorar o teu local de trabalho."
        style={[
          styles.normalTextWhite,
          { paddingTop: CONST.boxPadding, paddingBottom: CONST.inputMargin },
        ]}
      >
        Estamos contentes por continuares a melhorar o teu local de trabalho.
      </Text>
      <View style={styles.imageLogo}>
        <Image
          style={{ width: 300, height: 200 }}
          source={require("./../../imgs/img_login.png")}
        />
      </View>

      {loading ? (
        loadingScreen()
      ) : (
        <ScrollView style={styles.subContainer}>
          <View>
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito E-mail."
              style={styles.inputLabel}
            >
              E-mail
            </Text>
            <TextInput
              accessible={true}
              accessibilityLabel="Campo para introdução do E-mail."
              style={styles.inputField}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              autoCapitalize="none"
            />
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Palavra-passe."
              style={styles.inputLabel}
            >
              Palavra-passe
            </Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução da palavra-passe."
                secureTextEntry={showPassword ? false : true}
                style={[styles.inputField, { width: "90%" }]}
                onChangeText={(text) => setPassword(text)}
              />
              {showPassword ? (
                <EyeSlash
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </View>
            <Pressable onPress={() => navigation.navigate("Password")}>
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor cinza num fundo branco escrito Esqueceu-se da palavra-passe?"
                style={styles.forgotPasswordText}
              >
                Esqueceu-se da palavra-passe?
              </Text>
            </Pressable>
            <Pressable
              accessible={true}
              accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o Login. Tem escrito na cor branca a palavra Entrar."
              onPress={() => handleLogin()}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
}
