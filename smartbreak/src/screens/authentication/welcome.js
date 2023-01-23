import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Font Gotham
import { useFonts } from "expo-font";


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
            style={{ width: 160, height: 160 }}
            source={require("./../../imgs/img_logo_white_version.png")}
          />
        </View>
        <Text style={styles.textMessageTitleLogo}>
          <Text style={{ fontFamily: "GothamMedium" }}>Smart Break</Text>
        </Text>
      </ScrollView>

      <ScrollView style={styles.containerWelcome}>
        <View style={{marginTop: 20}}>
          <Text style={styles.textWelcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.textWelcomeText}>
            Faz pausas no trabalho, desliga os teus equipamentos, e contribui para
            a redução do desperdício energético. Aumenta a tua produtividade e eficiência energética!
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={styles.buttonWelcome}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Onboarding")}
            style={styles.buttonWelcome}
          >
            <Text style={styles.buttonText}>Registar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: "#0051BA",
  },
  containerWelcome: {
    backgroundColor: "#FFF",
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    marginBottom: 0,
  },
  imageLogo: {
    alignItems: "center",
    paddingTop: 80,
  },
  buttonText: {
    fontFamily: "GothamBook",
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
  buttonWelcome: {
    backgroundColor: "#0051BA",
    justifyContent: "center",
    height: 48,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  textWelcomeTitle: {
    fontSize: 24,
    textAlign: "left",
    paddingTop: 20,
    fontFamily: "GothamMedium",
    color: "#001025",
  },
  textWelcomeText: {
    fontSize: 16,
    textAlign: "left",
    paddingTop: 15,
    paddingBottom: 40,
    fontFamily: "GothamBook",
    lineHeight: 24,
    color: "#001025",
  },
  textMessageTitleLogo: {
    fontSize: 40,
    textAlign: "center",
    paddingTop: 30,
    fontFamily: "GothamBook",
    color: "#E3ECF7",
  },
});
