import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ToastAndroid,
  ScrollView,
  Alert,
  Pressable,
  View,
  Text,
  Switch,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  updateNotifications,
  saveNewNotificationsToAsyncStorage,
} from "../../redux/user.js";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";
// Variables
import * as CONST from "./../../styles/variables.js";

export default function NotificationsProfile({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1];

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const [notificationsArray, setNotificationsArray] = useState(
    userData.notifications
  );

  async function update(position, value) {
    const updatedNotificationsArray = [...notificationsArray];
    updatedNotificationsArray[position] = value;

    try {
      const response = await fetch(
        "https://sb-api.herokuapp.com/users/" + userData.userID,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + userData.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notifications: updatedNotificationsArray,
          }),
        }
      );

      if (response.ok) {
        dispatch(updateNotifications(updatedNotificationsArray));

        try {
          dispatch(
            saveNewNotificationsToAsyncStorage(updatedNotificationsArray)
          );
          console.log(
            "Notifications saved to AsyncStorage:",
            updatedNotificationsArray
          );
        } catch (error) {
          console.error(error);
          Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
        }

        Alert.alert("Sucesso!", "Notificações alteradas com sucesso.");
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
      style={[
        dark_mode ? dark_styles.containerLight : styles.containerLight,
        { paddingTop: CONST.backgroundPaddingTop / 2 },
      ]}
    >
      <ScrollView>
        <StatusBar style={dark_mode ? "light" : "dark"} />
        <Text
          accessible={true}
          accessibilityLabel="Texto escrito Notificações. É o título da página."
          style={dark_mode ? dark_styles.titleText : styles.titleText}
        >
          Notificações {"\n"}
        </Text>

        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text
            accessible={true}
            accessibilityLabel="Texto escrito Suspender tudo. Possui um switch à frente para ativar ou desativar a opção."
            style={dark_mode ? dark_styles.normalText : styles.normalText}
          >
            Supender tudo
          </Text>
          <Switch
            accessible={true}
            accessibilityLabel={
              notificationsArray[0] ? "Ativado" : "Desativado"
            }
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[0]
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={notificationsArray[0]}
            onValueChange={() => {
              if (notificationsArray[0]) {
                setNotificationsArray([false, true, true, true]);
              } else {
                setNotificationsArray([true, false, false, false]);
              }
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
            }}
          />
        </View>

        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text
            accessible={true}
            accessibilityLabel="Texto escrito Recomendações de pausas. Possui um switch à frente para ativar ou desativar a opção."
            style={dark_mode ? dark_styles.normalText : styles.normalText}
          >
            Recomendações de pausas
          </Text>
          <Switch
            accessible={true}
            accessibilityLabel={
              notificationsArray[1] ? "Ativado" : "Desativado"
            }
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[1]
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={notificationsArray[1]}
            onValueChange={() => {
              if (notificationsArray[1]) {
                setNotificationsArray([
                  notificationsArray[0],
                  !notificationsArray[1],
                  notificationsArray[2],
                  notificationsArray[3],
                ]);
              } else {
                setNotificationsArray([
                  false,
                  !notificationsArray[1],
                  notificationsArray[2],
                  notificationsArray[3],
                ]);
              }
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
            }}
          />
        </View>

        <View style={dark_mode ? dark_styles.boxOptions : styles.boxOptions}>
          <Text
            accessible={true}
            accessibilityLabel="Texto escrito Novos objetivos. Possui um switch à frente para ativar ou desativar a opção."
            style={dark_mode ? dark_styles.normalText : styles.normalText}
          >
            Novos objetivos
          </Text>
          <Switch
            accessible={true}
            accessibilityLabel={
              notificationsArray[3] ? "Ativado" : "Desativado"
            }
            style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
            trackColor={{
              false: CONST.switchOffColor,
              true: dark_mode ? CONST.lightBlue : CONST.switchOnColor,
            }}
            thumbColor={
              notificationsArray[3]
                ? CONST.switchIndicatorColor
                : dark_mode
                ? CONST.lightBlue
                : CONST.mainBlue
            }
            value={notificationsArray[3]}
            onValueChange={() => {
              if (notificationsArray[3]) {
                setNotificationsArray([
                  notificationsArray[0],
                  notificationsArray[1],
                  notificationsArray[2],
                  !notificationsArray[3],
                ]);
              } else {
                setNotificationsArray([
                  false,
                  notificationsArray[1],
                  notificationsArray[2],
                  !notificationsArray[3],
                ]);
              }
              ToastAndroid.show(
                "Alterações efetuadas com sucesso!",
                ToastAndroid.SHORT
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
