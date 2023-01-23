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
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#0051BA'
  },
  imageOnboarding: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginRight: 20,
  }, 
  textMessageTitle: {
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 55,
    fontFamily: 'GothamMedium',
    color: '#FFFFFF',
  },
  textMessageBody: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 22,
    fontFamily: 'GothamBook',
    color: '#FFFFFF',
  },
});
