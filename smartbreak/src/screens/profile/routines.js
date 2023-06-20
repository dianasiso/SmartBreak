import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  Modal,
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
import { dark_styles } from "../../styles/darkcss.js";


export default function Routines({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user);
  const dark_mode = !userData.accessibility[1]

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

  const [routinesArray, setRoutinesArray] = useState([]);
  const [longPress, setLongPress] = useState(false);
  const [reload, setReload] = useState(false);

  async function deleteRoutine(id) {
    try {
      const response = await fetch("https://sb-api.herokuapp.com/routines/" + id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + userData.token,
        }
      });
      if (response.ok) {
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  }

  
  async function updateStatus(status, id) {
    try {
      const response = await fetch("https://sb-api.herokuapp.com/routines/" + id, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer " + userData.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: status
        }),
      });
      if (response.ok) {
        ToastAndroid.show(
          "Estado da rotina alterado!",
          ToastAndroid.SHORT
        );
        setReload(true)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  }



  useEffect(() => {
    setReload(false)
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/routines/user/" + userData.userID, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setRoutinesArray(data.message);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
    }
    fetchData();
    // console.log(routinesArray)
  }, [userData, reload]);


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

  // ! PENDENTE
  const addRoutine = async () => {
    const initialState = true

    if (validateHours()) {
      daysToArray();

      try {
        const response = await fetch("https://sb-api.herokuapp.com/routines/", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + userData.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: valueHoursStart + ":" + valueMinutesStart,
            end: valueHoursEnd + ":" + valueMinutesEnd,
            state: initialState,
            days: addDays,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data)
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
  
     
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
    <SafeAreaProvider
    showsVerticalScrollIndicator={false}
    style={[dark_mode ? dark_styles.containerLight : styles.containerLight, { paddingTop: CONST.backgroundPaddingTop / 2 }]}
  >
    <StatusBar style={dark_mode ? "light" : "dark"} />
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
        <View style={dark_mode ? dark_styles.modalBackgroundView : styles.modalBackgroundView}>
          <View style={dark_mode ? dark_styles.modalView : styles.modalView}>
            <View style={{ flexDirection: "column"}}>
              <Text 
                accessible={true}
                accessibilityLabel="Texto escrito Hora de início. Em baixo segue-se 2 menus dropdown alinhados um ao lado do outro para definição da hora de início da pausa. O primeiro é referente às horas e o segundo referente aos minutos."  
                style={dark_mode ? dark_styles.normalText : styles.normalText}>Hora de início</Text>
              <View style={dark_mode ? dark_styles.hoursContainer : styles.hoursContainer}>
                <DropDownPicker
                  accessible={true}
                  accessibilityLabel={valueHoursStart}  
                  maxHeight={80}
                  open={openHoursStart}
                  value={valueHoursStart}
                  items={hours}
                  setOpen={setOpenHoursStart}
                  setValue={setValueHoursStart}
                  setItems={setHours}
                  style={dark_mode ? dark_styles.hoursPicker : styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={dark_mode ? dark_styles.hoursTextStyle : styles.hoursTextStyle}
                  dropDownContainerStyle={dark_mode ? dark_styles.dropwdownBoxRoutines : styles.dropwdownBoxRoutines}
                />
                <View style={{width: 20}}></View>
                <DropDownPicker
                  accessible={true}
                  accessibilityLabel={valueMinutesStart}  
                  maxHeight={80}
                  open={openMinutesStart}
                  value={valueMinutesStart}
                  items={minutes}
                  setOpen={setOpenMinutesStart}
                  setValue={setValueMinutesStart}
                  setItems={setMinutes}
                  style={dark_mode ? dark_styles.hoursPicker : styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={dark_mode ? dark_styles.hoursTextStyle : styles.hoursTextStyle}
                  dropDownContainerStyle={dark_mode ? dark_styles.dropwdownBoxRoutines : styles.dropwdownBoxRoutines}
                />
              </View>
              <Text 
                accessible={true}
                accessibilityLabel="Texto escrito Hora de término. Em baixo segue-se 2 menus dropdown alinhados um ao lado do outro para definição da hora de término da pausa. O primeiro é referente às horas e o segundo referente aos minutos."  
                style={dark_mode ? dark_styles.normalText : styles.normalText}>Hora de término</Text>
              <View style={dark_mode ? dark_styles.hoursContainer : styles.hoursContainer}>
                <DropDownPicker
                  accessible={true}
                  accessibilityLabel={valueHoursEnd}  
                  maxHeight={80}
                  open={openHoursEnd}
                  value={valueHoursEnd}
                  items={hours}
                  setOpen={setOpenHoursEnd}
                  setValue={setValueHoursEnd}
                  setItems={setHours}
                  style={dark_mode ? dark_styles.hoursPicker : styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={dark_mode ? dark_styles.hoursTextStyle : styles.hoursTextStyle}
                  dropDownContainerStyle={dark_mode ? dark_styles.dropwdownBoxRoutines : styles.dropwdownBoxRoutines}
                />
                <View style={{width: 20}}></View>
                <DropDownPicker
                  accessible={true}
                  accessibilityLabel={valueMinutesEnd}  
                  maxHeight={80}
                  open={openMinutesEnd}
                  value={valueMinutesEnd}
                  items={minutes}
                  setOpen={setOpenMinutesEnd}
                  setValue={setValueMinutesEnd}
                  setItems={setMinutes}
                  style={dark_mode ? dark_styles.hoursPicker : styles.hoursPicker}
                  multiple={false}
                  showTickIcon={false}
                  closeAfterSelecting={true}
                  textStyle={dark_mode ? dark_styles.hoursTextStyle : styles.hoursTextStyle}
                  dropDownContainerStyle={dark_mode ? dark_styles.dropwdownBoxRoutines : styles.dropwdownBoxRoutines}
                />
              </View>
              <Text 
                accessible={true}
                accessibilityLabel="Texto escrito Dias da semana. Em baixo segue-se 7 botões alinhados um ao lado do outro simbolizando os dias da semana e começando pelo domingo. Clique neles para definir em que dias a rotina acontece."  
                style={dark_mode ? dark_styles.normalText : styles.normalText}>Dias da semana</Text>
              <View style={dark_mode ? dark_styles.daysContainer : styles.daysContainer} >
                <Pressable
                  accessible={true}
                  accessibilityLabel="Domingo."  
                  onPress={() => dayPressed(sunday, setSunday)}
                  style={
                    sunday
                      ? dark_mode ? 
                      dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                      : dark_mode ? 
                      dark_styles.modalRoutineButton : styles.modalRoutineButton
                  }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>D</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Segunda."  
                  onPress={() => dayPressed(monday, setMonday)}
                  style={
                    monday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                 }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>S</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Terça."  
                  onPress={() => dayPressed(tuesday, setTuesday)}
                  style={
                    tuesday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>T</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Quarta."  
                  onPress={() => dayPressed(wednesday, setWednesday)}
                  style={
                    wednesday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>Q</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Quinta."  
                  onPress={() => dayPressed(thursday, setThursday)}
                  style={
                    thursday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>Q</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Sexta."  
                  onPress={() => dayPressed(friday, setFriday)}
                  style={
                    friday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                 }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>S</Text>
                </Pressable>
                <Pressable
                  accessible={true}
                  accessibilityLabel="Sabado."  
                  onPress={() => dayPressed(saturday, setSaturday)}
                  style={
                    saturday
                    ? dark_mode ? 
                    dark_styles.modalRoutineButtonPressed : styles.modalRoutineButtonPressed
                    : dark_mode ? 
                    dark_styles.modalRoutineButton : styles.modalRoutineButton
                }
                >
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>S</Text>
                </Pressable>
              </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão com o objetivo de cancelar a adição da rotina. Tem escrito na cor laranja a palavra Cancelar."    
                onPress={() => {
                  setModalVisible(!modalVisible);
                  clearFields();
                }}
                style={dark_mode ? dark_styles.smallSecondaryButton : styles.smallSecondaryButton}
              >
                <Text style={dark_mode ? dark_styles.smallSecondaryButtonText : styles.smallSecondaryButtonText}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable 
                accessible={true}
                accessibilityLabel="Botão com o objetivo de adicionar a rotina configurada. Tem escrito na cor branca a palavra Adicionar."  
                onPress={() => {
                  addRoutine()
                  setReload(true)
                }} 
                style={dark_mode ? dark_styles.smallPrimaryButton : styles.smallPrimaryButton}>
                <Text style={dark_mode ? dark_styles.smallPrimaryButtonText : styles.smallPrimaryButtonText}>
                  Adicionar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'column'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão com o objetivo de Adicionar uma nova rotina. Tem escrito na cor branca a frase Adicionar rotina e está acompanhado por um icon redondo com o símbolo de mais. Ao clicar nele abrirá um modal branco com três campos de preenchimento para registo de uma rotina."
            style={dark_mode ? dark_styles.primaryButton : styles.primaryButton}
            onPress={() => { setModalVisible(true); }}
            underlayColor={"transparent"}
          >
          <Text style={[dark_mode ? dark_styles.primaryButtonText : styles.primaryButtonText, {paddingLeft: CONST.textPadding}]}>Adicionar rotina</Text>
          <AddCircle
              color={dark_mode ? CONST.darkerColor : CONST.whiteText}
              variant="Bold"
              style={{marginLeft: "auto", marginRight: CONST.iconPadding}}
              onPress={() => { setModalVisible(true);}}
            />
          </Pressable>
          <Text 
            accessible={true}
            accessibilityLabel="Texto escrito Clique continuamente nas suas rotinas se as desejar eliminar." 
            style={[dark_mode ? dark_styles.smallText : styles.smallText, {opacity: 0.5, paddingBottom: CONST.textPadding}]}>
            Clique continuamente nas suas rotinas se as desejar eliminar.
          </Text>
        </ScrollView>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: CONST.backgroundPaddingTop * 5, marginTop: 5 }}>
          {routinesArray &&
            routinesArray.length > 0 &&
            routinesArray.map((callbackfn, id) => (
              <Pressable
                accessible={true}
                accessibilityLabel="Botão com as horas definidas para a rotina. Ao pressionar continuamente irá ativar um alerta que lhe pergunta se tem a certeza que deseja eliminar a rotina."
                key={routinesArray[id]._id}
                style={longPress ? dark_mode ? dark_styles.boxOptionsPressed : styles.boxOptionsPressed : dark_mode ? dark_styles.boxOptions : styles.boxOptions}
                onLongPress={() => {
                  setLongPress(true);
                  Alert.alert(
                    "Atenção",
                    "Tem a certeza que deseja eliminar a rotina?",
                    [
                      {
                        text: "Cancelar",
                        accessible: true,
                        accessibilityLabel: "Texto escrito Cancelar.",
                        onPress: () => {
                          setLongPress(false);
                        },
                      },
                      {
                        text: "Confirmar",
                        accessible: true,
                        accessibilityLabel: "Texto escrito Confirmar.",
                        onPress: () => {
                          setLongPress(false);
                          deleteRoutine(routinesArray[id]._id)
                          setReload(true);
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
                <View style={dark_mode ? dark_styles.boxRoutine : styles.boxRoutine}>
                  <View style={[dark_mode ? dark_styles.rowRoutine : styles.rowRoutine, {paddingBottom: CONST.boxMargin}]}>
                    <Text 
                      accessible={true}
                      accessibilityLabel="" 
                      // TODO: DESCOBRIR COMO PASSAR VARIAVEIS PRAI
                      style={dark_mode ? dark_styles.normalText : styles.normalText}>
                      {routinesArray[id].start}h - {routinesArray[id].end}h
                    </Text>
                    <Switch
                      accessible={true}
                      accessibilityLabel={routinesArray[id].using ?  "Dispositivo em uso." : "Dispositivo desativado."}     
                      style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
                      thumbColor={routinesArray[id].state ? CONST.switchIndicatorColor : dark_mode ? CONST.lightBlue : CONST.mainBlue}
                      trackColor={{ false: CONST.switchOffColor, true: dark_mode ? CONST.lightBlue : CONST.switchOnColor }}
                      value={routinesArray[id].state}
                      onValueChange={() => {
                        updateStatus(!routinesArray[id].state, routinesArray[id]._id)
                      }}
                    />
                  </View>
                  <View style={[dark_mode ? dark_styles.rowRoutine : styles.rowRoutine, {paddingTop: CONST.boxMargin}]}>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[1]
                        ?  "Alarme programado para domingo." : "Alarme não programado para domingo"}     
                      style={
                        routinesArray[id].days[1]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      D
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[2]
                         ?  "Alarme programado para segunda-feira." : "Alarme não programado para segunda-feira."}     
                      style={
                        routinesArray[id].days[2]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      S
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[3]
                         ?  "Alarme programado para terça-feira." : "Alarme não programado para terça-feira."}     
                      style={
                        routinesArray[id].days[3]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      T
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[4]
                        ?  "Alarme programado para quarta-feira." : "Alarme não programado para quarta-feira."}     
                      style={
                        routinesArray[id].days[4]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                       }
                    >
                      Q
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[5]
                        ?  "Alarme programado para quinta-feira." : "Alarme não programado para quinta-feira."}     
                      style={
                        routinesArray[id].days[5]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                       }
                    >
                      Q
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[6]
                        ?  "Alarme programado para sexta-feira." : "Alarme não programado para sexta-feira."}     
                      style={
                        routinesArray[id].days[6]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
                      }
                    >
                      S
                    </Text>
                    <Text
                      accessible={true}
                      accessibilityLabel={ routinesArray[id].days[0]
                        ?  "Alarme programado para sábado." : "Alarme não programado para sábado."}     
                      style={
                        routinesArray[id].days[0]
                        ? dark_mode ? [dark_styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] : [styles.normalText, {fontFamily: 'GothamMedium',color: CONST.mainBlue, marginRight: 5, marginLeft: 5}] 
                        : [dark_mode ? dark_styles.normalText : styles.normalText, {marginRight: 5, marginLeft: 5}]
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
