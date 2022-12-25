import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Font Gotham
import { useFonts } from 'expo-font';

export default function FirstScreen() {
    const [loaded] = useFonts({
        GothamMedium: require('./../fonts/GothamMedium.ttf'),
        GothamBook: require('./../fonts/GothamBook.ttf'),
    });
    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.textSkip}>Saltar</Text>
            <ScrollView>
                <Text style={styles.textMessageTitle}>Bem-vinde à <Text style={{fontFamily: 'GothamMedium'}}>Smart Break</Text></Text> 
                <Text style={styles.textMessageBody}>Carregue a sua <Text style={{fontFamily: 'GothamMedium'}}>bateria</Text> e aprenda a converter tempo em <Text style={{fontFamily: 'GothamMedium'}}>lucro</Text> e <Text style={{fontFamily: 'GothamMedium'}}>lazer</Text></Text>
            </ScrollView>
            <Image style={styles.imageBackground} source={require('./../imgs/img_onboarding_first_screen.png')} />
            <View style={styles.navigator}>
                <Ionicons name="ellipse" size={10} color="white"  />
                <Ionicons name="ellipse" size={10} color="white" style={{opacity: 0.5}} />
                <Ionicons name="ellipse" size={10} color="white" style={{opacity: 0.5}} />
                <Ionicons name="ellipse" size={10} color="white" style={{opacity: 0.5}} />
                <Ionicons name="ellipse" size={10} color="white" style={{opacity: 0.5}} />
            </View>
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
  imageBackground: {
    position: 'absolute',
    top: undefined,
    bottom: 0,
    right: 0,
    left: undefined,
  },
  textSkip: {
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'GothamBook',
    color: '#FFFFFF',
  },
  textMessageTitle: {
    fontSize: 26,
    textAlign: 'center',
    paddingTop: 120,
    fontFamily: 'GothamBook',
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
  navigator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 65,
  }
});
