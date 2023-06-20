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
  Monitor,
  Video,
  AddCircle,
} from "iconsax-react-native";

// Firebase
import firebase from "./../../config/firebase.js";

// Font Gotham
import { useFonts } from "expo-font";

// Variables
import * as CONST from "./../../styles/variables.js";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";


export default function Devices({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });


  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]

  const [devicesEnergy, setDevicesEnergy] = useState({
    "Video" : 0.15,
    "Monitor" : 0.2,
    "Mobile" : 0.02,
    "Printer" : 0.06,
    "Call" : 0.005,
    "Headphone" : 0.002,
    "TableLamp" : 0.03,
    "Eletricity" : 0.5,
  })

  const [devicesArray, setDevicesArray] = useState([])
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
  const arrayTypes = [
    setType01,
    setType02,
    setType03,
    setType04,
    setType05,
    setType06,
    setType07,
    setType08,
  ];
  const [addType, setAddType] = useState(null);
  const [addName, setAddName] = useState("");
  const [addEnergy, setAddEnergy] = useState("");

  const [longPress, setLongPress] = useState(false);
  const [reload, setReload] = useState(false);

  const whichIcon = (text) => {
    if (text == "Printer") {
      return <Printer color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Headphone") {
      return <Headphone color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Mobile") {
      return <Mobile color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Call") {
      return <Call color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Electricity") {
      return <Electricity color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "TableLamp") {
      return <TableLamp color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Video") {
      return <Video color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
    if (text == "Monitor") {
      return <Monitor color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} variant="Bold" style={dark_mode ? dark_styles.boxIcon : styles.boxIcon} />;
    }
  };

  const typePressed = (type, changeType, nameType) => {
    /*
    create a switch that gives nameType custom names 
    */
    let nameType2 = ""
    switch (nameType) {
      case "Printer":
        nameType2 = "Impressora/Scanner";
        break;
      case "Headphone":
        nameType2 = "Fones de Ouvido";
        break;
      case "Mobile":
        nameType2 = "Tablet/Telemóvel";
        break;
      case "Call":
        nameType2 = "Telefone/Fax";
        break;
      case "Electricity":
        nameType2 = "Tomada/Outros equipamentos";
        break;
      case "TableLamp":
        nameType2 = "Lâmpada de Mesa";
        break;
      case "Video":
        nameType2 = "Vídeo";
        break;
      case "Monitor":
        nameType2 = "Computador";
        break;
      default:
        nameType2;
        break;
    }

    if (type) {
      changeType(false);
      setAddType(null);
    } else {
      changeType(true);
      setAddType(nameType);
      ToastAndroid.show(
        "Dispositivo: " + nameType2 + " escolhido!",
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
    setAddEnergy(0)
    setAddType(null);
    arrayTypes.forEach(function (x) {
      x(false);
    });
  };

 
  const addDevice = async () => {
    const initialState = true
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
    if (addEnergy == "") {
      Alert.alert("NÃO MUDEI", addEnergy)
      console.log(devicesEnergy[addType]);
setAddEnergy(devicesEnergy[addType]);
    } else {
      if (!/^\d+$/.test(addEnergy)) {
            Alert.alert(
              "Atenção!",
              "Preencha corretamente o campo Consumo com o consumo do seu equipamento por dia. Introduza apenas números."
            );
            return false;
          }
    }  
      try {
      const response = await fetch("https://sb-api.herokuapp.com/devices/", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + userData.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: addName,
          energy: addEnergy,
          type: addType,
          state: initialState,
          user: userData.userID
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

    ToastAndroid.show("Equipamento adicionado!", ToastAndroid.SHORT);
    
    setModalVisible(!modalVisible);
    clearFields();
    };

  async function deleteDevice(id) {
    try {
      const response = await fetch("https://sb-api.herokuapp.com/devices/" + id, {
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

  
  useEffect(() => {
    setReload(false)
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/devices/user/" + userData.userID, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDevicesArray(data.message);
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
    // console.log(devicesArray)
  }, [userData, reload]);


  async function updateStatus(status, id) {
    try {
      const response = await fetch("https://sb-api.herokuapp.com/devices/" + id, {
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
          "Estado do equipamento alterado!",
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
            <Text
              accessible={true}
              accessibilityLabel="Texto escrito Tipo. Em baixo segue-se 8 botões alinhados em 2 filas de 4 colunas para selecionar o tipo de equipamento que pretende adicionar."
              style={[dark_mode ? dark_styles.normalText : styles.normalText, { marginBottom: CONST.inputPadding }]}>Tipo</Text>
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma câmara."
                onPress={() => typePressed(type01, setType01, "Video")}
                style={
                  type01
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Video size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um computador."
                onPress={() => typePressed(type02, setType02, "Monitor")}
                style={
                  type02
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Monitor size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um tablet."
                onPress={() => typePressed(type03, setType03, "Mobile")}
                style={
                  type03
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Mobile size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma impressora."
                onPress={() => typePressed(type04, setType04, "Printer")}
                style={
                  type04
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Printer size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um telefone."
                onPress={() => typePressed(type05, setType05, "Call")}
                style={
                  type05
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Call size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uns auscutadores."
                onPress={() => typePressed(type06, setType06, "Headphone")}
                style={
                  type06
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Headphone size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type07, setType07, "TableLamp")}
                style={
                  type07
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <TableLamp size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma tomada."
                onPress={() => typePressed(type08, setType08, "Electricity")}
                style={
                  type08
                    ? dark_mode ? dark_styles.modalDeviceTypeButtonPressed : styles.modalDeviceTypeButtonPressed
                    : dark_mode ? dark_styles.modalDeviceTypeButton : styles.modalDeviceTypeButton
                }
              >
                <Electricity size={24} color={dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor} />
              </Pressable>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor preta num fundo branco escrito Nome. Em baixo segue-se um campo para introdução do nome do equipamento que pretende adicionar."
                style={[dark_mode ? dark_styles.normalText : styles.normalText, { marginBottom: CONST.inputPadding }]}>{"\n"}Nome</Text>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução do Nome do equipamento."
                style={dark_mode ? dark_styles.inputField : styles.inputField}
                onChangeText={(text) => setAddName(text)}
                value={addName}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor preta num fundo branco escrito Consumo. Em baixo segue-se um campo de preenchimento opcional para introdução do consumo em watts do equipamento que pretende adicionar."
                style={[dark_mode ? dark_styles.normalText : styles.normalText, { marginBottom: CONST.inputPadding }]}>
                Consumo kwh{" "}
                <Text style={{ fontFamily: "GothamBook" }}>(Opcional)</Text>
              </Text>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução do Consumo do equipamento."
                style={dark_mode ? dark_styles.inputField : styles.inputField}
                onChangeText={(text) => setAddEnergy(text)}
                value={addEnergy}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão com o objetivo de cancelar a adição do equipamento. Tem escrito na cor laranja a palavra Cancelar."
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
                accessibilityLabel="Botão com o objetivo de adicionar o equipamento configurado. Tem escrito na cor branca a palavra Adicionar."
                onPress={() =>{ 
                  addDevice() 
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
      <View style={{ flexDirection: 'column' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Pressable
            accessible={true}
            accessibilityLabel="Botão com o objetivo de Adicionar um novo equipamento. Tem escrito na cor branca a frase Adicionar equipamento e está acompanhado por um icon redondo com o símbolo de mais. Ao clicar nele abrirá um modal branco com três campos de preenchimento para registo de um dispositivo."
            style={dark_mode ? dark_styles.primaryButton : styles.primaryButton}
            onPress={() => { setModalVisible(true); }}
            underlayColor={"transparent"} >
            <Text style={[dark_mode ? dark_styles.primaryButtonText : styles.primaryButtonText, { paddingLeft: CONST.textPadding }]}>Adicionar equipamento</Text>
            <AddCircle
              color={dark_mode ? CONST.darkerColor : CONST.whiteText}
              variant="Bold"
              style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
              onPress={() => { setModalVisible(true); }}
            />
          </Pressable>

          <Text
            accessible={true}
            accessibilityLabel="Texto na cor cinza num fundo branco escrito Clique continuamente nos seus equipamentos se os desejar eliminar."
            style={[dark_mode ? dark_styles.smallText : styles.smallText, { opacity: 0.5, paddingBottom: CONST.textPadding }]}>
            Clique continuamente nos seus equipamentos se os desejar eliminar.
          </Text>
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: CONST.backgroundPaddingTop*5, marginTop: 5}}>
          {devicesArray &&
            devicesArray.length > 0 &&
            devicesArray.map((callbackfn, id) => (
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com texto na cor preta num fundo branco com a denominação do dispositivo. Ao pressionar continuamente irá ativar um alerta que lhe pergunta se tem a certeza que deseja eliminar o equipamento."
                key={devicesArray[id]._id}
                style={longPress ? dark_mode ? dark_styles.boxOptionsPressed : styles.boxOptionsPressed :
                  dark_mode ? dark_styles.boxOptions : styles.boxOptions}
                onLongPress={() => {
                  setLongPress(true);
                  Alert.alert(
                    "Atenção",
                    "Tem a certeza que deseja eliminar o equipamento?",
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
                          deleteDevice(devicesArray[id]._id)
                          setReload(true);
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
                <Text
                  accessible={true}
                  accessibilityLabel={devicesArray[id].name}
                  style={dark_mode ? dark_styles.normalText : styles.normalText}> {devicesArray[id].name} </Text>
                <Switch
                  accessible={true}
                  accessibilityLabel={devicesArray[id].state ? "Dispositivo em uso." : "Dispositivo desativado."}
                  style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
                  thumbColor={devicesArray[id].state ? CONST.switchIndicatorColor : dark_mode ? CONST.lightBlue : CONST.mainBlue}
                  trackColor={{ false: CONST.switchOffColor, true: dark_mode ? CONST.lightBlue : CONST.switchOnColor }}
                  value={devicesArray[id].state}
                  onValueChange={() => {
                    updateStatus(!devicesArray[id].state, devicesArray[id]._id)
                  }}
                />
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}
