import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ToastAndroid,
  ScrollView,
  View,
  Text,
  Dimensions,
  Switch,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

>>>>>>> bab837270f44d964803e5cf2f853cd589265d21f
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
// Variables
import * as CONST from "./../../styles/variables.js";

<<<<<<< HEAD


=======
>>>>>>> bab837270f44d964803e5cf2f853cd589265d21f
export default function Accessibility({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });
<<<<<<< HEAD
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
=======

  const [notificationsArray, setNotificationsArray] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  useEffect(() => {
    firebase
      .firestore()
      .collection("users_data")
      .doc(uid)
      .get()
      .then((doc) => {
        // console.log("From firebase: ", doc.data().devices)
        setNotificationsArray([...doc.data().notifications]);
        // console.log("Devices:", devices)
      });
  }, [userData]);
>>>>>>> bab837270f44d964803e5cf2f853cd589265d21f

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <ScrollView>
<<<<<<< HEAD
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
            
          
=======
        <StatusBar style="auto" />
        <Text style={styles.titleText}>Acessibilidade {"\n"}</Text>
        <View style={styles.boxOptions}>
          <Text style={styles.normalText}>Mão esquerda</Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[0]
                ? CONST.switchIndicatorColor
                : CONST.mainBlue
            }
            value={notificationsArray[0]}
            onValueChange={() => {
              if (notificationsArray[0]) {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [false, true, true, true],
                  });
                setNotificationsArray([false, true, true, true]);
              } else {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [true, false, false, false],
                  });
                setNotificationsArray([true, false, false, false]);
              }
              // firebase.firestore().collection('users_data').doc(uid).update({
              //   notifications : notificationsArray
              // })
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
              forceUpdate();
            }}
          />
        </View>

        <View style={styles.boxOptions}>
          <Text style={styles.normalText}>Alto contraste</Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[1]
                ? CONST.switchIndicatorColor
                : CONST.mainBlue
            }
            value={notificationsArray[1]}
            onValueChange={() => {
              if (notificationsArray[1]) {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [
                      notificationsArray[0],
                      !notificationsArray[1],
                      notificationsArray[2],
                      notificationsArray[3],
                    ],
                  });
                setNotificationsArray([
                  notificationsArray[0],
                  !notificationsArray[1],
                  notificationsArray[2],
                  notificationsArray[3],
                ]);
              } else {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [
                      false,
                      !notificationsArray[1],
                      notificationsArray[2],
                      notificationsArray[3],
                    ],
                  });
                setNotificationsArray([
                  false,
                  !notificationsArray[1],
                  notificationsArray[2],
                  notificationsArray[3],
                ]);
              }
              // firebase.firestore().collection('users_data').doc(uid).update({
              //   notifications : notificationsArray
              // })
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
              forceUpdate();
            }}
          />
        </View>

        <View style={styles.boxOptions}>
          <Text style={styles.normalText}>Modo noturno</Text>
          <Switch
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[2]
                ? CONST.switchIndicatorColor
                : CONST.mainBlue
            }
            value={notificationsArray[2]}
            onValueChange={() => {
              if (notificationsArray[2]) {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [
                      notificationsArray[0],
                      notificationsArray[1],
                      !notificationsArray[2],
                      notificationsArray[3],
                    ],
                  });
                setNotificationsArray([
                  notificationsArray[0],
                  notificationsArray[1],
                  !notificationsArray[2],
                  notificationsArray[3],
                ]);
              } else {
                firebase
                  .firestore()
                  .collection("users_data")
                  .doc(uid)
                  .update({
                    notifications: [
                      false,
                      notificationsArray[1],
                      !notificationsArray[2],
                      notificationsArray[3],
                    ],
                  });
                setNotificationsArray([
                  false,
                  notificationsArray[1],
                  !notificationsArray[2],
                  notificationsArray[3],
                ]);
              }
              // firebase.firestore().collection('users_data').doc(uid).update({
              //   notifications : notificationsArray
              // })
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
              forceUpdate();
            }}
          />
        </View>
>>>>>>> bab837270f44d964803e5cf2f853cd589265d21f
      </ScrollView>
    </SafeAreaProvider>
  );
}

<<<<<<< HEAD
=======
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingLeft: 25,
//     paddingRight: 25,
//     paddingBottom: 90,
//   },

//   options: {
//     flex: 1,
//     marginTop: 20,
//     marginBottom: 10,
//     borderRadius: 15,
//     paddingTop: 15,
//     paddingBottom: 15,
//     paddingLeft: 25,
//     width: screenWidth - 50,
//     flexDirection: "row",
//     alignItems: "center",
//     textAlign: 'left',
//     backgroundColor: "#E3ECF7",
//   },
//   rewards: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: 30,
//   },

//   title: {
//     fontFamily: "GothamMedium",
//     fontSize: 24,
//     marginTop: 30,
//   },

//   text: {
//     fontFamily: "GothamBook",
//     fontSize: 16,
//     marginLeft: 15,
//     lineHeight: 24,
//   },
// });
>>>>>>> bab837270f44d964803e5cf2f853cd589265d21f
