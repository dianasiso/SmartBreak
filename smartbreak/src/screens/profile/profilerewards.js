import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {
  ScrollView,
  View,
  Text,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Car, Coffee, DollarCircle, Airplane, CardAdd } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

// Redux
import { useSelector } from "react-redux";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function ProfileRewards() {
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

  const renderRewardIcon = (type) => {
    switch (type) {
      case "Car":
        return <Car color={CONST.darkerColor} />;
      case "Coffee":
        return <Coffee color={CONST.darkerColor} />;
      case "DollarCircle":
        return <DollarCircle color={CONST.darkerColor} />;
      case "Airplane":
        return <Airplane color={CONST.darkerColor} />;
      case "CardAdd":
        return <CardAdd color={CONST.darkerColor} />;
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
      <Text style={dark_mode ? dark_styles.titleText : styles.titleText}>As minhas recompensas</Text>
      <ScrollView style={{ marginTop: 30 }}>
        {rewards && rewards.length > 0 && rewards.map((callbackfn, id) => (
          <View key={rewards[id]._id} style={styles.metricsElement}>
            <View style={[styles.metricsCircle, { backgroundColor: CONST.thirdBlue }]}>
              {renderRewardIcon(rewards[id].type)}
            </View>
            <Text style={dark_mode ? dark_styles.metricsElementText : styles.metricsElementText}> {rewards[id].description} </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );

  // return (
  //   <SafeAreaProvider
  //     showsVerticalScrollIndicator={false}
  //     style={styles.containerLight}
  //   >
  //     <ScrollView>
  //       <StatusBar style="dark" />
  //       <Text style={[styles.titleText, { paddingBottom: CONST.textPadding }]}>As minhas recompensas</Text>

  //       <Pressable style={[styles.boxOptions, {borderBottomColor: 'transparent'}]}>
  //         <View style={styles.iconBackground}>
  //           <Car variant="Bold"/>
  //         </View>
          
  //         <Text style={styles.normalText}>1 dia de férias em setembro</Text>
  //       </Pressable>

  //       <Pressable style={styles.options}>
  //         <Coffee color={CONST.darkerColor} />
  //         <Text style={styles.text}>10 cafés grátis no bar</Text>
  //       </Pressable>

  //       <Pressable style={styles.options}>
  //         <DollarCircle color={CONST.darkerColor} />
  //         <Text style={styles.text}>Vale 15€ em refeições</Text>
  //       </Pressable>
  //     </ScrollView>
  //   </SafeAreaProvider>
  // );
}