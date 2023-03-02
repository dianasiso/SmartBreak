import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Font Gotham
import { useFonts } from "expo-font";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function Welcome() {
  const navigation = useNavigation();
  // Loading Gotham font

  const [loaded] = useFonts({
    GothamMedium: require("./../../fonts/GothamMedium.ttf"),
    GothamBook: require("./../../fonts/GothamBook.ttf"),
  });


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.imageLogo}>
          <Image
            accessible={true}
            accessibilityLabel="Imagem na cor branca num fundo azul escuro. É o logótipo da marca. Uma bateria semi preenchida com um caule à volta, terminando numa folha."
            style={{ width: 180, height: 180 }}
            source={require("./../../imgs/smartbreak_logotipo_white.png")}
          />
        </View>
        <Text
           accessible={true}
           accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Smart Break."
          style={styles.logoText}>Smart Break</Text>
      </ScrollView>

      <ScrollView style={styles.containerWelcome}>
        <View>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Bem-vindo!"
            style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Faz pausas no trabalho, desliga os teus equipamentos, e contribui para
            a redução do desperdício energético. Aumenta a tua produtividade e eficiência energética!"
            style={styles.welcomeText}>
            Faz pausas no trabalho, desliga os teus equipamentos, e contribui para
            a redução do desperdício energético. Aumenta a tua produtividade e eficiência energética!
          </Text>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o Login. Tem escrito na cor branca a palavra Entrar."
            onPress={() => navigation.navigate("Login")}
            style={styles.loginButtonBackground}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão branco com borda da cor laranja num fundo branco com o objetivo de efetuar o Registo. Tem escrito na cor laranja a palavra Registar"
            onPress={() => navigation.navigate("Onboarding")}
            style={styles.registerButtonBackground}>
            <Text style={styles.registerButtonText}>Registar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: CONST.mainBlue,
  },
  containerWelcome: {
    backgroundColor: CONST.lightBackgroundColor,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: CONST.screenWidth,
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: CONST.largeCardRadius,
    borderTopLeftRadius: CONST.largeCardRadius,
    paddingLeft: CONST.cardPadding,
    paddingRight: CONST.cardPadding,
    paddingBottom: CONST.cardPadding + 10,
    paddingTop: CONST.cardPadding + 10,
  },
  imageLogo: {
    alignItems: "center",
    marginTop: 50,
  },
  loginButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.primaryButtonTextColor,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  }, 
  registerButtonText: {
    fontFamily: "GothamMedium",
    color: CONST.secondaryButtonTextColor,
    fontSize: CONST.normalButtonSize,
    textAlign: "center",
  },
  loginButtonBackground: {
    backgroundColor: CONST.primaryButtonBackground,
    justifyContent: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.primaryButtonBorderColor,
  },
  registerButtonBackground: {
    backgroundColor: CONST.secondaryButtonBackground,
    justifyContent: "center",
    height: CONST.heightButton,
    borderRadius: CONST.normalButtonRadius,
    margin: 5,
    borderWidth: 1,
    borderColor: CONST.secondaryButtonBorderColor,
  },

  welcomeTitle: {
    fontSize: CONST.pageTitleSize,
    fontFamily: "GothamMedium",
    color: CONST.darkerColor,
  },
  welcomeText: {
    fontSize: CONST.pageTextSize,
    paddingTop: 15,
    paddingBottom: 40,
    fontFamily: "GothamBook",
    lineHeight: CONST.pageTextSize + 5,
    color: CONST.darkerColor,
  },
  logoText: {
    textAlign: "center", 
    fontFamily: "GothamMedium", 
    color: CONST.primaryButtonTextColor, 
    fontSize: CONST.welcomeLogoText,
    paddingTop: CONST.textPadding,
  }
});
