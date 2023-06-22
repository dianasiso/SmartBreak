import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// CHART
import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";

// Font Gotham
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";


// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Stats() {

  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1];


  const randomDataPausas = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 11) // 0 - 1000
  );

  const randomDataTempo = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 21) // 0 - 1000
  );

  const [color, setColor] = useState();

  const chartConfig = {
    backgroundGradientFrom: dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor,
    backgroundGradientTo: dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor,
    color: (opacity = 0.2) => {
      return color;
    },
    labelColor: (opacity = 1) => !dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor,
    strokeWidth: 2, // optional, default 3
  };


  const dataPausa = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: randomDataPausas,
      },
    ],
  };

  const dataTempo = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: randomDataTempo,
      },
    ],
  };


  const [activeGoals, setActiveGoals] = useState()
  const [inactiveGoals, setInactiveGoals] = useState()

  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const navigation = useNavigation();
  const [selected, setSelected] = useState("personal");


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("active:", data.total)
          setActiveGoals(data.total);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }

      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/inactive", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("inactive:", data.total)
          setInactiveGoals(data.total);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
    }
    fetchData();
    if (selected === "personal") {
      if (dark_mode) {
        setColor(CONST.thirdBlue)
      } else {
        setColor(CONST.mainBlue)
      }
    } else {
      if (dark_mode) {
        setColor(CONST.thirdOrange)
      } else {
        setColor(CONST.mainOrange)
      }
    }
  }, [inactiveGoals, activeGoals, selected]);
  // // MOD


  return (
    <SafeAreaProvider style={[dark_mode ? dark_styles.mainContainerDark : styles.mainContainerLight]}>
      <StatusBar style={dark_mode ? "light" : "dark"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[dark_mode ? dark_styles.containerLight : styles.containerLight]}
      >
        <View
          style={[{ marginBottom: 40 },
          styles.toggleContainer,
          selected == "personal"
            ? dark_mode ?
              { backgroundColor: "#444" }
              :
              { backgroundColor: "#f0f0f0" }
            :
            dark_mode ?
              { backgroundColor: "#444" }
              :
              { backgroundColor: "#f0f0f0" },
          ]}
        >
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "personal"
                ? { backgroundColor: CONST.lightBlue }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("personal")}
          >
            <Text accessibilityLabel="Texto escrito Individual" style={[dark_mode ? dark_styles.normalText : styles.normalText, { fontFamily: "GothamMedium" }]}>
              Individual
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "team"
                ? { backgroundColor: CONST.lightOrange }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("team")}
          >
            <Text accessibilityLabel="Texto escrito Departamental" style={[dark_mode ? dark_styles.normalText : styles.normalText, { fontFamily: "GothamMedium" }]}>
              Departamental
            </Text>
          </Pressable>
        </View>


        <View style={dark_mode ? dark_styles.goalsBox : styles.goalsBox}>
          <View style={[dark_mode ? dark_styles.goals : styles.goals]}>
            <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
              {selected === "personal" ?
                <Text accessibilityLabel={`Texto escrito Concluíste um total de ${inactiveGoals} objetivos.`}
                  style={dark_mode ? dark_styles.normalText : styles.normalText}>
                  Concluíste um total de <Text style={{ fontFamily: 'GothamMedium' }}>{inactiveGoals}</Text> objetivos.
                </Text>
                :
                <Text accessibilityLabel={`Texto escrito Concluíram um total de ${inactiveGoals} objetivos.`}
                  style={dark_mode ? dark_styles.normalText : styles.normalText}>
                  Concluíram um total de <Text style={{ fontFamily: 'GothamMedium' }}>{inactiveGoals}</Text> objetivos.
                </Text>
              }
            </View>
          </View>
        </View>

        <View style={[dark_mode ? dark_styles.goalsBox : styles.goalsBox, { marginTop: 10 }]}>
          <View style={[dark_mode ? dark_styles.goalsv2 : styles.goalsv2]}>
            <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
              {selected === "personal" ?
                <Text accessibilityLabel={`Texto escrito Atualmente tens pendentes ${activeGoals} objetivos.`}
                  style={[dark_mode ? dark_styles.normalText : styles.normalText, { textAlign: 'right' }]}>
                  Atualmente tens pendentes <Text style={{ fontFamily: 'GothamMedium' }}>{activeGoals}</Text> objetivos.
                </Text>
                :
                <Text accessibilityLabel={`Texto escrito Atualmente têm pendentes ${activeGoals} objetivos.`}
                  style={[dark_mode ? dark_styles.normalText : styles.normalText, { textAlign: 'right' }]}>
                  Atualmente têm pendentes <Text style={{ fontFamily: 'GothamMedium' }}>{activeGoals}</Text> objetivos.
                </Text>
              }
            </View>
          </View>
        </View>
        <Text accessibilityLabel={`Texto escrito Esta semana.`}
          style={[styles.subTitleText, { marginTop: 20, color: !dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor }]}>Esta semana</Text>


        {dataPausa && (
          <View style={{ paddingTop: CONST.iconPadding }}>
            <BarChart
              accessibilityLabel={`Gráfico de barras com intervalo de uma semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom).`}
              data={dataPausa}
              width={CONST.screenWidth - 60}
              height={200}
              yAxisSuffix={""}
              chartConfig={chartConfig}
              withInnerLines={false}
            />

            <Text accessibilityLabel={`Texto escrito Número de pausas.`}
              style={[styles.smallText,
              {
                textAlign: "center",
                paddingTop: 10,
                color: !dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor
              }]}>Número de pausas</Text>
          </View>
        )}



        {dataTempo && (
          <View style={{ paddingTop: CONST.iconPadding * 2 }}>
            <LineChart
              accessibilityLabel={`Gráfico de linhas com intervalo de uma semana (Seg, Ter, Qua, Qui, Sex, Sáb, Dom).`}
              data={dataTempo}
              width={CONST.screenWidth - 60}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              withInnerLines={false}
            />
            <Text accessibilityLabel={`Texto escrito Tempo médio de pausas (em minutos).`}
              style={[
                styles.smallText,
                {
                  textAlign: "center",
                  paddingTop: 10,
                  color: !dark_mode ? CONST.darkerColor : CONST.lightBackgroundColor
                }
              ]}>Tempo médio de pausas (em minutos)</Text>
          </View>


        )}

        <View style={{ backgroundColor: 'transparent', height: 60 }}></View>

      </ScrollView>
    </SafeAreaProvider >
  );
}
