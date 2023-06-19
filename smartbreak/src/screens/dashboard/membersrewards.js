import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Car, Coffee, DollarCircle } from "iconsax-react-native";
import { useSelector } from "react-redux";


// Font Gotham
import { useFonts } from "expo-font";
import { useEffect } from "react";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";
import { dark_styles } from "../../styles/darkcss.js";

export default function MembersRewards({ route, navigation }) {

  const userData = useSelector((state) => state.user);

  const dark_mode = userData.accessibility[1]
  const [rewards, setRewards] = useState([])

  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/users/rewards", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setRewards(data.message);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
    }

    fetchData()
  }, [])

  // ! ATUALIZAR DE ACORDO COM OS TIPOS EXISTENTES
  const renderRewardIcon = (type) => {
    switch (type) {
      case "Car":
        return <Car color={CONST.darkerColor} />;
      case "Coffee":
        return <Coffee color={CONST.darkerColor} />;
      case "DollarCircle":
        return <DollarCircle color={CONST.darkerColor} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[dark_mode ? dark_styles.containerLight : styles.containerLight, { paddingTop: CONST.backgroundPaddingTop / 2 }]}
    >
      <StatusBar style={dark_mode ? "light" : "dark"} />
      <Text style={dark_mode ? dark_styles.titleText : styles.titleText}>Recompensas de {userData.name}</Text>
      <ScrollView style={{ marginTop: 30 }}>
        {rewards && rewards.length > 0 && rewards.map((callbackfn, id) => (
          <View key={rewards[id]._id} style={styles.metricsElement}>
            <View style={[styles.metricsCircle, { backgroundColor: CONST.thirdOrange }]}>
              {renderRewardIcon(rewards[id].type)}
            </View>
            <Text style={dark_mode ? dark_styles.metricsElementText : styles.metricsElementText}> {rewards[id].description} </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

