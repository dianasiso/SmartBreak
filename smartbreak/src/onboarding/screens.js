import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Animated, Dimensions } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Font Gotham
import { useFonts } from 'expo-font';

export default function Onboarding() {
    const [loaded] = useFonts({
        GothamMedium: require('./../fonts/GothamMedium.ttf'),
        GothamBook: require('./../fonts/GothamBook.ttf'),
    });
    if (!loaded) {
        return null;
    }

    var screenWidth = Dimensions.get('window').width;
    var screenHeight = Dimensions.get('window').height + 30;

    return (
        <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: '#0051BA'}}>
        <View style={{
          width: screenWidth,
          height: screenHeight,
          paddingTop: 65,
          paddingLeft: 25,
          paddingRight: 25,
          flex: 1,
          backgroundColor: '#0051BA'
        }}>
          <StatusBar style="light" />
          <Text style={styles.textSkip}>Saltar</Text>
          <ScrollView>
              <Text style={styles.textMessageTitle}>Bem-vinde à <Text style={{fontFamily: 'GothamMedium'}}>Smart Break</Text></Text> 
              <Text style={styles.textMessageBody}>Carregue a sua <Text style={{fontFamily: 'GothamMedium'}}>bateria</Text> e aprenda a converter tempo em <Text style={{fontFamily: 'GothamMedium'}}>lucro</Text> e <Text style={{fontFamily: 'GothamMedium'}}>lazer</Text></Text>
          </ScrollView>
          <Image style={styles.imageBackground} source={require('./../imgs/img_onboarding_first_screen.png')} />
          <View style={styles.navigator}>
          <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
              <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
              <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
              <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
              <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
          </View>      
        </View>
        <View style={{
          width: screenWidth,
          height: screenHeight,        
          paddingTop: 65,
          paddingLeft: 25,
          paddingRight: 25,
          flex: 1,
          backgroundColor: '#0051BA',
        }}>
          <StatusBar style="light" />
          <Text style={styles.textSkip}>Saltar</Text>
          <ScrollView>
            <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Energia</Text></Text> 
            <Text style={styles.textMessageBody}>Tome as decisões mais acertadas, <Text style={{fontFamily: 'GothamMedium'}}>poupe</Text> e <Text style={{fontFamily: 'GothamMedium'}}>ganhe</Text> energia numa pausa </Text>
            <View style={styles.imageBattery}>
              <Image source={require('./../imgs/img_onboarding_battery_empty.png')} />
            </View>
          </ScrollView>
          <View style={styles.navigator}>
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
          </View>   
        </View>
      </ScrollView>  
          
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
  imageBattery: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
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
