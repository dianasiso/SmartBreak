import { StatusBar } from "expo-status-bar";
import React, { useState , useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Modal
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";

// CALENDAR
import { Calendar, LocaleConfig } from 'react-native-calendars';

// CHART
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Stats() {
  const [selected, setSelected] = useState("personal");
  const [date, setDate] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndStartDate] = useState("");

  useEffect(() => {
    console.log(date);
  }, [date]);

  const dropdown = [
    { label: "Esta semana", value: "0" },
    { label: "15 dias", value: "1" },
    { label: "1 mês", value: "2" },
    { label: "6 meses", value: "3" },
    { label: "1 ano", value: "4" },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => {
      return selected === "personal" ? CONST.mainBlue : CONST.mainOrange;
    },
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
    // legend: ["Rainy Days"], // optional
  };

  const data1 = {
    data: [0.4, 0.6, 0.8],
    labels: ["Swim", "Bike", "Run"],
  };

  return (
    <SafeAreaProvider style={styles.mainContainerLight}>
      <StatusBar style="dark" />

      <View style={styles.containerLight}>
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

        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text>data</Text>
        </Pressable>

        <Modal
          visible={modalVisible}
          
          >
          <Calendar
            style={styles.calendar}
            onDayPress={day => {
              setDate(prevState => [...prevState, day.dateString]);
            }}
            markingType={"period"}
            markedDates={{
              [date[0]]: {startingDay: true, marked: true, color: CONST.mainBlue},
              [date[1]]: {endingDay: true, marked: true, color: CONST.mainBlue}
            }}
          />
        </Modal>




        <Dropdown
          data={dropdown}
          style={[styles.dropdown, focus]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!focus ? dropdown[0].label : value}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setFocus(false);
          }}
        />

        {data && (
          <View style={{ paddingTop: CONST.iconPadding }}>
            <BarChart
              data={data}
              width={320} //corrigir mas se apagar a width o expo buga.
              height={200}
              yAxisSuffix={""}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                labelColor: (opacity = 1) => "#000000",
                color: (opacity = 1) => {
                  return selected === "personal"
                    ? CONST.mainBlue
                    : CONST.mainOrange;
                },
              }}
              withInnerLines={false}
              style={styles.chart}
            />

            <Text style={[styles.smallText, { textAlign: "center", paddingTop: 10 }]}>O contributo das suas pausas</Text>
          </View>
        )}

        {data && (
          <View style={{ paddingTop: CONST.iconPadding }}>
            <LineChart
              data={data}
              width={330} //corrigir mas se apagar a width o expo buga.
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              withInnerLines={false}
              style={styles.chart}
            />
            <Text style={[styles.smallText, { textAlign: "center", paddingTop: 10 }]}>Tempo médio de pausas</Text>
          </View>


        )}

        {/* {data1 && data1 != null ? (
          <ProgressChart
            data={data1}
            width={340}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        ) : null} */}
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
