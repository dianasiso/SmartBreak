import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ScrollView, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
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
    <View style={styles.mainContainer}>
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

      <ScrollView style={styles.subContainer}>
        <View>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Bem-vindo!"
            style={styles.titleText}>Bem-vindo!</Text>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor preta num fundo branco escrito Faz pausas no trabalho, desliga os teus equipamentos, e contribui para
            a redução do desperdício energético. Aumenta a tua produtividade e eficiência energética!"
            style={[styles.normalText, {paddingTop: CONST.boxPadding, paddingBottom: CONST.inputMargin}]}>
            Faz pausas no trabalho, desliga os teus equipamentos, e contribui para
            a redução do desperdício energético. Aumenta a tua produtividade e eficiência energética!
          </Text>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de efetuar o Login. Tem escrito na cor branca a palavra Entrar."
            onPress={() => navigation.navigate("Login")}
            style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </Pressable>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão branco com borda da cor laranja num fundo branco com o objetivo de efetuar o Registo. Tem escrito na cor laranja a palavra Registar"
            onPress={() => navigation.navigate("Onboarding")}
            style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Registar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

