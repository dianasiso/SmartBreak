import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ToastAndroid,
  Text,
  Switch,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
// Variables
import * as CONST from "./../../styles/variables.js";



export default function Accessibility({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const [shareData, setShareData] = useState();
  
  useEffect(() => {
    firebase.firestore()
    .collection("users_data")
    .doc(uid)
    .get()
    .then((doc) => {
        setShareData(doc.data().shareData);
    })

  },[])

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <ScrollView>
        <StatusBar style="dark" />
        <Text 
          accessible={true}
          accessibilityLabel="Texto na cor preta num fundo branco escrito Acessibilidade. É o título da página."
          style={styles.titleText}>Acessibilidade{"\n"}</Text>
          <Text 
            accessible={true}
            accessibilityLabel="O utilizador, ao aceitar os Termos e Política de Privacidade,
            autoriza expressamente a aplicação a coletar, usar, armazenar,
            tratar, ceder ou utilizar as informações derivadas do uso da
            aplicação, incluindo todas as informações preenchidas pelo
            utilizador no momento em que realizar ou atualizar o seu cadastro,
            além de outras expressamente descritas na Política de Privacidade
            que deverá ser autorizada pelo utilizador."
            
            style={styles.normalText}>
            O utilizador, ao aceitar os Termos e Política de Privacidade,
            autoriza expressamente a aplicação a coletar, usar, armazenar,
            tratar, ceder ou utilizar as informações derivadas do uso da
            aplicação, incluindo todas as informações preenchidas pelo
            utilizador no momento em que realizar ou atualizar o seu cadastro,
            além de outras expressamente descritas na Política de Privacidade
            que deverá ser autorizada pelo utilizador.
            {"\n"}
            {"\n"}
          </Text>
        
          <View style={[styles.boxOptions, {borderBottomWidth: 0, borderTopWidth: 1, borderTopColor: CONST.dividerColor}]}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Partilha de dados. Possui um switch à frente para ativar ou desativar a opção."
              style={styles.normalText}>Partilha de dados</Text>
            <Switch
              style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
              trackColor={{ false: CONST.switchOffColor, true: CONST.switchOnColor }}
              thumbColor={shareData ? CONST.switchIndicatorColor : CONST.mainBlue}
              value={shareData}
              onValueChange={(() => {
                firebase.firestore().collection('users_data').doc(uid).update({
                  shareData : !shareData
                })
                setShareData(!shareData)
                ToastAndroid.show('Alterações efetuadas com sucesso!', ToastAndroid.SHORT);
              })}
            />
          </View>
            
          
      </ScrollView>
    </SafeAreaProvider>
  );
}

