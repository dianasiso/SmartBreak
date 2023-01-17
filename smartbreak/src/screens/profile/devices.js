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
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Lock1,
  Notification,
  SecurityUser,
  DocumentText1,
  MessageQuestion,
  Trash,
  Logout,
    AddCircle
  } from "iconsax-react-native";

// Firebase
import firebase from "./../../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";

// Font Gotham
import { useFonts } from "expo-font";

export default function Devices({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

//   const [devices, setDevices] = useState();

  const [refreshing, setRefreshing] = useState(false);
 
  const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
    }, 2000);
  }, []);

  const [devices, setDevices] = useState()
  const [get, setGet] = useState(true);
  const uid = 'Y8f9M4o03ceZrFjoWu6iOA8rm2F2'; // Posteriormente pegar da navegation
  

  useEffect(() => {
    firebase.firestore().collection("users_devices").doc(uid).get().then((doc) => {
        console.log("From firebase: ", doc.data().devices)
        setDevices([... doc.data().devices])
        console.log("Devices:", devices)
    })
  }, []);

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  const toggleSwitch = () =>{
    return true;
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
      
      {devices && devices.map((callbackfn, id) => (
        <View style={styles.options}>
        <SecurityUser color="#000000"/> 
            <Text style={styles.text}>  ...</Text>
            <Switch
            style={{marginLeft: 'auto', marginRight: 25}}
            trackColor={{ false: "#BBBABA", true: "#0051BA" }}
            thumbColor={true ? '#E3ECF7' : '#0051ba'}
            value={true}
            onValueChange={toggleSwitch}
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
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    width: screenWidth - 50, 
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
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
