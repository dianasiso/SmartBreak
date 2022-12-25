import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

// Icons
import { MaterialIcons } from '@expo/vector-icons'; 

// Font Gotham
import { useFonts } from 'expo-font';

export default function Error404() {
     // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: require('./../fonts/GothamMedium.ttf'),
        GothamBook: require('./../fonts/GothamBook.ttf'),
    });
    if (!loaded) {
        return null;  // Returns null if unable to load the font
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </View>
            <ScrollView>
                <Text style={styles.textMessageTitle}>Erro</Text> 
                <Text style={styles.textMessageBody}>Sobrecarga na bateria!</Text>
                <View style={styles.imageOnboarding}>
                    <Image source={require('./../imgs/img_error_404.png')} />
                </View>
                <Text style={styles.textMessageBody}>Esta página não existe.</Text>
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
    backgroundColor: '#0051BA'
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
    color: '#FFFFFF',
  },
  textMessageBody: {
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 22,
    fontFamily: 'GothamBook',
    color: '#FFFFFF',
  },
});
