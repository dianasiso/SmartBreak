import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import bg from "../../imgs/tips.png";

// Font Gotham
import { useFonts } from "expo-font";

// Firebase
import firebase from "./../../config/firebase.js";

// CSS
import { styles } from "./../../styles/css.js";

export default function Tips() {
  const navigation = useNavigation();
  const [docId, setDocId] = useState(useRoute().params.goalId);
  const [description, setDescription] = useState();
  const [docsId, setDocsId] = useState([]);

  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const tips = [
    "Durante a manhã, utilize a luz solar em vez de ligar a iluminação do escritório.",
    "Certifique-se que as luzes estão todas apagadas quando sair. Pode ser necessário desligar o disjuntor.",
    "Acumule os documentos que conseguir para reduzir o número de vezes que liga a impressora.",
    "Programe o ar condicionado para ligar duas vezes de manhã e duas vezes de tarde, evite ligá-lo mais vezes do que o necessário.",
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
        setDescription(doc.data().description);
        console.log("descrição: ", doc.data().description);
      });
  };

  useEffect(() => {
    console.log("id: ", docId);
    newDescription();
    firebase
      .firestore()
      .collection("goals")
      .get()
      .then((documents) => {
        let arrayTemp = [];
        documents.forEach((doc) => {
          // console.log(doc.id)
          // console.log(doc.data())
          arrayTemp.push(doc.id);
        });
        setDocsId(arrayTemp);
        // console.log(docs)
      });
  }, []);

  const next = () => {
    for (var i = 0; i < docsId.length; i++) {
      if (docsId[i] == docId) {
        if (i == docsId.length - 1) {
          setDocId(docsId[0]);
          newDescription();
        } else {
          setDocId(docsId[i + 1]);
          newDescription();
        }
      }
    }
  };

  const previous = () => {
    for (var i = 0; i < docsId.length; i++) {
      if (docsId[i] == docId) {
        if (i == 0) {
          setDocId(docsId[docsId.length - 1]);
          newDescription();
        } else {
          setDocId(docsId[i - 1]);
          newDescription();
        }
      }
    }
  };

  return (
    <SafeAreaProvider
      style={[styles.mainContainer, { backgroundColor: "#FFFFFF" }]}
    >
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", overflow: "scroll" }}
      >
        <View style={[styles.pauseBoxMain, { padding: 15 }]}>
          <Text
            style={{
              fontFamily: "GothamMedium",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Objetivo
          </Text>
          <Text style={styles.normalText}>{description}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Pressable
              onPress={() => {
                previous();
                forceUpdate();
              }}
              style={styles.smallSecondaryButton}
            >
              <Text style={styles.smallSecondaryButtonText}>Anterior</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                next();
                forceUpdate();
              }}
              style={styles.smallPrimaryButton}
            >
              <Text style={styles.smallPrimaryButtonText}>Próximo</Text>
            </Pressable>
          </View>
        </View>
        <Text
          style={{
            fontFamily: "GothamMedium",
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 25,
          }}
        >
          Dicas
        </Text>

        {tips &&
          tips.map((callbackfn, id) => (
            <ImageBackground source={bg} style={styles.optionsTips} key={id}>
              <Text style={styles.numberTips}>{id + 1}</Text>
              <Text style={[styles.normalText, { color: "#FFFFFF" }]}>
                {tips[id]}
              </Text>
            </ImageBackground>
          ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get("window").width;
