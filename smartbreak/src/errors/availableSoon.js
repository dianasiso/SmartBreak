import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

// Icons
import { MaterialIcons } from '@expo/vector-icons'; 

// Font Gotham
import { useFonts } from 'expo-font';

export default function AvailableSoon() {
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../fonts/GothamMedium.ttf'),
        GothamBook: require('./../fonts/GothamBook.ttf'),
    });

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </View>
            <ScrollView>
                <Text style={styles.textMessageTitle}>Brevemente disponível</Text> 
                <Text style={styles.textMessageBody}>Estamos a recarregar as nossas baterias para que possas ter esta funcionalidade em breve.</Text>
                <View style={styles.imageOnboarding}>
                    <Image source={require('./../imgs/img_available_soon.png')} style={{width: 116, height: 180}} />
                </View>
                <Text style={styles.textMessageBody}>Podes espreitar mais tarde.</Text>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#fff'
  },
  imageOnboarding: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
  }, 
  textMessageTitle: {
    fontSize: 45,
    textAlign: 'center',
    paddingTop: 55,
    fontFamily: 'GothamMedium',
    color: '#0051ba',
  },
  textMessageBody: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 22,
    fontFamily: 'GothamBook',
    color: '#0051ba',
  },
});
