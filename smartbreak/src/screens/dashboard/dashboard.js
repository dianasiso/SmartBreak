import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { AddCircle, People, Clock , CloseCircle} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

const BatteryToggle = () => {
  const [selected, setSelected] = useState("personal");

  return (
    <>
      <View style={toggleStyles.toggleView}>
        <View style={toggleStyles.toggleContainer}>
          <Pressable
            style={[
              toggleStyles.toggleSelectorLeft,
              selected === "personal"
                ? toggleStyles.selected
                : toggleStyles.notSelected,
            ]}
            onPress={() => setSelected("personal")}
          >
            <Text style={toggleStyles.toggleText}>Bateria pessoal</Text>
          </Pressable>
          <Pressable
            style={[
              toggleStyles.toggleSelectorRight,
              selected === "team"
                ? toggleStyles.selected
                : toggleStyles.notSelected,
            ]}
            onPress={() => setSelected("team")}
          >
            <Text style={toggleStyles.toggleText}>Bateria da equipa</Text>
          </Pressable>
        </View>
      </View>
      <Battery selected={selected} />
      <ButtonDashboard selected={selected} />
    </>
  );
};

const Battery = ({ selected }) => {
  return (
    <View style={batteryStyles.batteryView}>
      <View style={batteryStyles.batteryContainer} />
      <View style={batteryStyles.batteryTip} />
      <View style={batteryStyles.batteryFill} />
    </View>
  );
};


const ButtonDashboard = ({ selected }) => {

  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const [pause, setPause] = useState();

  useEffect(() => {
    firebase
    .firestore()
    .collection("users_data")
    .doc(uid)
    .get()
    .then((doc) => {
      setPause(doc.data().pause);
    });
  }, [userData]);

  const navigation = useNavigation();

  if (selected === "personal") {
    if (!pause) {
      return (
        <View style={ButtonDashboardStyles.ButtonDashboardView}>
          <Pressable onPress={() => {
             firebase.firestore().collection('users_data').doc(uid).update({
              pause : !pause,
            })
            setPause(true)
          }} style={ButtonDashboardStyles.ButtonDashboardContainer}>
            <Text style={ButtonDashboardStyles.ButtonDashboardText}>
              Adicionar pausa
            </Text>
            <AddCircle
              color="white"
              size={26}
              variant="Bold"
              style={ButtonDashboardStyles.icon}
            />
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={ButtonDashboardStyles.ButtonDashboardView}>
          <Pressable onPress={() => {
            firebase.firestore().collection('users_data').doc(uid).update({
              pause : !pause,
            })
            setPause(false)
          }} style={ButtonDashboardStyles.ButtonDashboardContainer}>
            <Text style={ButtonDashboardStyles.ButtonDashboardText}>
              Terminar pausa
            </Text>
            <CloseCircle
              color="white"
              size={26}
              variant="Bold"
              style={ButtonDashboardStyles.icon}
            />
          </Pressable>
        </View>  
      );
    }
  } else {
    return (
      <View style={ButtonDashboardStyles.ButtonDashboardView}>
        <Pressable
          onPress={() => navigation.navigate("TeamDashboard")}
          style={ButtonDashboardStyles.ButtonDashboardContainer}
        >
          <Text style={ButtonDashboardStyles.ButtonDashboardText}>
            Ver equipa
          </Text>
          <People
            color="white"
            size={26}
            variant="Bold"
            style={ButtonDashboardStyles.icon}
          />
        </Pressable>
      </View>
    );
  }
};

const Metricas = () => {
  return (
    <View style={metricasStyles.metricasContainer}>
      <Text style={metricasStyles.metricasText}>Métricas</Text>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black"  />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
    </View>
  );
};

export default function Dashboard() {
  //const { idUser } = route.params.idUser;
  //console.log(route);
  const reduxState = useSelector((state) => state.user.userID);

  useEffect(() => {
    console.log("redux state:", reduxState);
  }, [reduxState]);

  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });
  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  return (
    <SafeAreaView style={dashboardStyles.pageContainer}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BatteryToggle />
          <Metricas />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const screenWidth = Dimensions.get('window').width;

const dashboardStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
    alignItems: "center",
  },
});

const batteryStyles = StyleSheet.create({
  batteryView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },
  batteryContainer: {
    height: 100.5,
    width: 175,
    backgroundColor: "white",
    borderRadius: 22,
    borderColor: "black",
    borderWidth: 2.5,
  },
  batteryTip: {
    height: 30,
    width: 10,
    backgroundColor: "black",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 2.5,
    marginLeft: 4,
  },
  batteryFill: {
    height: 88,
    width: 90, //máximo 163
    backgroundColor: "#0051BA",
    borderRadius: 18,
    position: "absolute",
    left: 93,
  },
});

const toggleStyles = StyleSheet.create({
  toggleView: {
    top: 65,
    alignItems: "center",
    flexDirection: "row",
  },
  toggleContainer: {
    width: screenWidth - 50,
    height: 35,
    backgroundColor: "#E3ECF7",
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toggleSelectorLeft: {
    width: (screenWidth - 50)/2 - 5,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    alignSelf: "center",
  },
  toggleSelectorRight: {
    width: (screenWidth - 50)/2 - 5,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    alignSelf: "center",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "GothamBook",
  },
  selected: {
    backgroundColor: "white",
  },
  notSelected: {
    backgroundColor: "transparent",
  },
});

const ButtonDashboardStyles = StyleSheet.create({
  ButtonDashboardView: {
    marginTop: 60,
  },
  ButtonDashboardContainer: {
    backgroundColor: "#0051BA",
    width: screenWidth - 50,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  ButtonDashboardText: {
    color: "white",
    fontSize: 16,
    fontFamily: "GothamMedium",
    textAlign: 'left',
    padding: 15,
    paddingLeft: 20,
  },
  icon: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: 20,
  },
});

const metricasStyles = StyleSheet.create({
  metricasContainer: {
    alignSelf: "flex-start",
    marginTop: 60,
  },
  metricasText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
  },
  metricasElement: {
    width: screenWidth - 50,
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    paddingLeft: 25,
    //justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  metricasElementText: {
    fontSize: 15,
    fontFamily: "GothamBook",
    marginLeft: 10,
    lineHeight: 20,
  },
});
