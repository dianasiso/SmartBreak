import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { AddCircle, People, Clock, CloseCircle } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import batteryBolt from "../../imgs/batteryBolt.png";

const BatteryToggle = () => {
  const [selected, setSelected] = useState("personal");
  const [pausa, setPausa] = useState(false);

  const Battery = ({ selected }) => {
    if (pausa === false) {
      return (
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <View style={batteryStyles.batteryFill} />
        </View>
      );
    } else {
      return (
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryFillPausa} />
          <View style={batteryStyles.batteryContainer}>
            <Image
              source={require("../../imgs/batteryBolt.png")}
              style={batteryStyles.batteryBolt}
            />
          </View>
          <View style={batteryStyles.batteryTip} />
          
        </View>
      );
    }
  };

  const AdicionarPausa = ({ selected }) => {
    const navigation = useNavigation();
    if (selected === "personal") {
      return (
        <View style={adicionarPausaStyles.adicionarPausaView}>
          <Pressable
            onPress={() => {
              setPausa(!pausa);
            }}
            style={adicionarPausaStyles.adicionarPausaContainer}
          >
            <Text style={adicionarPausaStyles.adicionarPausaText}>
              {pausa ? "Terminar Pausa" : "Adicionar Pausa"}
            </Text>
            {pausa ? (
              <CloseCircle
                color="white"
                size={26}
                variant="Bold"
                style={adicionarPausaStyles.icon}
              />
            ) : (
              <AddCircle
                color="white"
                size={26}
                variant="Bold"
                style={adicionarPausaStyles.icon}
              />
            )}
          </Pressable>
        </View>
      );
    } else if (selected === "team") {
      return (
        <View style={adicionarPausaStyles.adicionarPausaView}>
          <Pressable
            onPress={() => navigation.navigate("TeamDashboard")}
            style={adicionarPausaStyles.adicionarPausaContainer}
          >
            <Text style={adicionarPausaStyles.adicionarPausaText}>
              Ver equipa
            </Text>
            <People
              color="white"
              size={26}
              variant="Bold"
              style={adicionarPausaStyles.icon}
            />
          </Pressable>
        </View>
      );
    }
  };

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
      <AdicionarPausa selected={selected} />
    </>
  );
};

const Metricas = () => {
  return (
    <View style={metricasStyles.metricasContainer}>
      <Text style={metricasStyles.metricasText}>Métricas</Text>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" size={20} variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" size={20} variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" size={20} variant="Bold" />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BatteryToggle />
          <Metricas />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const dashboardStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 25,
    paddingRight: 25,
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
    height: 100,
    width: 175,
    borderRadius: 22,
    borderColor: "black",
    borderWidth: 2.5,
  },
  batteryBolt: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    width: 94,
    height: 94,
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
    left: 82,
  },
  batteryFillPausa: {
    height: 88,
    width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 18,
    position: "absolute",
    left: 82,
  },
 
});

const toggleStyles = StyleSheet.create({
  toggleView: {
    top: 65,
    alignItems: "center",
    flexDirection: "row",
  },
  toggleContainer: {
    width: 340,
    height: 35,
    backgroundColor: "#E3ECF7",
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toggleSelectorLeft: {
    width: 145,
    height: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    left: 5,
    alignSelf: "center",
  },
  toggleSelectorRight: {
    width: 170,
    height: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    right: 5,
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

const adicionarPausaStyles = StyleSheet.create({
  adicionarPausaView: {
    top: 60,
  },
  adicionarPausaContainer: {
    backgroundColor: "#0051BA",
    width: 340,
    height: 51,
    borderRadius: 17,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  adicionarPausaText: {
    color: "white",
    fontSize: 16,
    fontFamily: "GothamMedium",
    marginLeft: 18,
  },
  icon: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: 18,
  },
});

const metricasStyles = StyleSheet.create({
  metricasContainer: {
    alignSelf: "flex-start",
    marginLeft: 0,
    top: 100,
  },
  metricasText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
  },
  metricasElement: {
    width: 340,
    height: 65,
    backgroundColor: "#E3ECF7",
    borderRadius: 17,
    marginTop: 20,
    //justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  metricasElementText: {
    fontSize: 15,
    fontFamily: "GothamBook",
    left: 47,
    maxWidth: 261,
    lineHeight: 20,
  },
  iconContainer: {
    left: 18,
  },
});
