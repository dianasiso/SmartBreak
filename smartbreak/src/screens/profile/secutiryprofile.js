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

export default function NotificationsProfile({ navigation }) {
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

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }


  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Segurança</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>
            O utilizador, ao aceitar os Termos e Política de Privacidade,
            autoriza expressamente a aplicação a coletar, usar, armazenar,
            tratar, ceder ou utilizar as informações derivadas do uso da
            aplicação, incluindo todas as informações preenchidas pelo
            utilizador no momento em que realizar ou atualizar o seu cadastro,
            além de outras expressamente descritas na Política de Privacidade
            que deverá ser autorizada pelo utilizador.
          </Text>
        
          <View style={styles.options}>
            <Text style={styles.textOptions}>Partilha de dados</Text>
            <Switch
              style={{marginLeft: 'auto', marginRight: 25}}
              trackColor={{ false: "#BBBABA", true: "#0051BA" }}
              thumbColor={shareData ? "#E3ECF7" : "#0051ba"}
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
            
          
          </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
  },

  
  options: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: screenWidth - 50, 
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
    flexDirection: 'row',
    justifyContent: "space-between",
  },

  textOptions: {
    marginLeft: 25,
    fontFamily: "GothamBook",
    fontSize: 16,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    marginTop: 30,
    lineHeight: 24,
  },
});
