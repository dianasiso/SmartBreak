import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  Modal,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  Switch,
  Pressable,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AddCircle } from "iconsax-react-native";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

// Variables
import * as CONST from "./../../styles/variables.js";

// CSS
import { styles } from "./../../styles/css.js";


export default function Routines({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user.userID);

  // Var modal
  const [modalVisible, setModalVisible] = useState(false);
  const [addDays, setAddDays] = useState([]);
  const [openHoursStart, setOpenHoursStart] = useState(false);
  const [openMinutesStart, setOpenMinutesStart] = useState(false);
  const [openHoursEnd, setOpenHoursEnd] = useState(false);
  const [openMinutesEnd, setOpenMinutesEnd] = useState(false);
  const [valueHoursStart, setValueHoursStart] = useState("00");
  const [valueMinutesStart, setValueMinutesStart] = useState("00");
  const [valueHoursEnd, setValueHoursEnd] = useState("00");
  const [valueMinutesEnd, setValueMinutesEnd] = useState("00");

  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const arrayDays = [
    setMonday,
    setTuesday,
    setWednesday,
    setThursday,
    setFriday,
    setSaturday,
    setSunday,
  ];

  const [hours, setHours] = useState([
    { label: "00 h", value: "00" },
    { label: "01 h", value: "01" },
    { label: "02 h", value: "02" },
    { label: "03 h", value: "03" },
    { label: "04 h", value: "04" },
    { label: "05 h", value: "05" },
    { label: "06 h", value: "06" },
    { label: "07 h", value: "07" },
    { label: "08 h", value: "08" },
    { label: "09 h", value: "09" },
    { label: "10 h", value: "10" },
    { label: "11 h", value: "11" },
    { label: "12 h", value: "12" },
    { label: "13 h", value: "13" },
    { label: "14 h", value: "14" },
    { label: "15 h", value: "15" },
    { label: "16 h", value: "16" },
    { label: "17 h", value: "17" },
    { label: "18 h", value: "18" },
    { label: "19 h", value: "19" },
    { label: "20 h", value: "20" },
    { label: "21 h", value: "21" },
    { label: "22 h", value: "22" },
    { label: "23 h", value: "23" },
  ]);

  const [minutes, setMinutes] = useState([
    { label: "00 min", value: "00" },
    { label: "01 min", value: "01" },
    { label: "02 min", value: "02" },
    { label: "03 min", value: "03" },
    { label: "04 min", value: "04" },
    { label: "05 min", value: "05" },
    { label: "06 min", value: "06" },
    { label: "07 min", value: "07" },
    { label: "08 min", value: "08" },
    { label: "09 min", value: "09" },
    { label: "10 min", value: "10" },
    { label: "11 min", value: "11" },
    { label: "12 min", value: "12" },
    { label: "13 min", value: "13" },
    { label: "14 min", value: "14" },
    { label: "15 min", value: "15" },
    { label: "16 min", value: "16" },
    { label: "17 min", value: "17" },
    { label: "18 min", value: "18" },
    { label: "19 min", value: "19" },
    { label: "20 min", value: "20" },
    { label: "21 min", value: "21" },
    { label: "22 min", value: "22" },
    { label: "23 min", value: "23" },
    { label: "24 min", value: "24" },
    { label: "25 min", value: "25" },
    { label: "26 min", value: "26" },
    { label: "27 min", value: "27" },
    { label: "28 min", value: "28" },
    { label: "29 min", value: "29" },
    { label: "30 min", value: "30" },
    { label: "31 min", value: "31" },
    { label: "32 min", value: "32" },
    { label: "33 min", value: "33" },
    { label: "34 min", value: "34" },
    { label: "35 min", value: "35" },
    { label: "36 min", value: "36" },
    { label: "37 min", value: "37" },
    { label: "38 min", value: "38" },
    { label: "39 min", value: "39" },
    { label: "40 min", value: "40" },
    { label: "41 min", value: "41" },
    { label: "42 min", value: "42" },
    { label: "43 min", value: "43" },
    { label: "44 min", value: "44" },
    { label: "45 min", value: "45" },
    { label: "46 min", value: "46" },
    { label: "47 min", value: "47" },
    { label: "48 min", value: "48" },
    { label: "49 min", value: "49" },
    { label: "50 min", value: "50" },
    { label: "51 min", value: "51" },
    { label: "52 min", value: "52" },
    { label: "53 min", value: "53" },
    { label: "54 min", value: "54" },
    { label: "55 min", value: "55" },
    { label: "56 min", value: "56" },
    { label: "57 min", value: "57" },
    { label: "58 min", value: "58" },
    { label: "59 min", value: "59" },
  ]);

  const [routinesArray, setRoutines] = useState([]);
  const uid = userData;
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    try {
      firebase
        .firestore()
        .collection("users_routines")
        .doc(uid)
        .get()
        .then((doc) => {
          setRoutines([...doc.data().routines]);
        });
    } catch {
      setRoutines([]);
    }
  }, [userData]);

  const checkId = () => {
    for (let i = 0; i < routinesArray.length; i++) {
      routinesArray[i] = {
        end: routinesArray[i].end,
        start: routinesArray[i].start,
        id: i,
        using: routinesArray[i].using,
        days: routinesArray[i].days,
      };
    }
    firebase.firestore().collection("users_routines").doc(uid).update({
      routines: routinesArray,
    });
  };

  const clearFields = () => {
    setAddDays([]);
    setValueHoursStart("00");
    setValueMinutesStart("00");
    setValueHoursEnd("00");
    setValueMinutesEnd("00");
    arrayDays.forEach(function (x) {
      x(false);
    });
  };

  const addRoutine = () => {
    if (validateHours()) {
      checkId();
      daysToArray();

      routinesArray.push({
        start: valueHoursStart + ":" + valueMinutesStart,
        end: valueHoursEnd + ":" + valueMinutesEnd,
        using: true,
        days: addDays,
        id: routinesArray.length,
      });

      firebase.firestore().collection("users_routines").doc(uid).update({
        routines: routinesArray,
      });
      ToastAndroid.show("Rotina adicionada!", ToastAndroid.SHORT);
      setModalVisible(!modalVisible);
      clearFields();
    }
  };

  const validateHours = () => {
    if (valueHoursStart > valueHoursEnd) {
      Alert.alert(
        "Erro!",
        "A hora de início não pode ser posterior à hora de término."
      );
      return false;
    } else if (valueHoursStart == valueHoursEnd) {
      if (valueMinutesStart > valueMinutesEnd) {
        Alert.alert(
          "Erro!",
          "A hora de início não pode ser posterior à hora de término."
        );
        return false;
      } else if (valueMinutesStart == valueMinutesEnd) {
        Alert.alert(
          "Erro!",
          "As h de início e de término não podem ser semelhantes."
        );
        return false;
      }
    }
    return true;
  };

  const dayPressed = (daySelected, changeDay) => {
    if (daySelected) {
      changeDay(false);
    } else {
      changeDay(true);
    }
  };

  const daysToArray = () => {
    addDays.push(
      saturday,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday
    );
  };

  return (
    <SafeAreaProvider style={styles.containerLight}>
      <StatusBar style="dark" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackgroundView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "column"}}>
              <Text style={styles.normalText}>Hora de início</Text>
              <View style={styles.hoursContainer}>
                <DropDownPicker
                  maxHeight={80}
                  open={openHoursStart}
                  value={valueHoursStart}
                  items={hours}
                  setOpen={setOpenHoursStart}
                  setValue={setValueHoursStart}
                  setItems={setHours}
                  style={styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={styles.hoursTextStyle}
                  dropDownContainerStyle={{
                    backgroundColor: "#D2DBE6",
                    borderColor: "#000",
                    fontFamily: "GothamBook",
                    fontSize: 16,
                  }}
                />
                <DropDownPicker
                  maxHeight={80}
                  open={openMinutesStart}
                  value={valueMinutesStart}
                  items={minutes}
                  setOpen={setOpenMinutesStart}
                  setValue={setValueMinutesStart}
                  setItems={setMinutes}
                  style={styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={styles.hoursTextStyle}
                  dropDownContainerStyle={{
                    backgroundColor: "#D2DBE6",
                    borderColor: "#000",
                    fontFamily: "GothamBook",
                    fontSize: 16,
                  }}
                />
              </View>
              <Text style={styles.normalText}>Hora de término</Text>
              <View style={styles.hoursContainer}>
                <DropDownPicker
                  maxHeight={80}
                  open={openHoursEnd}
                  value={valueHoursEnd}
                  items={hours}
                  setOpen={setOpenHoursEnd}
                  setValue={setValueHoursEnd}
                  setItems={setHours}
                  style={styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={styles.hoursTextStyle}
                  dropDownContainerStyle={{
                    backgroundColor: "#D2DBE6",
                    borderColor: "#000",
                    fontFamily: "GothamBook",
                    fontSize: 16,
                  }}
                />
                <DropDownPicker
                  maxHeight={80}
                  open={openMinutesEnd}
                  value={valueMinutesEnd}
                  items={minutes}
                  setOpen={setOpenMinutesEnd}
                  setValue={setValueMinutesEnd}
                  setItems={setMinutes}
                  style={styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={styles.hoursTextStyle}
                  dropDownContainerStyle={{
                    backgroundColor: "#D2DBE6",
                    borderColor: "#000",
                    fontFamily: "GothamBook",
                    fontSize: 16,
                  }}
                />
              </View>
              <Text style={styles.normalText}>Dias da semana</Text>
              <View style={styles.daysContainer} >
                <Pressable
                  onPress={() => dayPressed(sunday, setSunday)}
                  style={
                    sunday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>D</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(monday, setMonday)}
                  style={
                    monday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>S</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(tuesday, setTuesday)}
                  style={
                    tuesday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>T</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(wednesday, setWednesday)}
                  style={
                    wednesday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>Q</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(thursday, setThursday)}
                  style={
                    thursday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>Q</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(friday, setFriday)}
                  style={
                    friday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>S</Text>
                </Pressable>
                <Pressable
                  onPress={() => dayPressed(saturday, setSaturday)}
                  style={
                    saturday
                      ? styles.modalRoutineButtonPressed
                      : styles.modalRoutineButton
                  }
                >
                  <Text style={styles.modalDay}>S</Text>
                </Pressable>
              </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                  clearFields();
                }}
                style={styles.smallSecondaryButton}
              >
                <Text style={styles.smallSecondaryButtonText}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable onPress={() => addRoutine()} style={styles.smallPrimaryButton}>
                <Text style={styles.smallPrimaryButtonText}>
                  Adicionar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'column'}}>
        <ScrollView>
          <Pressable
            style={styles.primaryButton}
            onPress={() => { setModalVisible(true); }}
            underlayColor={"transparent"}
          >
          <Text style={[styles.primaryButtonText, {paddingLeft: CONST.textPadding}]}>Adicionar rotina</Text>
          <AddCircle
              color={CONST.whiteText}
              variant="Bold"
              style={{marginLeft: "auto", marginRight: CONST.iconPadding}}
              onPress={() => { setModalVisible(true);}}
            />
          </Pressable>
          <Text style={[styles.smallText, {opacity: 0.5, paddingBottom: CONST.textPadding}]}>
            Clique continuamente nos seus equipamentos se os desejar eliminar.
          </Text>
        </ScrollView>
        <ScrollView style={{marginBottom: CONST.textPadding }}>
          {routinesArray &&
            routinesArray.length > 0 &&
            routinesArray.map((callbackfn, id) => (
              <Pressable
                key={id}
                style={longPress ? styles.boxOptionsPressed : styles.boxOptions}
                onLongPress={() => {
                  setLongPress(true);
                  Alert.alert(
                    "Atenção",
                    "Tem a certeza que deseja eliminar a rotina?",
                    [
                      {
                        text: "Cancelar",
                        onPress: () => {
                          setLongPress(false);
                        },
                      },
                      {
                        text: "Confirmar",
                        onPress: () => {
                          setLongPress(false);
                          const arrTemp = routinesArray.filter(
                            (item) => item.id !== routinesArray[id].id
                          );
                          setRoutines([...arrTemp]);
                          firebase
                            .firestore()
                            .collection("users_routines")
                            .doc(uid)
                            .update({
                              routines: arrTemp,
                            });
                          ToastAndroid.show(
                            "Rotina eliminada!",
                            ToastAndroid.SHORT
                          );
                        },
                      },
                    ]
                  );
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      paddingBottom: 20,
                    }}
                  >
                    <Text style={styles.normalText}>
                      {routinesArray[id].start}h - {routinesArray[id].end}h
                    </Text>
                    <Switch
                      style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
                      trackColor={{ false: CONST.switchOffColor, true: CONST.switchOnColor }}
                      thumbColor={routinesArray[id].using ? CONST.switchIndicatorColor : CONST.mainBlue}
                      value={routinesArray[id].using}
                      onValueChange={() => {
                        routinesArray[id] = {
                          start: routinesArray[id].start,
                          end: routinesArray[id].end,
                          days: routinesArray[id].days,
                          using: !routinesArray[id].using,
                          id: routinesArray[id].id,
                        };
                        firebase
                          .firestore()
                          .collection("users_routines")
                          .doc(uid)
                          .update({
                            routines: routinesArray,
                          });

                        ToastAndroid.show(
                          "Estado da rotina alterada!",
                          ToastAndroid.SHORT
                        );
                        forceUpdate();
                      }}
                    />
                  </View>
                  <View
                    style={{ flexDirection: "row", flex: 1, justifyContent: "center"}}>
                    <Text
                      style={
                        routinesArray[id].days[1]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      D
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[2]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      S
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[3]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      T
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[4]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      Q
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[5]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      Q
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[6]
                        ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      S
                    </Text>
                    <Text
                      style={
                        routinesArray[id].days[0]
                          ? [styles.normalText, {color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                          : [styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      S
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>

    </SafeAreaProvider>
  );
}

// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

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
//     textAlign: "left",
//     backgroundColor: "#E3ECF7",
//   },

//   optionsPressed: {
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
//     textAlign: "left",
//     backgroundColor: "#d2dbe6",
//   },

//   text: {
//     fontFamily: "GothamMedium",
//     fontSize: 20,
//   },

//   textDays: {
//     fontFamily: "GothamBook",
//     fontSize: 14,
//     color: "#000",
//     marginLeft: 5,
//     marginRight: 5,
//   },

//   textDaysSelected: {
//     fontFamily: "GothamMedium",
//     fontSize: 14,
//     color: "#0051ba",
//     marginLeft: 5,
//     marginRight: 5,
//   },

//   button: {
//     flex: 1,
//     marginTop: 30,
//     marginBottom: 10,
//     borderRadius: 15,
//     paddingTop: 15,
//     paddingBottom: 15,
//     paddingLeft: 20,
//     width: screenWidth - 50,
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     textAlign: "left",
//     backgroundColor: "#0051ba",
//   },

//   textButton: {
//     marginLeft: 10,
//     fontFamily: "GothamBook",
//     fontSize: 16,
//     color: "#FFF",
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalView: {
//     backgroundColor: "#E3ECF7",
//     borderRadius: 15,
//     padding: 25,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.5,
//     elevation: 10,
//   },
//   modalText: {
//     fontFamily: "GothamMedium",
//     fontSize: 16,
//     textAlign: "left",
//     marginBottom: 0,
//   },
//   modalDay: {
//     fontFamily: "GothamBook",
//     fontSize: 16,
//     textAlign: "left",
//     marginBottom: 0,
//   },
//   modalTypeButton: {
//     backgroundColor: "transparent",
//     borderColor: "transparent",
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     margin: 2,
//     textAlign: "center",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalTypeButtonPressed: {
//     backgroundColor: "transparent",
//     borderColor: "#000",
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     margin: 2,
//     textAlign: "center",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalInput: {
//     marginTop: 0,
//     borderBottomWidth: 1,
//     paddingTop: 5,
//     paddingBottom: 5,
//     fontFamily: "GothamBook",
//     fontSize: 16,
//   },
//   buttonAdd: {
//     backgroundColor: "#0051ba",
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderRadius: 8,
//     alignItems: "center",
//     marginLeft: 10,
//   },

//   hoursPicker: {
//     backgroundColor: "transparent",
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     paddingBottom: 0,
//     fontSize: 16,
//     fontFamily: "GothamBook",
//   },

//   modalRoutineButton: {
//     borderWidth: 1,
//     borderColor: "transparent",
//     borderRadius: 8,
//     marginLeft: 5,
//     marginRight: 5,
//     paddingTop: 6,
//     paddingBottom: 6,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   modalRoutineButtonPressed: {
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 8,
//     marginLeft: 5,
//     marginRight: 5,
//     paddingTop: 6,
//     paddingBottom: 6,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
// });
