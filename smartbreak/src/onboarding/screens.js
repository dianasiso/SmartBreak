import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {Text, View, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Icons
import { Ionicons } from "@expo/vector-icons";

// CSS
import { styles } from "./../styles/css.js";

// Variables
import * as CONST from "./../styles/variables.js";


// Font Gotham
import { useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";

export default function Onboarding() {
  const navigation = useNavigation();
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../fonts/GothamMedium.ttf"),
    GothamBook: require("./../fonts/GothamBook.ttf"),
  });

  const [page, setPage] = useState(1); // Onboarding page
  const [isVisible, setIsVisible] = useState(true); // Skip button visibility
  const scrollViewRef = useRef(null); // ScrollView ref

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  // Change navigator when change screen
  const NavigatorScreen = (page) => {
    if (page == 1) {
      return (
        <View style={styles.navigator}>
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
        </View>
      );
    } else if (page == 2) {
      return (
        <View style={styles.navigator}>
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
        </View>
      );
    } else if (page == 3) {
      return (
        <View style={styles.navigator}>
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
        </View>
      );
    } else if (page == 4) {
      return (
        <View style={styles.navigator}>
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ marginLeft: 2, marginRight: 2 }}
          />
          <Ionicons
            name="ellipse"
            size={8}
            color="white"
            style={{ opacity: 0.5, marginLeft: 2, marginRight: 2 }}
          />
        </View>
      );
    } else {
      return <></>;
    }
  };

  // Skip to last screen
  const SkipOption = () => {
    setPage(5);
    scrollViewRef.current.scrollToEnd();
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.skipBox}>
        <Text
          accessible={true}
          accessibilityLabel="Texo na cor branca num fundo azul escuro escrito Saltar." 
          onPress={SkipOption}
          style={[styles.skipText, { opacity: isVisible ? 1 : 0 }]}>Saltar</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          var x = e.nativeEvent.contentOffset.x;
          if (x == 0) {
            setPage(1);
            setIsVisible(true);
          } else if (x < CONST.screenWidth + 1) {
            setPage(2);
            setIsVisible(true);
          } else if (x < CONST.screenWidth * 2 + 1) {
            setPage(3);
            setIsVisible(true);
          } else if (x < CONST.screenWidth * 3 + 1) {
            setPage(4);
            setIsVisible(true);
          } else {
            setPage(5);
            setIsVisible(false);
          }
          // alert(screenWidth*2)
          // alert(e.nativeEvent.contentOffset.x)
        }}>
        <View style={styles.container}>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Bem vindo à Smart Break." 
            style={[styles.titleTextWhite, {fontFamily: "GothamBook", textAlign: "center"}]}>
              Bem-vindo à{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>Smart Break</Text>
          </Text>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Carregue a sua bateria e aprenda a converter tempo em lucro e lazer." 
            style={[styles.normalTextWhite, {textAlign: 'center', paddingTop: CONST.backgroundPaddingTop}]}>
              Carregue a sua{" "}
            <Text style={{ fontFamily: "GothamMedium" }}>bateria</Text> e
              aprenda a converter tempo em{" "}
            <Text style={{ fontFamily: "GothamMedium" }}>lucro</Text> e{" "}
            <Text style={{ fontFamily: "GothamMedium" }}>lazer</Text>
          </Text>
          <Image
            accessible={true}
            accessibilityLabel="Imagem na cor azul num fundo azul escuro. É o logótipo da marca. Uma bateria semi preenchida com um caule à volta, terminando numa folha."
            style={styles.firstImage}
            source={require("./../imgs/smartbreak_logotipo_onboarding.png")}
          />
        </View>
        <View style={styles.container}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Energia." 
              style={[styles.titleTextWhite, { textAlign: "center"}]}>
                Energia</Text>
              <Text  
                accessible={true}
                accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Tome as decisões mais acertadas, poupe e ganhe energia numa pausa." 
                style={[styles.normalTextWhite, {textAlign: 'center', paddingTop: CONST.backgroundPaddingTop}]}>
                Tome as decisões mais acertadas,{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>poupe</Text> e{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>ganhe</Text> energia
                numa pausa{" "}
            </Text>
          <View 
            accessible={true}
            accessibilityLabel="Imagem na cor azul num fundo azul escuro. É uma bateria com a sua carga a aumentar em loop."
            style={styles.imageLogo}>
            <Image source={require("./../imgs/smartbreak_battery_onboarding.png")} />
          </View>
        </View>
        <View style={styles.container}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Produtividade." 
              style={[styles.titleTextWhite, {textAlign: "center"}]}>
              Produtividade</Text>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Aumente a sua produtividade e o seu contributo para a empresa através de estatísticas." 
              style={[styles.normalTextWhite, {textAlign: 'center', paddingTop: CONST.backgroundPaddingTop}]}>
              Aumente a sua{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>produtividade</Text>{" "}
              e o seu contributo para a empresa através de{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>estatísticas</Text>{" "}
            </Text>
          <View style={styles.imageLogo}>
            <Image source={require("./../imgs/smartbreak_stats_onboarding.png")} />
          </View>
        </View>
        <View style={styles.container}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Consciencialização." 
              style={[styles.titleTextWhite, {textAlign: "center"}]}>
                Consciencialização
            </Text>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Auxilie-se de dicas para melhorar hábitos de consumo energético mais conscientes." 
              style={[styles.normalTextWhite, {textAlign: 'center', paddingTop: CONST.backgroundPaddingTop}]}>
              Auxilie-se de{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>dicas</Text> para
              melhorar hábitos de consumo energético mais{" "}
              <Text style={{ fontFamily: "GothamMedium" }}>conscientes</Text>{" "}
            </Text>
          <View style={styles.imageLogo}>
            <Image source={require("./../imgs/smartbreak_lamp_onboarding.png")} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={[styles.imageLogo, {marginTop: 0}]}>
              <Image
                accessible={true}
                accessibilityLabel="Imagem na cor branca num fundo azul escuro. É o logótipo da marca. Uma bateria semi preenchida com um caule à volta, terminando numa folha."
                style={{ width: 180, height: 180 }}
                source={require("./../imgs/smartbreak_logotipo_white.png")}
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
                onPress={() => navigation.navigate("Register")}
                style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Registar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      {NavigatorScreen(page)}
    </SafeAreaProvider>
  );
}
