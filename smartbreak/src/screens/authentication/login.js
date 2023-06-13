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

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

// Variables
import * as CONST from "./../../styles/variables.js";

const apiURL = "https://sb-api.herokuapp.com/auth/login";

// STYLES -- CSS
import { styles } from "./../../styles/css.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (responseData && responseData.message === "Logged in successfully") {
      const userData = {
        userID: responseData.user._id,
        token: responseData.token,
        email: email,
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
      };

      dispatch(logUser(userData)); // dispatch the logUser action para Redux

      Alert.alert("Login successful");
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
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleNavigate = (uid) => {
    navigation.navigate("TabRoutes");
  };

  const loadingScreen = () => {
    return (
      <Image
        source={require("./../../imgs/img_loading_v2.gif")}
        style={{
          height: CONST.screenWidth / 3.4,
          width: CONST.screenWidth / 4,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.titleTextWhite}>Login</Text>
      <Text style={styles.normalTextWhite}>
        Estamos contentes por continuares a melhorar o teu local de trabalho.
      </Text>
      <View style={styles.imageLogo}>
        <Image
          style={{ width: 300, height: 200 }}
          source={require("./../../imgs/img_login.png")}
        />
      </View>

      <ScrollView style={styles.subContainer}>
        {loading ? (
          loadingScreen()
        ) : (
          <View>
            <ScrollView>
              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                autoCapitalize="none"
              />
              <Text style={styles.inputLabel}>Palavra-passe</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.inputField}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable onPress={() => navigation.navigate("Password")}>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu-se da palavra-passe?
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleLogin()}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Entrar</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}
