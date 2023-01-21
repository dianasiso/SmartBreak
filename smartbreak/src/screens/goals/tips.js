import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Dimensions, Pressable} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation , useRoute} from "@react-navigation/native";

// Font Gotham
import { useFonts } from 'expo-font';

// Firebase
import firebase from "./../../config/firebase.js";

export default function Tips() {
  
  const navigation = useNavigation();
  const [docId, setDocId] = useState(useRoute().params.goalId);
  const [description, setDescription] = useState();
  const [docsId, setDocsId] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [previousId, setPreviousId] = useState();
  
  const [, updateState] = useState();  
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const tips = [
    'Durante a manhã, utilize a luz solar em vez de ligar a iluminação do escritório.',
    'Certifique-se que as luzes estão todas apagadas quando sair. Pode ser necessário desligar o disjuntor.',
    'Acumule os documentos que conseguir para reduzir o número de vezes que liga a impressora.',
    'Programe o ar condicionado para ligar duas vezes de manhã e duas vezes de tarde, evite ligá-lo mais vezes do que o necessário.'
  ];

   // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const newDescription = () => {
    firebase
    .firestore()
    .collection("goals")
    .doc(docId)
    .get()
    .then((doc) => {
      setDescription(doc.data().description)
    console.log("descrição: ", doc.data().description)
    });
  }


  useEffect(() => {
    console.log("id: " , docId)
    newDescription()
    firebase.firestore().collection("goals").get().then((documents) => {
      let arrayTemp = []
      documents.forEach((doc) => {
        // console.log(doc.id)
        // console.log(doc.data())
        arrayTemp.push(doc.id)
      })
      setDocsId(arrayTemp)
    // console.log(docs)
    })

    
  }, [])

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }



  const next = () => {
    for (var i = 0; i < docsId.length; i++) {
      if (docsId[i] == docId) {
        if (i == (docsId.length - 1)) {
          setDocId(docsId[0])
          newDescription()
        } else {
          setDocId(docsId[i+1])
          newDescription()
        }
      }
    }
    // console.log("next id: ",  nextId);
  }

  const previous = () => {
    for (var i = 0; i < docsId.length; i++) {
      if (docsId[i] == docId) {
        console.log("encontrei")
        if (i == 0) {
          setDocId(docsId[docsId.length - 1])
          newDescription()
        } else {
          setDocId(docsId[i-1])
          newDescription()
        }
      }
    }
    // console.log("previous id: ", previousId)
  }

  return (
    <SafeAreaProvider style={styles.container}  >
      <StatusBar style="auto" />
      <ScrollView>
          <Pressable style={styles.optionsTips}>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 16 , marginBottom: 10}}>Objetivo</Text>
            <Text style={styles.text} >{description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
              <Pressable onPress={() => {
                previous()
                forceUpdate()
                }} style={{padding: 10}}>
                <Text style={{color: "#0051ba", fontFamily: 'GothamMedium'}}>Anterior</Text>
              </Pressable>
              <Pressable onPress={() => {
                next()
                forceUpdate()
              }} style={styles.button}>
              <Text style={{color: "#FFF", fontFamily: 'GothamMedium'}}>Próximo</Text>
              </Pressable>
            </View>
          </Pressable>
          <Text style={{ fontFamily: 'GothamMedium', fontSize: 20 , marginBottom: 20,  marginTop: 20}}>Dicas</Text>
        
          {tips && tips.map((callbackfn, id) => (
            <View style={styles.optionsTips}>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 16, marginBottom: 10 }}>Dica {id + 1}</Text>
              <Text style={styles.text} >{tips[id]}</Text>
            </View>
          ))}

        </ScrollView>
    </SafeAreaProvider>

  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
    paddingTop: 35,
  },

  optionsTips: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    width: screenWidth - 50, 
    flexDirection: "column",
    textAlign: 'left',
    justifyContent: 'flex-start',
    backgroundColor: "#E3ECF7",
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 16,
  },

  button: {
    backgroundColor: '#0051ba',
    paddingTop: 10,  
    paddingBottom: 10,  
    paddingLeft: 20, 
    paddingRight: 20, 
    borderRadius: 8, 
    alignItems: 'center', 
  }
});