import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Eye, EyeSlash } from "iconsax-react-native";


// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

// Font Gotham
import { useFonts } from "expo-font";

import { useDispatch } from "react-redux";


export default function EditPassword({ navigation }) {

  const dispatch = useDispatch();

  // ---- userData information
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]

  const uid = userData.userID;
  const password = userData.password;

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [passwordStored, setPasswordStored] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    
  }, [])


  const validate_password = (pass) => {
    if (pass.length < 8) {
      Alert.alert("Erro!", "A palavra-passe deve ter no mínimo 8 caracteres.");
      return false;
    }
    return true;
  };

  const validate = () => {
    if (newPassword != confirmPassword) {
      Alert.alert(
        "Erro!",
        "Digite corretamente a confirmação da palavra-passe."
      );
      return false;
    } else if (password == newPassword) {
      Alert.alert("Erro!", "As palavras-passe não podem ser iguais.");
      return false;
    } else {
      return validate_password(newPassword);
    }
  };

  const changePassword = () => {
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: async () => {
          if (validate()) {
            try {
              const response = await fetch("https://sb-api.herokuapp.com/auth/password", {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + userData.token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  password : passwordStored,
                  new_password : newPassword
                }),
              });
              if (response.ok) {
                // ! DANIEL ATUALIZA O REDUX AQUI PFV
                Alert.alert("Sucesso!", "Palavra-passe alterada com sucesso.");
                navigation.navigate("ProfileSettings");
              } else {
                const errorData = await response.json();
                Alert.alert("Erro!", errorData.message);
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
            }
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[dark_mode ? dark_styles.containerLight : styles.containerLight, {paddingTop: CONST.backgroundPaddingTop/2}]}
    >
      <ScrollView>
        <StatusBar style={dark_mode ? "light" : "dark" } />
        <Text 
          accessible={true}
          accessibilityLabel="Textoescrito Alterar Palavra-passe. É o título da página."
          style={dark_mode ? dark_styles.titleText : styles.titleText}>Alterar palavra-passe{"\n"}</Text>
        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Palavra-passe atual."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}>{"\n"}Palavra-passe atual</Text>
          
          <View style={{ flexDirection: "row", width: "100%" }}>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução da palavra-passe."
                secureTextEntry={showPassword ? false : true}
                style={[dark_mode ? dark_styles.inputField : styles.inputField, { width: "90%" }]}
                onChangeText={(text) => setPasswordStored(text)}
              />
              {showPassword ? (
                <EyeSlash
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? CONST.whiteText : CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? CONST.whiteText : CONST.darkerColor}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </View>  

        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Nova palavra-passe."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}>{"\n"}Nova palavra-passe</Text>
        <View style={{ flexDirection: "row", width: "100%" }}>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução da nova palavra-passe."
                secureTextEntry={showNewPassword ? false : true}
                style={[dark_mode ? dark_styles.inputField : styles.inputField, { width: "90%" }]}
                onChangeText={(text) => setNewPassword(text)}
              />
              {showNewPassword ? (
                <EyeSlash
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? dark_styles.whiteText : CONST.darkerColor}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              ) : (
                <Eye
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? CONST.whiteText : CONST.darkerColor}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              )}
            </View>  

        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Confirmar nova palavra-passe."
          style={dark_mode ? dark_styles.inputLabel : styles.inputLabel}>{"\n"}Confirmar nova palavra-passe</Text>
        <View style={{ flexDirection: "row", width: "100%" }}>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução da confirmação da nova palavra-passe."
                secureTextEntry={showConfirmPassword ? false : true}
                style={[dark_mode ? dark_styles.inputField : styles.inputField, { width: "90%" }]}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              {showConfirmPassword ? (
                <EyeSlash
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? CONST.whiteText : CONST.darkerColor}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <Eye
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  size={CONST.pageSubtitleSize}
                  color={dark_mode ? CONST.whiteText : CONST.darkerColor}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </View>  

        <View>
          <Pressable 
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de guardar as alterações. Tem escrito na cor branca a palavra Concluído."
            onPress={() => changePassword()} style={[dark_mode ? dark_styles.primaryButton : styles.primaryButton, {marginTop: CONST.backgroundPaddingLateral}]}>
            <Text style={dark_mode ? dark_styles.primaryButtonText : styles.primaryButtonText}>
              Concluído
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
} 