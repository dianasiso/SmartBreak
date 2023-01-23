import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Alert, TextInput, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity, Pressable  } from 'react-native';

// Font Gotham
import { useFonts } from 'expo-font';

// Firebase
import firebase from "./../../config/firebase.js"
import {doc, updateDoc, collection, where, query, getDocs } from "firebase/firestore"; 

//redux
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";
import { useNavigation } from "@react-navigation/native";

// Password meter
import PassMeter from "react-native-passmeter";

export default function Password() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../../fonts/GothamMedium.ttf'),
        GothamBook: require('./../../fonts/GothamBook.ttf'),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updateData = async () => {
      const user = query(collection(firebase.firestore(), 'users_data'), where("email", "==", email.trim() ));
      const querySnapshot = await getDocs(user);
      var uid = null;
      var emailCheck = false;
      querySnapshot.forEach((doc) => {
        if (typeof(doc.data()) == 'object') {
          emailCheck = true;
          uid = doc.data().uid;
        } 
      })

      if (!emailCheck) {
        Alert.alert("Email não registado!", "Por favor, registe-se primeiro na aplicação.");
      } else {
        // Update 
        // const docRef = doc(firebase.firestore(), "users_data", uid);
        // updateDoc(docRef, {
        //   password : password,
        // })
        const docRef = firebase.firestore().collection('users_data').doc(uid);
        docRef.update({
          password : password,
        })

         Alert.alert("Atualizado!", "Informações atualizadas com sucesso.")
      }
    }

    const validate_password = (pass, pass2) => {
        if (pass != pass2) {
          Alert.alert('As palavras-passe não coincidem.')
          return false;
        }
        if (pass.length < 8) {
          Alert.alert('A palavra-passe deve ter no mínimo 8 caracteres.')
          return false;
        }
        return true;
    }

    const submit = () => {
        if (email.length == 0) {
          Alert.alert('Preencha corretamente o campo E-mail');
          return false;
        } 
        if (password.length == 0 ) {
          Alert.alert('Preencha corretamente o campo Palavra-passe');
          return false;
        }
        if (confirmPassword.length == 0 ) {
          Alert.alert('Preencha corretamente o campo Confirmar palavra-passe');
          return false;
        } 
        if (!validate_password(password, confirmPassword)) {
          return false;
        }  
        updateData();
        navigation.navigate("Login");
    }

    return (
      <View style={styles.container}>
          <StatusBar style="light" />
            <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Esqueceu-se da palavra-passe?</Text></Text> 
            <Text style={styles.textMessageBody}>Introduza uma nova palavra passe e de seguida volte a confirmá-la.</Text>

        <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View>   
          <ScrollView style={{marginTop: 80}}>            
            <Text style={styles.textMessageBody}>Email</Text> 
            <TextInput style={styles.inputField} onChangeText={(text) => setEmail(text)}/>      
            <Text style={styles.textMessageBody}>Nova palavra-passe</Text>
            <TextInput  secureTextEntry={true} style={styles.inputFieldPass} onChangeText={(text) => setPassword(text)}/>
            <View style={{overflow: 'hidden', width: '100%', borderRadius: 8, marginLeft: 'auto', marginRight: 'auto', marginBottom: 30}}>
                    <PassMeter
                      showLabels={false}
                      password={password}
                      maxLength={15}
                      minLength={8}
                      labels={[]}
                    /> 
            </View>
            <Text style={styles.textMessageBody}>Confirmar nova palavra-passe</Text> 
            <TextInput  secureTextEntry={true} style={styles.inputField} onChangeText={(text) => setConfirmPassword(text)}/>    
            <Pressable onPress={() => submit()} style={styles.button}><Text style={styles.buttonText}>Redefinir palavra-passe</Text></Pressable>
          </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>   
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 65,
  backgroundColor: '#0051BA',
  flexDirection: "column",
  paddingLeft: 25,
  paddingRight: 25,
},
subContainer: {
  backgroundColor: '#FFF',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopRightRadius: 50,
  borderTopLeftRadius: 50,
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 65,
  height: screenHeight/2,
},
inputField: {
  borderBottomColor: '#FFF',
  borderBottomWidth: 1,
  marginBottom: 40,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderRadius: 0,
  color: '#FFF'
},
inputFieldPass: {
  borderBottomColor: '#FFF',
  borderBottomWidth: 1,
  marginBottom: 10,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderRadius: 0,
  color: '#FFF'
},
buttonText: {
  fontFamily: 'GothamBook',
  color: '#0051BA',
  fontSize: 18,
  textAlign: 'center',
},
button: {
  backgroundColor: '#FFF',
  justifyContent: 'center',
  height: 48,
  borderRadius: 8,
  marginBottom: 40,
  marginTop: 10,
},
textMessageTitle: {
  fontSize: 24,
  textAlign: 'left',
  paddingTop: 40,
  fontFamily: 'GothamBook',
  color: '#FFFFFF',
},
textMessageBody: {
  fontSize: 16,
  textAlign: 'left',
  paddingTop: 15,
  fontFamily: 'GothamBook',
  color: '#FFFFFF',
},
imageLogo: {
  alignItems: 'center',
  paddingTop: 65,
}, 
});
