import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

// Icons
import { MaterialIcons } from '@expo/vector-icons'; 

// Font Gotham
import { useFonts } from 'expo-font';

export default function Maintenance() {
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
                <Text style={styles.textMessageTitle}>Manutenção</Text> 
                <Text style={styles.textMessageBody}>Estamos a recarregar as nossas baterias.</Text>
                <View style={styles.imageOnboarding}>
                    <Image source={require('./../imgs/img_maintenance.png')} />
                </View>
                <Text style={styles.textMessageBody}>Poderás voltar a ser produtivo não tarda.</Text>
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
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 50,
    lineHeight: 22,
    fontFamily: 'GothamBook',
    color: '#FFFFFF',
  },
});
