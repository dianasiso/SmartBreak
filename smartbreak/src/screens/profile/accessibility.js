import { StatusBar } from "expo-status-bar";
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

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.containerLight}
    >
      <ScrollView>
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
      </ScrollView>
    </SafeAreaProvider>
  );
}

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
