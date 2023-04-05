import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';

// CHART 
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Stats() {

  const [selected, setSelected] = useState("personal");
  const data = [
    { label: 'Esta semana', value: '1' },
    { label: '15 dias', value: '2' },
    { label: '1 mês', value: '3' },
    { label: '6 meses', value: '4' },
    { label: '1 ano', value: '5' },
  ];

  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => CONST.mainBlue,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true // optional
  };

  const chart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      }
    ],
    legend: ["Rainy Days"] // optional
  };


  return (
    <SafeAreaProvider style={styles.mainContainerLight}>
      <StatusBar style="dark" />

      <View
        style={styles.containerLight}>
        {/* Toggle */}
        <View
          style={[
            styles.toggleContainer,
            selected == "personal"
              ? { backgroundColor: CONST.thirdBlue }
              : { backgroundColor: CONST.thirdOrange },
          ]}
        >
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "personal"
                ? { backgroundColor: CONST.lightBackgroundColor }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("personal")}
          >
            <Text style={[styles.normalText, { fontFamily: "GothamMedium" }]}>
              Individual
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "team"
                ? { backgroundColor: CONST.lightBackgroundColor }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("team")}
          >
            <Text style={[styles.normalText, { fontFamily: "GothamMedium" }]}>
              Departamental
            </Text>
          </Pressable>
        </View>


        <Dropdown
          data={data}
          style={[styles.dropdown, focus]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={!focus ? data[0].label : value}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={item => {
            setValue(item.value);
            setFocus(false);
          }}
        />

        <LineChart
          data={chart}
          width={CONST.screenWidth}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
        />

      </View>
    </SafeAreaProvider>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
