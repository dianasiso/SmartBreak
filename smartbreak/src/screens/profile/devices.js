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
  TextInput,
  ToastAndroid,
  Switch,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Camera,
  TableLamp,
  Lamp,
  Printer,
  Microphone2,
  Headphone,
  Headphones,
  Call,
  MonitorMobbile,
  Electricity,
  Keyboard,
  Mouse,
  Mobile,
  MirroringScreen,
  Monitor,
  Video,
  AddCircle,
} from "iconsax-react-native";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

export default function Devices({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user.userID);
  useEffect(() => {
    try {
      firebase
        .firestore()
        .collection("users_devices")
        .doc(uid)
        .get()
        .then((doc) => {
          // console.log("From firebase: ", doc.data().devices)
          setDevices([...doc.data().devices]);
          // console.log("Devices:", devices)
        });
    } catch {
      setDevices([]);
    }
  }, [userData]);

  // Var modal
  const [modalVisible, setModalVisible] = useState(false);
  const [type01, setType01] = useState(false);
  const [type02, setType02] = useState(false);
  const [type03, setType03] = useState(false);
  const [type04, setType04] = useState(false);
  const [type05, setType05] = useState(false);
  const [type06, setType06] = useState(false);
  const [type07, setType07] = useState(false);
  const [type08, setType08] = useState(false);
  const [type09, setType09] = useState(false);
  const [type10, setType10] = useState(false);
  const [type11, setType11] = useState(false);
  const [type12, setType12] = useState(false);
  const [type13, setType13] = useState(false);
  const [type14, setType14] = useState(false);
  const arrayTypes = [
    setType01,
    setType02,
    setType03,
    setType04,
    setType05,
    setType06,
    setType07,
    setType08,
    setType09,
    setType10,
    setType11,
    setType12,
    setType13,
    setType14,
  ];
  const [addType, setAddType] = useState(null);
  const [addName, setAddName] = useState("");
  const [addEnergy, setAddEnergy] = useState(0);

  const [devicesArray, setDevices] = useState([]);
  const uid = userData; // Posteriormente pegar da navegation
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [longPress, setLongPress] = useState(false);

  const whichIcon = (text) => {
    if (text == "Printer") {
      return <Printer color="#000000" />;
    }
    if (text == "Camera") {
      return <Camera color="#000000" />;
    }
    if (text == "Headphone") {
      return <Headphone color="#000000" />;
    }
    if (text == "Mobile") {
      return <Mobile color="#000000" />;
    }
    if (text == "Keyboard") {
      return <Keyboard color="#000000" />;
    }
    if (text == "Mouse") {
      return <Mouse color="#000000" />;
    }
    if (text == "Call") {
      return <Call color="#000000" />;
    }
    if (text == "Electricity") {
      return <Electricity color="#000000" />;
    }
    if (text == "MonitorMobbile") {
      return <MonitorMobbile color="#000000" />;
    }
    if (text == "Headphones") {
      return <Headphones color="#000000" />;
    }
    if (text == "Lamp") {
      return <Lamp color="#000000" />;
    }
    if (text == "TableLamp") {
      return <TableLamp color="#000000" />;
    }
    if (text == "Video") {
      return <Video color="#000000" />;
    }
    if (text == "Monitor") {
      return <Monitor color="#000000" />;
    }
    if (text == "MirroringScreen") {
      return <MirroringScreen color="#000000" />;
    }
    if (text == "Microphone2") {
      return <Microphone2 color="#000000" />;
    }
  };

  const checkId = () => {
    for (let i = 0; i < devicesArray.length; i++) {
      devicesArray[i] = {
        energy: devicesArray[i].energy,
        name: devicesArray[i].name,
        id: i,
        type: devicesArray[i].type,
        using: devicesArray[i].using,
      };
    }
    firebase.firestore().collection("users_devices").doc(uid).update({
      devices: devicesArray,
    });
  };

  const typePressed = (type, changeType, nameType) => {
    /*
    create a switch that gives nameType custom names 
    */
    const [nameType2, setNameType2] = useState("");

    switch (nameType) {
      case "Printer":
        setNameType2("Impressora");
        break;
      case "Camera":
        setNameType2("Câmera");
        break;
      case "Headphone":
        setNameType2("Fones de Ouvido");
        break;
      case "Mobile":
        setNameType2("Telemóvel");
        break;
      case "Keyboard":
        setNameType2("Teclado");
        break;
      case "Mouse":
        setNameType2("Rato");
        break;
      case "Call":
        setNameType2("Telefone");
        break;
      case "Electricity":
        setNameType2("Tomada");
        break;
      case "MonitorMobbile":
        setNameType2("Ecrã Móvel");
        break;
      case "Lamp":
        setNameType2("Lâmpada");
        break;
      case "TableLamp":
        setNameType2("Lâmpada de Mesa");
        break;
      case "Video":
        setNameType2("Vídeo");
        break;
      case "Monitor":
        setNameType2("Monitor");
        break;
      case "MirroringScreen":
        setNameType2("Ecrã Espelhado");
        break;
      case "Microphone2":
        setNameType2("Microfone");
        break;
      default:
        nameType;
        break;
    }

    if (type) {
      changeType(false);
      setAddType(null);
    } else {
      changeType(true);
      setAddType(nameType);
      ToastAndroid.show(
        "Dispositivo: " + nameType + " escolhido!",
        ToastAndroid.SHORT
      );
    }
    arrayTypes.forEach(function (x) {
      if (x !== changeType) {
        x(false);
      }
    });
  };

  const clearFields = () => {
    setAddName("");
    setAddEnergy(0);
    setAddType(null);
    ~arrayTypes.forEach(function (x) {
      x(false);
    });
  };

  const addDevice = () => {
    checkId();
    if (addType == null) {
      Alert.alert(
        "Atenção!",
        "Preencha corretamente o campo Tipo com o ícone que melhor represente o equipamento que pretende adicionar."
      );
      return false;
    }
    if (addName === "") {
      Alert.alert(
        "Atenção!",
        "Preencha corretamente o campo Nome com a denominação que deseja atribuir ao seu equipamento."
      );
      return false;
    }
    if (!/^\d+$/.test(addEnergy)) {
      Alert.alert(
        "Atenção!",
        "Preencha corretamente o campo Consumo com o consumo do seu equipamento por dia. Introduza apenas números."
      );
      return false;
    }
    devicesArray.push({
      name: addName,
      energy: addEnergy,
      id: devicesArray.length,
      type: addType,
      using: true,
    });

    firebase.firestore().collection("users_devices").doc(uid).update({
      devices: devicesArray,
    });
    ToastAndroid.show("Equipamento adicionado!", ToastAndroid.SHORT);
    setModalVisible(!modalVisible);
    clearFields();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tipo</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Pressable
                onPress={() => typePressed(type01, setType01, "Video")}
                style={
                  type01
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Video size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type02, setType02, "Monitor")}
                style={
                  type02
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Monitor size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type03, setType03, "MonitorMobbile")}
                style={
                  type03
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <MonitorMobbile size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() =>
                  typePressed(type04, setType04, "MirroringScreen")
                }
                style={
                  type04
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <MirroringScreen size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type05, setType05, "Mobile")}
                style={
                  type05
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Mobile size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type06, setType06, "Printer")}
                style={
                  type06
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Printer size={24} color="#000000" />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Pressable
                onPress={() => typePressed(type07, setType07, "Call")}
                style={
                  type07
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Call size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type08, setType08, "Microphone2")}
                style={
                  type08
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Microphone2 size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type09, setType09, "Mouse")}
                style={
                  type09
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Mouse size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type10, setType10, "Keyboard")}
                style={
                  type10
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Keyboard size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type11, setType11, "Headphone")}
                style={
                  type11
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Headphone size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type12, setType12, "Electricity")}
                style={
                  type12
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Electricity size={24} color="#000000" />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 30 }}>
              <Pressable
                onPress={() => typePressed(type13, setType13, "TableLamp")}
                style={
                  type13
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <TableLamp size={24} color="#000000" />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type14, setType14, "Lamp")}
                style={
                  type14
                    ? styles.modalTypeButtonPressed
                    : styles.modalTypeButton
                }
              >
                <Lamp size={24} color="#000000" />
              </Pressable>
            </View>
            <View style={{ flexDirection: "column", marginBottom: 30 }}>
              <Text style={styles.modalText}>Nome</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={(text) => setAddName(text)}
                value={addName}
              />
            </View>
            <View style={{ flexDirection: "column", marginBottom: 30 }}>
              <Text style={styles.modalText}>
                Consumo{" "}
                <Text style={{ fontFamily: "GothamBook" }}>(Opcional)</Text>
              </Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={(text) => setAddEnergy(text)}
                value={addEnergy}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                  clearFields();
                }}
                style={{ padding: 10, marginRight: 10 }}
              >
                <Text style={{ color: "#0051ba", fontFamily: "GothamMedium" }}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable onPress={() => addDevice()} style={styles.buttonAdd}>
                <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                  Adicionar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <Pressable
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
          underlayColor={"transparent"}
        >
          <Text style={styles.textButton}>Adicionar equipamento</Text>
          <AddCircle
            color="#FFF"
            variant="Bold"
            style={{ alignSelf: "center", marginLeft: "auto", marginRight: 25 }}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </Pressable>
        <Text style={{ color: "grey", fontSize:14, fontFamily:"GothamBook", lineHeight:18}}>
          Clique continuamente nos seus equipamentos se os desejar eliminar
        </Text>
      </ScrollView>
      <ScrollView style={{ marginTop: 20, marginBottom: 10 }}>
        {devicesArray &&
          devicesArray.length > 0 &&
          devicesArray.map((callbackfn, id) => (
            <Pressable
              key={id}
              style={longPress ? styles.optionsPressed : styles.options}
              onLongPress={() => {
                setLongPress(true);
                Alert.alert(
                  "Atenção",
                  "Tem a certeza que deseja eliminar o equipamento?",
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
                        const arrTemp = devicesArray.filter(
                          (item) => item.id !== devicesArray[id].id
                        );
                        setDevices([...arrTemp]);
                        firebase
                          .firestore()
                          .collection("users_devices")
                          .doc(uid)
                          .update({
                            devices: arrTemp,
                          });
                        ToastAndroid.show(
                          "Equipamento eliminado!",
                          ToastAndroid.SHORT
                        );
                      },
                    },
                  ]
                );
              }}
            >
              {whichIcon(devicesArray[id].type)}
              <Text style={styles.text}> {devicesArray[id].name} </Text>
              <Switch
                style={{ marginLeft: "auto", marginRight: 25 }}
                trackColor={{ false: "#BBBABA", true: "#0051BA" }}
                thumbColor={devicesArray[id].using ? "#FFF" : "#0051ba"}
                value={devicesArray[id].using}
                onValueChange={() => {
                  devicesArray[id] = {
                    energy: devicesArray[id].energy,
                    name: devicesArray[id].name,
                    id: devicesArray[id].id,
                    type: devicesArray[id].type,
                    using: !devicesArray[id].using,
                  };
                  firebase
                    .firestore()
                    .collection("users_devices")
                    .doc(uid)
                    .update({
                      devices: devicesArray,
                    });

                  ToastAndroid.show(
                    "Estado do equipamento alterado!",
                    ToastAndroid.SHORT
                  );
                  forceUpdate();
                }}
              />
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
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
    textAlign: "left",
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
    textAlign: "left",
    backgroundColor: "#d2dbe6",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
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
    textAlign: "left",
    backgroundColor: "#0051ba",
  },

  textButton: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    color: "#FFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  modalText: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 0,
  },
  modalTypeButton: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTypeButtonPressed: {
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#0051ba",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
});
