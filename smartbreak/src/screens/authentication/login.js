import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {TextInput, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableHighlight, TouchableOpacity  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Icons
import { MaterialIcons } from '@expo/vector-icons'; 

// Font Gotham
import { useFonts } from 'expo-font';

export default function Login() {
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../../fonts/GothamMedium.ttf'),
        GothamBook: require('./../../fonts/GothamBook.ttf'),
    });


    if (!loaded) {
        return null;  // Returns null if unable to load the font
    }

    return (
      <View style={styles.container}>
          <StatusBar style="light" />
          <ScrollView style={styles.groupContainer}>
            <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Login</Text></Text> 
            <Text style={styles.textMessageBody}>Estamos contentes por continuares a melhorar o teu local de trabalho.</Text>
            
          </ScrollView>  

          <View style={styles.imageLogo} >
            <Image source={require('./../../imgs/img_login.png')} />
          </View>
          <View style={styles.subContainer}>   
            <ScrollView>
              <Text>Email</Text> 
              <TextInput style={styles.inputField} onChangeText={(text) => setEmail(text)}/>      
              <Text>Palavra-passe</Text>
              <TextInput  secureTextEntry={true} style={styles.inputField} onChangeText={(text) => setPassword(text)}/>
              <Text style={styles.extra} >Esqueceu-se da palavra-passe?</Text>
             <TouchableHighlight style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableHighlight>
            </ScrollView>
          </View>   
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
},
groupContainer: {
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
registerPhoto: {
  height: screenWidth/5,
  width: screenWidth/5,
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: screenWidth/10,
  flex: 1/2,
},
extra: {
  color: '#888',
  fontSize: 12,
  textAlign: 'right',
  marginBottom: 40,
},
inputField: {
  borderBottomColor: '#000000',
  borderBottomWidth: 1,
  marginBottom: 40,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderRadius: 0,
},
buttonText: {
  fontFamily: 'GothamBook',
  color: '#FFF',
  fontSize: 18,
  textAlign: 'center',
},
button: {
  backgroundColor: '#0051BA',
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
