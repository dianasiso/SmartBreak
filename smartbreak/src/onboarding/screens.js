import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, Dimensions } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Font Gotham
import { useFonts } from 'expo-font';

export default function Onboarding() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require('./../fonts/GothamMedium.ttf'),
    GothamBook: require('./../fonts/GothamBook.ttf'),
  });

  const [page, setPage] = useState(1);  // Onboarding page
  const [isVisible, setIsVisible] = useState(true);   // Skip button visibility
  const scrollViewRef = useRef(null);   // ScrollView ref

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

  // Change navigator when change screen
  const NavigatorScreen = (page) => {
      if (page == 1) {
        return (
          <View style={styles.navigator}>
            <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
        </View>   
        )
      } else if (page==2){
        return (
          <View style={styles.navigator}>
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
          </View>   
        )
      } else if (page==3){
        return (
          <View style={styles.navigator}>
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
          </View>   
        )
      } else if (page == 4){
        return (
          <View style={styles.navigator}>
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
            <Ionicons name="ellipse" size={8} color="white" style={{marginLeft: 2, marginRight: 2}}  />
            <Ionicons name="ellipse" size={8} color="white" style={{opacity: 0.5, marginLeft: 2, marginRight: 2}} />
          </View>   
        )
      } else {
        return (<></>)
      }
  }

  // Skip to last screen
  const SkipOption = () => {
    setPage(5);
    scrollViewRef.current.scrollToEnd();
  }

  return (
      <View>
        <StatusBar style="light" />
        <View style={styles.textSkipBox}>
          <Text onPress={SkipOption} style={[styles.textSkip, { opacity: isVisible ? 1 : 0 }]}>Saltar</Text>
        </View>  
        <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          var x = e.nativeEvent.contentOffset.x;
          if (x == 0) {
            setPage(1);
            setIsVisible(true);
          } else if (x < (screenWidth + 1)) {
            setPage(2);
            setIsVisible(true);
          } else if (x < (screenWidth*2 + 1)) {
            setPage(3);
            setIsVisible(true);
          } else if (x < (screenWidth*3 + 1)){
            setPage(4);
            setIsVisible(true);
          } else {
            setPage(5);
            setIsVisible(false);
          }
          // alert(screenWidth*2)
          // alert(e.nativeEvent.contentOffset.x)
       }}
        style={{backgroundColor: '#0051BA'}}>
          <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textMessageTitle}>Bem-vinde à <Text style={{fontFamily: 'GothamMedium'}}>Smart Break</Text></Text> 
                <Text style={styles.textMessageBody}>Carregue a sua <Text style={{fontFamily: 'GothamMedium'}}>bateria</Text> e aprenda a converter tempo em <Text style={{fontFamily: 'GothamMedium'}}>lucro</Text> e <Text style={{fontFamily: 'GothamMedium'}}>lazer</Text></Text>
            </ScrollView>
            <Image style={styles.imageBackground} source={require('./../imgs/img_onboarding_first_screen.png')} />
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Energia</Text></Text> 
              <Text style={styles.textMessageBody}>Tome as decisões mais acertadas, <Text style={{fontFamily: 'GothamMedium'}}>poupe</Text> e <Text style={{fontFamily: 'GothamMedium'}}>ganhe</Text> energia numa pausa </Text>
            </ScrollView>
            <View style={styles.imageOnboarding}>
              <Image source={require('./../imgs/onboarding_battery.gif')} />
            </View>
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Produtividade</Text></Text> 
              <Text style={styles.textMessageBody}>Aumente a sua <Text style={{fontFamily: 'GothamMedium'}}>produtividade</Text> e o seu contributo para a empresa através de <Text style={{fontFamily: 'GothamMedium'}}>estatísticas</Text> </Text>
            </ScrollView>
            <View style={styles.imageOnboarding}>
              <Image source={require('./../imgs/onboarding_graphs.png')} />
            </View>
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.textMessageTitle}><Text style={{fontFamily: 'GothamMedium'}}>Consciencialização</Text></Text> 
              <Text style={styles.textMessageBody}>Auxilie-se de <Text style={{fontFamily: 'GothamMedium'}}>dicas</Text> para melhorar hábitos de consumo energético mais <Text style={{fontFamily: 'GothamMedium'}}>conscientes</Text> </Text>
            </ScrollView>
            <View style={styles.imageOnboarding}>
              <Image source={require('./../imgs/onboarding_lamp.png')} />
            </View>
          </View>
          <View style={styles.containerFifthScreen}>
            <ScrollView>
              <View style={styles.imageLogo} >
                <Image source={require('./../imgs/logo_white.png')} />
              </View>
              <Text style={styles.textMessageTitleLogo}><Text style={{fontFamily: 'GothamMedium'}}>Smart Break</Text></Text> 
            </ScrollView>  
            <ScrollView style={styles.containerWelcome}>
              <Text style={styles.textWelcomeTitle}>Bem-vinde!</Text>
              <Text style={styles.textWelcomeText}>Faz pausas no trabalho, desliga os teus equipamentos e contribui para a diminuição do desperdício e excesso de energia. Converte o teu tempo em lucro e lazer!</Text>
              <TouchableHighlight style={styles.buttonWelcome}><Text style={styles.buttonText}>Entrar</Text></TouchableHighlight>
              <TouchableHighlight style={styles.buttonWelcome}><Text style={styles.buttonText}>Registar</Text></TouchableHighlight>
            </ScrollView>          
          </View>
        </ScrollView>  
        {NavigatorScreen(page)}
      </View>
    );
}

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,  
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#0051BA'
  },
  containerFifthScreen: {
    width: screenWidth,
    height: screenHeight,  
    flex: 1,
    backgroundColor: '#0051BA'
  },
  containerWelcome: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: "column",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 120,
  },
  imageBackground: {
    position: 'absolute',
    top: undefined,
    bottom: 0,
    right: 0,
    left: undefined,
  },
  imageOnboarding: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: screenHeight/4,
  }, 
  imageLogo: {
    alignItems: 'center',
    paddingTop: 65,
  },  
  buttonText: {
    fontFamily: 'GothamBook',
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonWelcome: {
    backgroundColor: '#0051BA',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  textSkipBox: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 65,
    fontSize: 20,
    backgroundColor: '#0051BA'
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
  textWelcomeTitle: {
    fontSize: 24,
    textAlign: 'left',
    paddingTop: 20,
    fontFamily: 'GothamMedium',
    color: '#001025',
  },
  textWelcomeText: {
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 15,
    paddingBottom: 40,
    fontFamily: 'GothamBook',
    lineHeight: 17,
    color: '#001025',
  },
  textMessageTitleLogo: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 40,
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
    position: 'relative',
    top: -85,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 65,
  }
});
