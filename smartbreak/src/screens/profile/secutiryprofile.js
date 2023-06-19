import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  ToastAndroid,
  Text,
  Switch,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";



export default function SecurityProfile({ navigation }) {

  
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  let permissionsArray = [...userData.permissions];
  const [shareData, setShareData] = useState(permissionsArray[1])
  
  async function update () {
    const updatedPermissionsArray = [...permissionsArray];
    updatedPermissionsArray[1] = !shareData;
    setShareData(!shareData)
    try {
      const response = await fetch( "https://sb-api.herokuapp.com/users/" + userData.userID,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userData.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permissions: updatedPermissionsArray,
        }),
      });
      if (response.ok) {
        // ! DANIEL ATUALIZA O REDUX AQUI PFV
        Alert.alert("Sucesso!", "Permissões alteradas com sucesso.");
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
 
  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[dark_mode ? dark_styles.containerLight : styles.containerLight, {paddingTop: CONST.backgroundPaddingTop / 2}]}
    >
      <ScrollView>
        <StatusBar style={dark_mode ? "light" : "dark" } />
        <Text 
          accessible={true}
          accessibilityLabel="Texto escrito Segurança. É o título da página."
          style={ dark_mode ? dark_styles.titleText : styles.titleText}>Segurança{"\n"}</Text>
          <Text 
            accessible={true}
            accessibilityLabel="O utilizador, ao aceitar os Termos e Política de Privacidade,
            autoriza expressamente a aplicação a coletar, usar, armazenar,
            tratar, ceder ou utilizar as informações derivadas do uso da
            aplicação, incluindo todas as informações preenchidas pelo
            utilizador no momento em que realizar ou atualizar o seu cadastro,
            além de outras expressamente descritas na Política de Privacidade
            que deverá ser autorizada pelo utilizador."
            
            style={dark_mode ? dark_styles.normalText : styles.normalText}>
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
        
          <View style={[dark_mode ? dark_styles.boxOptions : styles.boxOptions, {borderBottomWidth: 0, borderTopWidth: 1, borderTopColor: dark_mode ? CONST.greyColor : CONST.dividerColor}]}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Partilha de dados. Possui um switch à frente para ativar ou desativar a opção."
              style={dark_mode ? dark_styles.normalText : styles.normalText}>Partilha de dados</Text>
            <Switch
              style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
              trackColor={{ false: CONST.switchOffColor, true: dark_mode ? CONST.lightBlue : CONST.switchOnColor }}
              thumbColor={shareData ? CONST.switchIndicatorColor : dark_mode ? CONST.lightBlue: CONST.mainBlue}
              value={shareData}
              onValueChange={(() => {
                update()
                ToastAndroid.show('Alterações efetuadas com sucesso!', ToastAndroid.SHORT);
              })}
            />
          </View>
            
          
      </ScrollView>
    </SafeAreaProvider>
  );
}

