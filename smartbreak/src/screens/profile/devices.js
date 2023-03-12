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
  const [type05, setType05] = useState(false);
  const [type06, setType06] = useState(false);
  const [type07, setType07] = useState(false);
  const [type08, setType08] = useState(false);
  const [type09, setType09] = useState(false);
  const [type10, setType10] = useState(false);
  const [type11, setType11] = useState(false);
  const [type12, setType12] = useState(false);
  const [type13, setType13] = useState(false);
  const arrayTypes = [
    setType01,
    setType02,
    setType03,
    setType05,
    setType06,
    setType07,
    setType08,
    setType09,
    setType10,
    setType11,
    setType12,
    setType13,
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
      return <Printer color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Camera") {
      return <Camera color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Headphone") {
      return <Headphone color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Mobile") {
      return <Mobile color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Keyboard") {
      return <Keyboard color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Mouse") {
      return <Mouse color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Call") {
      return <Call color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Electricity") {
      return <Electricity color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "MonitorMobbile") {
      return <MonitorMobbile color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Headphones") {
      return <Headphones color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Lamp") {
      return <Lamp color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "TableLamp") {
      return <TableLamp color={CONST.darkerColor}variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Video") {
      return <Video color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Monitor") {
      return <Monitor color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
    }
    if (text == "Microphone2") {
      return <Microphone2 color={CONST.darkerColor} variant="Bold" style={styles.boxIcon} />;
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
    let nameType2 = ""
    switch (nameType) {
      case "Printer":
        nameType2 = "Impressora";
        break;
      case "Camera":
        nameType2 = "Câmera";
        break;
      case "Headphone":
        nameType2 = "Fones de Ouvido";
        break;
      case "Mobile":
        nameType2 = "Tablet";
        break;
      case "Keyboard":
        nameType2 = "Teclado";
        break;
      case "Mouse":
        nameType2 = "Rato";
        break;
      case "Call":
        nameType2 = "Telemóvel";
        break;
      case "Electricity":
        nameType2 = "Tomada";
        break;
      case "MonitorMobbile":
        nameType2 = "Monitor";
        break;
      case "Lamp":
        nameType2 = "Lâmpada";
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
      case "Microphone2":
        nameType2 = "Microfone";
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
    arrayTypes.forEach(function (x) {
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
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Tipo. Em baixo segue-se 12 botões alinhados em 3 filas de 4 colunas para selecionar o tipo de dispositivo que pretende adicionar."  
              style={[styles.normalText, {marginBottom: CONST.inputPadding}]}>Tipo</Text>
            <View style={{ flexDirection: "row",  justifyContent: 'space-around' }}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma câmara na cor preta."    
                onPress={() => typePressed(type01, setType01, "Video")}
                style={
                  type01
                    ? styles.modalDeviceTypeButtonPressed
                    : styles.modalDeviceTypeButton
                }
              >
                <Video size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um computador na cor preta."    
                onPress={() => typePressed(type02, setType02, "Monitor")}
                style={
                  type02
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Monitor size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um monitor na cor preta."    
                onPress={() => typePressed(type03, setType03, "MonitorMobbile")}
                style={
                  type03
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <MonitorMobbile size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um tablet na cor preta."    
                onPress={() => typePressed(type05, setType05, "Mobile")}
                style={
                  type05
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Mobile size={24} color={CONST.darkerColor} />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>  
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma impressora na cor preta."    
                onPress={() => typePressed(type06, setType06, "Printer")}
                style={
                  type06
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Printer size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um telefone na cor preta."    
                onPress={() => typePressed(type07, setType07, "Call")}
                style={
                  type07
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Call size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um microfone na cor preta."    
                onPress={() => typePressed(type08, setType08, "Microphone2")}
                style={
                  type08
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Microphone2 size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um rato portátil na cor preta."    
                onPress={() => typePressed(type09, setType09, "Mouse")}
                style={
                  type09
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Mouse size={24} color={CONST.darkerColor} />
              </Pressable> 
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around'}}>  
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de um teclado na cor preta."    
                onPress={() => typePressed(type10, setType10, "Keyboard")}
                style={
                  type10
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Keyboard size={24} color={CONST.darkerColor} />
              </Pressable>
           <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uns auscutadores na cor preta."    
                onPress={() => typePressed(type11, setType11, "Headphone")}
                style={
                  type11
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Headphone size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com o icon de uma tomada na cor preta."    
                onPress={() => typePressed(type12, setType12, "Electricity")}
                style={
                  type12
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <Electricity size={24} color={CONST.darkerColor} />
              </Pressable>
              <Pressable
                onPress={() => typePressed(type13, setType13, "TableLamp")}
                style={
                  type13
                  ? styles.modalDeviceTypeButtonPressed
                  : styles.modalDeviceTypeButton
                }
              >
                <TableLamp size={24} color={CONST.darkerColor} />
              </Pressable>
            </View>
            <View style={{ flexDirection: "column"}}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Nome. Em baixo segue-se um campo para introdução do nome do equipamento que pretende adicionar."  
              style={[styles.normalText, {marginBottom: CONST.inputPadding}]}>{"\n"}Nome</Text>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução do Nome do equipamento."  
                style={styles.inputField}
                onChangeText={(text) => setAddName(text)}
                value={addName}
              />
            </View>
            <View style={{ flexDirection: "column"}}>
            <Text 
              accessible={true}
              accessibilityLabel="Texto na cor preta num fundo branco escrito Consumo. Em baixo segue-se um campo de preenchimento opcional para introdução do consumo em watts do equipamento que pretende adicionar."  
              style={[styles.normalText, {marginBottom: CONST.inputPadding}]}>
                Consumo{" "}
                <Text style={{ fontFamily: "GothamBook" }}>(Opcional)</Text>
              </Text>
              <TextInput
                accessible={true}
                accessibilityLabel="Campo para introdução do Consumo do equipamento."  
                style={styles.inputField}
                onChangeText={(text) => setAddEnergy(text)}
                value={addEnergy}
              />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
              <Pressable
                accessible={true}
                accessibilityLabel="Botão da cor branca com uma borda laranja num fundo branco com o objetivo de cancelar a adição do equipamento. Tem escrito na cor laranja a palavra Cancelar."    
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
              <Pressable 
                accessible={true}
                accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de adicionar o equipamento configurado. Tem escrito na cor branca a palavra Adicionar."  
                onPress={() => addDevice()} 
                style={styles.smallPrimaryButton}>
                <Text style={styles.smallPrimaryButtonText}>
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
            accessibilityLabel="Botão da cor azul escura num fundo branco com o objetivo de Adicionar um novo equipamento. Tem escrito na cor branca a frase Adicionar equipamento e está acompanhado por um icon redondo com o símbolo de mais. Ao clicar nele abrirá um modal branco com três campos de preenchimento para registo de um dispositivo."
            style={styles.primaryButton}
            onPress={() => { setModalVisible(true); }}
            underlayColor={"transparent"} >
            <Text style={[styles.primaryButtonText, {paddingLeft: CONST.textPadding}]}>Adicionar equipamento</Text>
            <AddCircle
              color={CONST.whiteText}
              variant="Bold"
              style={{marginLeft: "auto", marginRight: CONST.iconPadding}}
              onPress={() => { setModalVisible(true);}}
            />
          </Pressable>
          
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor cinza num fundo branco escrito Clique continuamente nos seus equipamentos se os desejar eliminar." 
            style={[styles.smallText, {opacity: 0.5, paddingBottom: CONST.textPadding}]}>
            Clique continuamente nos seus equipamentos se os desejar eliminar.
          </Text>
        </ScrollView>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{marginBottom: CONST.textPadding }}>
          {devicesArray &&
            devicesArray.length > 0 &&
            devicesArray.map((callbackfn, id) => (
              <Pressable
                accessible={true}
                accessibilityLabel="Botão transparente com texto na cor preta num fundo branco com a denominação do dispositivo. Ao pressionar continuamente irá ativar um alerta que lhe pergunta se tem a certeza que deseja eliminar o equipamento."
                key={id}
                style={longPress ? styles.boxOptionsPressed : styles.boxOptions}
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
                <Text 
                  accessible={true}
                  accessibilityLabel={devicesArray[id].name}
                  style={styles.normalText}> {devicesArray[id].name} </Text>
                <Switch
                  accessible={true}
                  accessibilityLabel={devicesArray[id].using ?  "Dispositivo em uso." : "Dispositivo desativado."}     
                  style={{ marginLeft: "auto", marginRight: CONST.iconPadding }}
                  trackColor={{ false: CONST.switchOffColor, true: CONST.switchOnColor }}
                  thumbColor={devicesArray[id].using ? CONST.switchIndicatorColor : CONST.mainBlue}
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
      </View>
    </SafeAreaProvider>
  );
}
