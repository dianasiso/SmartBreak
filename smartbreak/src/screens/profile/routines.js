import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { Alert } from "react-native";
import {
  Modal,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Switch,
  Pressable,
  
} from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    AddCircle
  } from "iconsax-react-native";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

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
  const arrayDays = [setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday, setSunday];

  const [hours, setHours] = useState([
    {label: '00 horas', value: '00'}, {label: '01 horas', value: '01'}, {label: '02 horas', value: '02'}, {label: '03 horas', value: '03'}, {label: '04 horas', value: '04'}, {label: '05 horas', value: '05'},
    {label: '06 horas', value: '06'}, {label: '07 horas', value: '07'}, {label: '08 horas', value: '08'}, {label: '09 horas', value: '09'}, {label: '10 horas', value: '10'}, {label: '11 horas', value: '11'},
    {label: '12 horas', value: '12'}, {label: '13 horas', value: '13'}, {label: '14 horas', value: '14'}, {label: '15 horas', value: '15'}, {label: '16 horas', value: '16'}, {label: '17 horas', value: '17'},
    {label: '18 horas', value: '18'}, {label: '19 horas', value: '19'}, {label: '20 horas', value: '20'}, {label: '21 horas', value: '21'}, {label: '22 horas', value: '22'}, {label: '23 horas', value: '23'},
  ]);

  const [minutes, setMinutes] = useState([
    {label: '00 minutos', value: '00'}, {label: '01 minutos', value: '01'}, {label: '02 minutos', value: '02'}, {label: '03 minutos', value: '03'}, {label: '04 minutos', value: '04'}, {label: '05 minutos', value: '05'},
    {label: '06 minutos', value: '06'}, {label: '07 minutos', value: '07'}, {label: '08 minutos', value: '08'}, {label: '09 minutos', value: '09'}, {label: '10 minutos', value: '10'}, {label: '11 minutos', value: '11'},
    {label: '12 minutos', value: '12'}, {label: '13 minutos', value: '13'}, {label: '14 minutos', value: '14'}, {label: '15 minutos', value: '15'}, {label: '16 minutos', value: '16'}, {label: '17 minutos', value: '17'},
    {label: '18 minutos', value: '18'}, {label: '19 minutos', value: '19'}, {label: '20 minutos', value: '20'}, {label: '21 minutos', value: '21'}, {label: '22 minutos', value: '22'}, {label: '23 minutos', value: '23'},
    {label: '24 minutos', value: '24'}, {label: '25 minutos', value: '25'}, {label: '26 minutos', value: '26'}, {label: '27 minutos', value: '27'}, {label: '28 minutos', value: '28'}, {label: '29 minutos', value: '29'},
    {label: '30 minutos', value: '30'}, {label: '31 minutos', value: '31'}, {label: '32 minutos', value: '32'}, {label: '33 minutos', value: '33'}, {label: '34 minutos', value: '34'}, {label: '35 minutos', value: '35'},
    {label: '36 minutos', value: '36'}, {label: '37 minutos', value: '37'}, {label: '38 minutos', value: '38'}, {label: '39 minutos', value: '39'}, {label: '40 minutos', value: '40'}, {label: '41 minutos', value: '41'},
    {label: '42 minutos', value: '42'}, {label: '43 minutos', value: '43'}, {label: '44 minutos', value: '44'}, {label: '45 minutos', value: '45'}, {label: '46 minutos', value: '46'}, {label: '47 minutos', value: '47'},
    {label: '48 minutos', value: '48'}, {label: '49 minutos', value: '49'}, {label: '50 minutos', value: '50'}, {label: '51 minutos', value: '51'}, {label: '52 minutos', value: '52'}, {label: '53 minutos', value: '53'},
    {label: '54 minutos', value: '54'}, {label: '55 minutos', value: '55'}, {label: '56 minutos', value: '56'}, {label: '57 minutos', value: '57'}, {label: '58 minutos', value: '58'}, {label: '59 minutos', value: '59'},
    
  

  ]);


  const [routinesArray, setRoutines] = useState()
  const uid = userData;
  const [, updateState] = useState();  
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    firebase.firestore().collection("users_routines").doc(uid).get().then((doc) => {
      setRoutines([... doc.data().routines])
  })
  }, [userData]);

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  const checkId = () => {
    for (let i=0; i < routinesArray.length; i++) {
        routinesArray[i] = {
        end : routinesArray[i].end,
        start : routinesArray[i].start,
        id :  i, 
        using : routinesArray[i].using,
        days : routinesArray[i].days,
      }
    }    
    firebase.firestore().collection('users_routines').doc(uid).update({
      routines : routinesArray
    })
  }
  

  const clearFields = () => {
    setAddDays([]);
    setValueHoursStart("00");
    setValueMinutesStart("00");
    setValueHoursEnd("00");
    setValueMinutesEnd("00");
    arrayDays.forEach(function(x) {
        x(false);
    })
  }

  const addRoutine = () => {
    if (validateHours()) {
        checkId();
        daysToArray();

        routinesArray.push( {
            start : (valueHoursStart + ":" + valueMinutesStart),
            end : (valueHoursEnd + ":" + valueMinutesEnd),
            using : true,
            days : addDays,
            id :  routinesArray.length,
        })
    
        firebase.firestore().collection('users_routines').doc(uid).update({
        routines : routinesArray
        })
        ToastAndroid.show('Rotina adicionada!', ToastAndroid.SHORT);
        setModalVisible(!modalVisible);
        clearFields();
    }
  }

  const validateHours = () => {
    if (valueHoursStart > valueHoursEnd) {
        Alert.alert("Erro!", "A hora de início não pode ser posterior à hora de término.");
        return false;
    } else if (valueHoursStart == valueHoursEnd) {
        if (valueMinutesStart > valueMinutesEnd) {
            Alert.alert("Erro!", "A hora de início não pode ser posterior à hora de término.");
            return false;
        } else if (valueMinutesStart == valueMinutesEnd) {
            Alert.alert("Erro!", "As horas de início e de término não podem ser semelhantes.");
            return false;
        }
    }
    return true;
  }

  const dayPressed = (daySelected, changeDay) => {
    if (daySelected) {
        changeDay(false);
    } else {
        changeDay(true);
    }
  }

  const daysToArray = () => {
    addDays.push(saturday, sunday, monday, tuesday, wednesday, thursday, friday);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={{flexDirection: 'column', marginTop: 5}}>
                    <Text style={styles.modalText}>Hora de início</Text>
                     <View style={{width: '50%', marginBottom: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
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
                                textStyle={{ fontSize: 16 }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#D2DBE6",
                                    borderColor: '#000',
                                    fontFamily: 'GothamBook',
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
                                textStyle={{ fontSize: 16 }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#D2DBE6",
                                    borderColor: '#000',
                                    fontFamily: 'GothamBook',
                                    fontSize: 16
                                }}
                            />
                    </View>
                    <Text style={styles.modalText}>Hora de término</Text>
                    <View style={{width: '50%', marginBottom: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
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
                                textStyle={{ fontSize: 16 }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#D2DBE6",
                                    borderColor: '#000',
                                    fontFamily: 'GothamBook',
                                    fontSize: 16
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
                                textStyle={{ fontSize: 16 }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#D2DBE6",
                                    borderColor: '#000',
                                    fontFamily: 'GothamBook',
                                    fontSize: 16
                                }}
                            />
                    </View>
                    <Text style={styles.modalText}>Dias da semana</Text>
                    <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Pressable onPress={() => dayPressed(sunday, setSunday)} style={sunday ? styles.modalButtonDayPressed :styles.modalButtonDay}>
                            <Text style={styles.modalDay}>D</Text>
                        </Pressable> 
                        <Pressable onPress={() => dayPressed(monday, setMonday)} style={monday ? styles.modalButtonDayPressed :styles.modalButtonDay}>
                            <Text style={styles.modalDay}>S</Text>
                        </Pressable>
                        <Pressable onPress={() => dayPressed(tuesday, setTuesday)} style={tuesday ? styles.modalButtonDayPressed : styles.modalButtonDay}>
                            <Text style={styles.modalDay}>T</Text>
                        </Pressable>
                        <Pressable onPress={() => dayPressed(wednesday, setWednesday)} style={wednesday ? styles.modalButtonDayPressed : styles.modalButtonDay}>
                            <Text style={styles.modalDay}>Q</Text>
                        </Pressable>
                        <Pressable onPress={() => dayPressed(thursday, setThursday)} style={thursday ? styles.modalButtonDayPressed : styles.modalButtonDay}>
                            <Text style={styles.modalDay}>Q</Text>
                        </Pressable>
                        <Pressable onPress={() => dayPressed(friday, setFriday)} style={friday ? styles.modalButtonDayPressed : styles.modalButtonDay}>
                            <Text style={styles.modalDay}>S</Text>
                        </Pressable>
                        <Pressable onPress={() => dayPressed(saturday, setSaturday)} style={saturday ? styles.modalButtonDayPressed : styles.modalButtonDay}>
                            <Text style={styles.modalDay}>S</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <Pressable onPress={() => {
                        setModalVisible(!modalVisible)
                        clearFields();
                        }} style={{padding: 10, marginRight: 10}}>
                        <Text style={{color: "#0051ba", fontFamily: 'GothamMedium'}}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={() => addRoutine()} style={styles.buttonAdd}>
                        <Text style={{color: "#FFF", fontFamily: 'GothamMedium'}}>Adicionar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
      </Modal>
      <ScrollView>
      
      <Pressable style={styles.button} onPress={(() => {setModalVisible(true)})} underlayColor={"transparent"}>
        <Text style={styles.textButton}>Adicionar rotina</Text>
        <AddCircle color="#FFF" variant="Bold" style={{alignSelf: "center", marginLeft: 'auto', marginRight: 25}} onPress={(() => {setModalVisible(true)})} />
      </Pressable>
      </ScrollView>
      <ScrollView style={{marginTop: 20, marginBottom: 10}}> 
      {routinesArray && routinesArray.length > 0 && routinesArray.map((callbackfn, id) => (
        <Pressable style={longPress ? styles.optionsPressed : styles.options }  onLongPress={(() => {
          setLongPress(true);
          Alert.alert("Atenção", "Tem a certeza que deseja eliminar a rotina?", [
            { text: "Cancelar",
              onPress: () => {
                setLongPress(false)
              }
            },
            { text: "Confirmar",
              onPress: () => {
                setLongPress(false);
                const arrTemp = routinesArray.filter((item) => item.id !== routinesArray[id].id)
                setRoutines([... arrTemp]);
                firebase.firestore().collection('users_routines').doc(uid).update({
                  routines : arrTemp
                })
                ToastAndroid.show('Rotina eliminada!', ToastAndroid.SHORT);
              },
            },
          ]);            
        })}>
        <View style={{flexDirection: 'column', flex: 1, marginLeft: 'auto', marginRight: 'auto'}}>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', paddingBottom: 20}}>
                <Text style={styles.text}>{routinesArray[id].start} - {routinesArray[id].end}</Text>
                <Switch
                    style={{marginLeft: 'auto', marginRight: 25}}
                    trackColor={{ false: "#BBBABA", true: "#0051BA" }}
                    thumbColor={routinesArray[id].using ? '#FFF' : '#0051ba'}
                    value={routinesArray[id].using}
                    onValueChange={(() => {
                        routinesArray[id] = {
                        start : routinesArray[id].start,
                        end : routinesArray[id].end,
                        days :  routinesArray[id].days, 
                        using : !routinesArray[id].using,
                        id : routinesArray[id].id,
                    };
                    firebase.firestore().collection('users_routines').doc(uid).update({
                        routines : routinesArray
                    })
                    
                    ToastAndroid.show('Estado da rotina alterada!', ToastAndroid.SHORT);
                    forceUpdate()
                    })}
                    />  
                </View>
                <View style={{flexDirection: 'row', flex: 1, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                    <Text style={ routinesArray[id].days[1] ? styles.textDaysSelected : styles.textDays }>D</Text>
                    <Text style={ routinesArray[id].days[2] ? styles.textDaysSelected : styles.textDays }>S</Text>
                    <Text style={ routinesArray[id].days[3] ? styles.textDaysSelected : styles.textDays }>T</Text>
                    <Text style={ routinesArray[id].days[4] ? styles.textDaysSelected : styles.textDays }>Q</Text>
                    <Text style={ routinesArray[id].days[5] ? styles.textDaysSelected : styles.textDays }>Q</Text>
                    <Text style={ routinesArray[id].days[6] ? styles.textDaysSelected : styles.textDays }>S</Text>
                    <Text style={ routinesArray[id].days[0] ? styles.textDaysSelected : styles.textDays }>S</Text>
                </View>
        </View>    
        </Pressable>
        ))}

      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    paddingLeft: 25,
    width: screenWidth - 50, 
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
  },

  optionsPressed: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    width: screenWidth - 50, 
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'left',
    backgroundColor: "#d2dbe6",
  },

  text: {
    fontFamily: "GothamMedium",
    fontSize: 20,
  },

  textDays: {
    fontFamily: "GothamBook",
    fontSize: 14,
    color: '#000',
    marginLeft: 5,
    marginRight: 5,
  },

  textDaysSelected: {
    fontFamily: "GothamMedium",
    fontSize: 14,
    color: '#0051ba',
    marginLeft: 5,
    marginRight: 5,
  },

  button: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    width: screenWidth - 50, 
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: 'left',
    backgroundColor: "#0051ba",
  },

  textButton: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    color: '#FFF'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#E3ECF7',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  }, 
  modalText: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 0,
  },
  modalDay: {
    fontFamily: "GothamBook",
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 0,
  },
  modalTypeButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTypeButtonPressed: {
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalInput: {
    marginTop: 0,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
  buttonAdd: {
    backgroundColor: '#0051ba',
    paddingTop: 10,  
    paddingBottom: 10,  
    paddingLeft: 20, 
    paddingRight: 20, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginLeft: 10 
  },

  hoursPicker: {
    backgroundColor: 'transparent', 
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingBottom: 0,
    fontSize: 16,
    fontFamily: 'GothamBook'
  },

  modalButtonDay: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  modalButtonDayPressed: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
  }

});
