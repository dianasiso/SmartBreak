import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { Alert } from "react-native";
import {
RefreshControl,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  
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
    AddCircle
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
  useEffect(() => {}, [userData]);

  const [refreshing, setRefreshing] = useState(false);
 
  const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
    }, 2000);
  }, []);

  const [devicesArray, setDevices] = useState()
  const uid = userData; // Posteriormente pegar da navegation
  const [, updateState] = useState();  
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    firebase.firestore().collection("users_devices").doc(uid).get().then((doc) => {
        // console.log("From firebase: ", doc.data().devices)
        setDevices([... doc.data().devices])
        // console.log("Devices:", devices)
    })
  }, []);

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  const deleteDevice = () => {
    Alert.alert("Atenção", "Deseja apagar este dispositivo permanentemente?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => {
          // TODO: delete
        },
      },
    ]);
  }

  const whichIcon = (text) => {
    if (text == "Printer") {
      return (<Printer color="#000000"/> )
    }
    if (text == "Camera") {
      return (<Camera color="#000000"/> )
    }
    if (text == "Headphone") {
      return (<Headphone color="#000000"/> )
    }
    if (text == "Mobile") {
      return (<Mobile color="#000000"/> )
    }
    if (text == "Keyboard") {
      return (<Keyboard color="#000000"/> )
    }
    if (text == "Mouse") {
      return (<Mouse color="#000000"/> )
    }
    if (text == "Call") {
      return (<Call color="#000000"/> )
    }
    if (text == "Electricity") {
      return (<Electricity color="#000000"/> )
    }
    if (text == "MonitorMobbile") {
      return (<MonitorMobbile color="#000000"/> )
    }
    if (text == "Headphones") {
      return (<Headphones color="#000000"/> )
    }
    if (text == "Lamp") {
      return (<Lamp color="#000000"/> )
    }
    if (text == "TableLamp") {
      return (<TableLamp color="#000000"/> )
    }
    if (text == "Video") {
      return (<Video color="#000000"/> )
    }
    if (text == "Monitor") {
      return (<Monitor color="#000000"/> )
    }
    if (text == 'MirroringScreen') {
      return (<MirroringScreen color="#000000"/> )

    }
    if (text == 'Microphone2') {
      return (<Microphone2 color="#000000"/> )
    }
  }

return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.button}>
          <TouchableHighlight underlayColor={"transparent"}>
            <Text style={styles.textButton}>Adicionar equipamento</Text>
          </TouchableHighlight>
          <AddCircle color="#FFF" variant="Bold" style={{alignSelf: "center", marginLeft: 'auto', marginRight: 25}} onPress={() => navigation.navigate("EditPassword")} />
        </View>
      </ScrollView>
      <ScrollView style={{marginTop: 'auto'}}> 
      
      {devicesArray && devicesArray.map((callbackfn, id) => (
        <View style={styles.options}>
          {whichIcon(devicesArray[id].type)}
          <TouchableOpacity activeOpacity={0.8}  onLongPress={(() => {console.log("ai fui pressionado")})}  underlayColor={"transparent"} >
            <Text style={styles.text}>  {devicesArray[id].name} </Text>
          </TouchableOpacity>
          <Switch
            style={{marginLeft: 'auto', marginRight: 25}}
            trackColor={{ false: "#BBBABA", true: "#0051BA" }}
            thumbColor={devicesArray[id].using ? '#E3ECF7' : '#0051ba'}
            value={devicesArray[id].using}
            onValueChange={(() => {
              devicesArray[id] = {
                energy : devicesArray[id].energy,
                name : devicesArray[id].name,
                id :  devicesArray[id].id, 
                type : devicesArray[id].type,
                using : !devicesArray[id].using,
              };
              firebase.firestore().collection('users_devices').doc(uid).update({
                devices : devicesArray
              })
              console.log("dev", devicesArray[id])
              forceUpdate()
            })}
            />
        </View>
      ))}

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
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
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
    textAlign: 'left',
    backgroundColor: "#0051ba",
  },

  textButton: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    color: '#FFF'
  },
});
