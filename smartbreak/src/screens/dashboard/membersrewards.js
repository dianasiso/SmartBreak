import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Car, Coffee, DollarCircle } from "iconsax-react-native";
import { useNavigation , useRoute} from "@react-navigation/native";

// Font Gotham
import { useFonts } from "expo-font";
import { useEffect } from "react";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function MembersRewards({ route, navigation }) {
  const props = route.params;
  const [teamId, setTeamId] = useState(useRoute().params.teamId);
  //console.log(props.username);

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  useEffect(() => {
    navigation.setParams({
      teamId: teamId,
    });
  }, [])

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[styles.containerLight, {paddingTop: 0}]}
    >
      <ScrollView>
        <StatusBar style="dark" />
        <Text style={styles.titleText}>Recompensas de {props.username}</Text>
        
        <View style={styles.metricsElement}>
          <View style={[styles.metricsCircle, {backgroundColor: CONST.thirdOrange}]}>
            <Car color={CONST.darkerColor} />
          </View>
          <Text style={styles.smallText}>
          1 dia de férias em setembro
          </Text>
        </View>

        <View style={styles.metricsElement}>
          <View style={[styles.metricsCircle, {backgroundColor: CONST.thirdOrange}]}>
            <DollarCircle color={CONST.darkerColor} />
          </View>
          <Text style={styles.smallText}>
          Vale 15€ em refeições
          </Text>
        </View>

        <View style={styles.metricsElement}>
          <View style={styles.metricsCircle}>
            <Car color={CONST.darkerColor} />
          </View>
          <Text style={styles.smallText}>
            1 dia de férias em setembro
          </Text>
        </View>

        <View style={styles.metricsElement}>
          <View style={[styles.metricsCircle, {backgroundColor: CONST.thirdOrange}]}>
            <Coffee color={CONST.darkerColor} />
          </View>
          <Text style={styles.metricasElementText}>
          10 cafés grátis no bar
          </Text>
        </View>

      </ScrollView>
    </SafeAreaProvider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  options: {
    marginTop: 30,
    borderRadius: 15,
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    marginLeft: 15,
    lineHeight: 24,
  },
}); */
