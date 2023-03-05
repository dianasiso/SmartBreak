import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Alert, TextInput, Text, View, ScrollView, Pressable  } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

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

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

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
      <SafeAreaProvider style={styles.container}>
        <StatusBar style="light" />
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Esqueceu-se da palavra-passe?"
            style={styles.titleTextWhite}>Esqueceu-se da palavra-passe?</Text> 
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Introduza uma nova palavra passe e de seguida volte a confirmá-la."
            style={styles.normalTextWhite}>Introduza uma nova palavra passe e de seguida volte a confirmá-la.</Text>
  
        <ScrollView style={{marginTop: CONST.backgroundPaddingTop}}>            
          <Text
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito E-mail." 
            style={styles.inputLabelWhite}>E-mail</Text> 
          <TextInput 
            accessible={true}
            accessibilityLabel="Campo para introdução do E-mail." 
            style={styles.inputFieldWhite} 
            onChangeText={(text) => setEmail(text)}/>  
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Nova palavra-passe." 
            style={styles.inputLabelWhite}>Nova palavra-passe</Text>
          <TextInput  
            secureTextEntry={true} 
            style={styles.inputFieldWhite} 
            accessible={true}
            accessibilityLabel="Campo para introdução da Nova palavra-passe." 
            onChangeText={(text) => setPassword(text)}/>
          <View style={styles.passwordProgressBar}>
            <PassMeter
              showLabels={false}
              password={password}
              maxLength={15}
              minLength={8}
              labels={[]}
            /> 
          </View>
          <Text 
            accessible={true}
            accessibilityLabel="Texto na cor branca num fundo azul escuro escrito Confirmar nova palavra-passe." 
            style={styles.inputLabelWhite}>Confirmar nova palavra-passe</Text> 
          <TextInput  
            accessible={true}
            accessibilityLabel="Campo para introdução da Confirmação da nova palavra-passe." 
            secureTextEntry={true} 
            style={styles.inputFieldWhite} 
            onChangeText={(text) => setConfirmPassword(text)}/>   
        </ScrollView>
        <Pressable
          accessible={true}
          accessibilityLabel="Botão da cor branca num fundo azul escuro com o objetivo de efetuar a redefinição da palavra-passe. Tem escrito na cor azul escuro Redefinir palavra-passe."
          
          onPress={() => submit()} style={[styles.buttonWhite, {marginBottom: CONST.backgroundPaddingLateral}]}>
          <Text style={styles.buttonWhiteText}>Redefinir palavra-passe</Text>
        </Pressable>
      </SafeAreaProvider>   
  );
}

