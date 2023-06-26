import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  EasingNode,
  FadeIn,
  FadeOut,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Svg, Path } from "react-native-svg";

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Alert,
  RefreshControl,
  View,
  Pressable,
  SafeAreaView,
  Modal,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import {
  MoneyRecive,
  Car,
  People,
  Clock,
  Pause,
  Ticket,
  Play,
  EmojiHappy,
  EmojiSad,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// screenOrientation
import * as ScreenOrientation from "expo-screen-orientation";

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "./../../styles/darkcss.js";
import * as CONST from "./../../styles/variables.js";

// REDUX
import { useDispatch } from "react-redux";
import {
  logUser,
  updateBattery,
  updatePause,
  updateTotalBattery,
  saveNewPauseToAsyncStorage,
  saveNewBatteryToAsyncStorage,
  saveNewTotalBatteryToAsyncStorage,
} from "../../redux/user.js";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const apiURL = "https://sb-api.herokuapp.com/users/";

export default function Dashboard() {
  // ! ver porque o refresh não funciona, tem de funcionar ://
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // ---- userData information
  const userData = useSelector((state) => state.user);
  const uid = userData.userID;
  const token = userData.token;

  console.log("DASHBOARD", userData);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];
  const high_contrast = userData.accessibility[0];

  const [selected, setSelected] = useState("personal");

  const [goals, setGoals] = useState(0);
  const [pause, setPause] = useState(userData.pause);
  const [battery, setBattery] = useState(userData.battery);
  const [batteryFull, setBatteryFull] = useState(userData.full);
  const [totalBattery, setTotalBattery] = useState(userData.total_battery);
  const [happy, setHappy] = useState(false);
  const [heightBattery, setHeightBattery] = useState(0);
  const [batteryDep, setbatteryDep] = useState(0);
  const [startPause, setStartPause] = useState();

  // ---- MÉTRICAS ----
  const [price, setPrice] = useState();
  const [fuel, setFuel] = useState();
  // ? fuel = preço de 1 litro de combustível
  // ? carregar um pc durante 1 hora gasta +/- 200 wats ou seja 0.2 kwt
  const kw = 0.2;
  // ? 150eur em refeição num mês para uma pessoa -> 5eur por dia -> 2.5eur uma refeição (lmao lmao queria)
  const food = 2.5;
  // --- TERMINA MÉTRICAS

  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  // ---- ONDAS ----
  const waveAnimated = useSharedValue(20);
  const waveAnimatedBackground = useSharedValue(20);
  const heightAnimated = useSharedValue(40);

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
      M 0 0
      Q 45 ${waveAnimated.value} 85 0
      T 85 ${heightAnimated.value - 23}
      
      Q 85 ${heightAnimated.value} 23 ${heightAnimated.value}
      L ${85 - 23} ${heightAnimated.value}
      Q 0 ${heightAnimated.value} 0 ${heightAnimated.value - 23}

      Z
      `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
       M 0 0
    Q 25 ${waveAnimatedBackground.value + 10 / 2} 50 10
    Q 68 ${-(waveAnimatedBackground.value + 10) / 3} 85 ${
        -(waveAnimatedBackground.value + 10) / 4.5
      }
    T 85 ${heightAnimated.value - 23}
    
    Q 85 ${heightAnimated.value} 23 ${heightAnimated.value}
    L ${85 - 23} ${heightAnimated.value}
    Q 0 ${heightAnimated.value} 0 ${heightAnimated.value - 23}

    Z
    `,
    };
  });
  const heightAlgorithm = (full, value) => {
    // console.log("ENTREI AQUI COM ESTE VALOR NA BATTERY", value)
    if (value >= full / 3) {
      setHappy(true);
    } else {
      setHappy(false);
    }
    //max 163
    const x = (value * 163) / full;
    if (x < 40) {
      heightAnimated.value = 40;
    } else {
      heightAnimated.value = (value * 163) / full;
      // console.log("Altura_",  heightAnimated.value)
    }

    return (value * 163) / full;
  };
  function moveWaves() {
    waveAnimated.value = 20;
    waveAnimatedBackground.value = 20;

    if (pause) {
      waveAnimated.value = withRepeat(
        withTiming(30, {
          duration: 600,
          easing: Easing.ease,
        }),
        Infinity,
        true
      );
      waveAnimatedBackground.value = withRepeat(
        withTiming(30, {
          duration: 400,
          easing: Easing.ease,
        }),
        Infinity,
        true
      );
    } else {
      waveAnimated.value = withRepeat(
        withTiming(30, {
          duration: 2000,
          easing: Easing.ease,
        }),
        Infinity,
        true
      );
      waveAnimatedBackground.value = withRepeat(
        withTiming(30, {
          duration: 1800,
          easing: Easing.ease,
        }),
        Infinity,
        true
      );
    }
  }

  // ---- TERMINA ONDAS ----

  // ---- ADD BATTERY ----

  const algorithmBattery = async (time) => {
    try {
      const response = await fetch(
        "https://sb-api.herokuapp.com/devices/active/user",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // --- Algoritmo ---
        // energy_total ---> 60 hr
        // x ---> time
        let plus = parseFloat(((time * data.energy_total) / 60).toFixed(2));
        // console.log("devices ativos" , data.energy_total)
        // console.log("plus", plus)
        let value = plus + battery;
        let compare = value;
        let flag = false;
        if (compare > batteryFull) {
          value = parseFloat(compare - batteryFull);
          flag = true;
        }
        editUser(value, flag);
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };

  const addPauseAPI = async (start, end) => {
    // console.log("vars: ", start, end, uid)
    try {
      const response = await fetch("https://sb-api.herokuapp.com/pauses", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: start,
          end_date: end,
          time: ((end - start) / (1000 * 60)).toFixed(2),
          user: uid,
        }),
      });
      if (response.ok) {
        algorithmBattery(((end - start) / (1000 * 60)).toFixed(2));
        // * CALCULAR QUANTO POUPOU COM BASE NOS DEVICES
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };

  const editUser = async (valueBattery, updateTotalBatteries) => {
    try {
      const fetch_url = apiURL + uid;
      const response = await fetch(fetch_url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          pause: !pause,
          battery: valueBattery,
          total_battery: updateTotalBatteries
            ? parseInt(totalBattery + 1)
            : totalBattery,
        }),
      });
      if (response.ok) {
        if (updateTotalBatteries) {
          dispatch(updateTotalBattery(totalBattery + 1));
          setTotalBattery(parseInt(totalBattery + 1));
          try {
            await saveNewBatteryToAsyncStorage(totalBattery + 1);
            console.log("Battery saved to async storage");
          } catch (error) {
            console.log("Error saving battery to async storage", error);
          }
        }
        dispatch(updatePause(!pause));
        try {
          await saveNewPauseToAsyncStorage(!pause);
          console.log("Pause saved to async storage");
        } catch (error) {
          console.log("Error saving pause to async storage", error);
        }
        dispatch(updateBattery(valueBattery));
        try {
          await saveNewTotalBatteryToAsyncStorage(valueBattery);
          console.log("Battery saved to async storage");
        } catch (error) {
          console.log("Error saving battery to async storage", error);
        }
        setBattery(valueBattery);
        setPause(!pause);
        setModalVisible(!modalVisible);
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    ScreenOrientation.unlockAsync();

    moveWaves();

    const updateHeightAnimated = () => {
      if (selected === "personal") {
        setHeightBattery(heightAlgorithm(batteryFull, battery));
      } else {
        setHeightBattery(heightAlgorithm(batteryFull, batteryDep));
      }
    };

    // Call the updateHeightAnimated function when selected changes
    updateHeightAnimated();

    async function fetchValues() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/values", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPrice(data.averageElectricity.toFixed(2));
          setFuel(data.averageFuel.toFixed(2));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
       // Alert.alert("Error", error.message);
      }
    }
    fetchValues();

    async function fetchData() {
      try {
        const response = await fetch(
          "https://sb-api.herokuapp.com/goals/destination/" + uid + "/active",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGoals(data.total);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        //Alert.alert("Error", error.message);
      }

      try {
        const response = await fetch(
          "https://sb-api.herokuapp.com/departments/" + userData.department,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setbatteryDep(data.battery_dep);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
       // Alert.alert("Error", error.message);
      }
    }

    fetchData();

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userData, selected, pause, heightAnimated.value]);

  return (
    <SafeAreaView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={
        dark_mode ? dark_styles.mainContainerDark : styles.mainContainerLight
      }
    >
      <StatusBar style={!dark_mode ? "light" : "dark"} />
      <View
        style={[
          styles.dashboardContainer,
          selected == "personal"
            ? dark_mode
              ? { backgroundColor: CONST.thirdBlue }
              : { backgroundColor: CONST.mainBlue }
            : dark_mode
            ? { backgroundColor: CONST.thirdOrange }
            : { backgroundColor: CONST.mainOrange },
        ]}
      >
        {/* Toggle */}
        <View
          style={[
            styles.toggleContainer,
            selected == "personal"
              ? dark_mode
                ? { backgroundColor: CONST.fadeBlue }
                : { backgroundColor: CONST.thirdBlue }
              : dark_mode
              ? { backgroundColor: CONST.fadeOrange }
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
        {/* Battery */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={dark_mode ? dark_styles.modalView : styles.modalView}>
              <View style={{ flexDirection: "column", marginTop: 5 }}>
                <Text
                  style={
                    dark_mode ? dark_styles.modalTextBold : styles.modalTextBold
                  }
                >
                  {pause
                    ? "Tem a certeza que pretende terminar a sua pausa?"
                    : "Tem a certeza que pretende iniciar uma pausa?"}
                </Text>
                <Text
                  style={dark_mode ? dark_styles.modalText : styles.modalText}
                >
                  {pause
                    ? "Bom regresso ao trabalho!"
                    : "Não se esqueça de garantir que todos os equipamentos associados à sua conta estão devidamente desligados!"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={{ padding: 10, marginRight: 10 }}
                >
                  <Text
                    style={{
                      color: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
                      fontFamily: "GothamMedium",
                    }}
                  >
                    {" "}
                    Cancelar{" "}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={async () => {
                    dispatch(logUser({ ...userData, pause: !pause }));
                    if (pause) {
                      addPauseAPI(startPause, Date.now());
                    } else {
                      setStartPause(Date.now());
                      editUser(battery, false);
                      await startPausePushNotification();
                    }
                  }}
                  style={dark_mode ? dark_styles.buttonAdd : styles.buttonAdd}
                >
                  {pause ? (
                    <Text
                      style={{
                        color: dark_mode ? CONST.darkerColor : CONST.whiteText,
                        fontFamily: "GothamMedium",
                      }}
                    >
                      Terminar
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: dark_mode ? CONST.darkerColor : CONST.whiteText,
                        fontFamily: "GothamMedium",
                      }}
                    >
                      Iniciar
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.dashboardContent}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainerLeft}>
              {selected === "personal" ? (
                <>
                  <Text
                    accessible={true}
                    accessibilityLabel="Texto escrito a tua carga pessoal."
                    style={
                      dark_mode
                        ? dark_styles.batteryValuesTitle
                        : styles.batteryValuesTitle
                    }
                  >
                    A tua carga pessoal
                  </Text>
                  <Text
                    style={
                      dark_mode
                        ? dark_styles.batteryValuesCharge
                        : styles.batteryValuesCharge
                    }
                  >
                    {battery.toFixed(0)} kWh
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    accessible={true}
                    accessibilityLabel="Texto escrito a tua carga pessoal."
                    style={
                      dark_mode
                        ? dark_styles.batteryValuesTitle
                        : high_contrast
                        ? dark_styles.batteryValuesTitle
                        : styles.batteryValuesTitle
                    }
                  >
                    A tua carga departamental
                  </Text>
                  <Text
                    style={
                      dark_mode
                        ? dark_styles.batteryValuesCharge
                        : high_contrast
                        ? dark_styles.batteryValuesCharge
                        : styles.batteryValuesCharge
                    }
                  >
                    {batteryDep} kWh
                  </Text>
                </>
              )}
              <Text
                accessible={true}
                accessibilityLabel="Texto escrito a sua carga pessoal."
                style={
                  dark_mode
                    ? dark_styles.batteryValuesTitle
                    : high_contrast && selected !== "personal"
                    ? dark_styles.batteryValuesTitle
                    : styles.batteryValuesTitle
                }
              >
                Objetivos por cumprir
              </Text>
              <Text
                style={
                  dark_mode
                    ? dark_styles.batteryValuesGoals
                    : high_contrast && selected !== "personal"
                    ? dark_styles.batteryValuesGoals
                    : styles.batteryValuesGoals
                }
              >
                {goals}
              </Text>
              <View style={styles.addPauseButtonContainer}>
                {selected === "personal" ? (
                  <Pressable
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={styles.pauseCircle}
                  >
                    {pause ? (
                      <Pause
                        variant="Bold"
                        color={dark_mode ? CONST.darkerColor : CONST.mainBlue}
                        size={20}
                      />
                    ) : (
                      <Play
                        variant="Bold"
                        color={dark_mode ? CONST.darkerColor : CONST.mainBlue}
                        size={20}
                      />
                    )}
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("TeamDashboard", {
                        teamId: userData.department,
                      })
                    }
                    style={styles.pauseCircle}
                  >
                    <People
                      color={dark_mode ? CONST.darkerColor : CONST.mainOrange}
                      size={20}
                      variant="Bold"
                    />
                  </Pressable>
                )}
                <View style={[styles.buttonDashboardView]}>
                  {selected === "personal" ? (
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={
                        dark_mode
                          ? dark_styles.addPauseButton
                          : styles.addPauseButton
                      }
                    >
                      <Text style={styles.addPauseButtonText}>
                        {pause ? "Terminar pausa" : "Iniciar pausa"}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() =>
                        navigation.navigate("TeamDashboard", {
                          teamId: userData.department,
                        })
                      }
                      style={
                        dark_mode
                          ? dark_styles.viewTeamButton
                          : styles.viewTeamButton
                      }
                    >
                      <Text style={styles.addPauseButtonText}>Ver equipa</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.columnContainerRight}>
              <View style={styles.batteryView}>
                <View
                  style={
                    dark_mode
                      ? dark_styles.batteryTip
                      : high_contrast && selected !== "personal"
                      ? dark_styles.batteryTip
                      : styles.batteryTip
                  }
                />
                <View
                  style={
                    dark_mode
                      ? dark_styles.batteryContainer
                      : high_contrast && selected !== "personal"
                      ? dark_styles.batteryContainer
                      : styles.batteryContainer
                  }
                >
                  <AnimatedSvg
                    style={[styles.batteryFill]}
                    width={82}
                    height={heightAnimated.value}
                    viewBox={`0 0 85 ${heightAnimated.value}`}
                  >
                    <AnimatedPath
                      animatedProps={firstWaveProps}
                      fill={
                        selected === "personal"
                          ? dark_mode
                            ? CONST.fadeBlue
                            : CONST.thirdBlue
                          : dark_mode
                          ? CONST.fadeOrange
                          : high_contrast
                          ? CONST.fadeOrange
                          : CONST.thirdOrange
                      } // *
                      transform="translate(0, 9)"
                    />
                    <AnimatedPath
                      animatedProps={secondWaveProps}
                      fill={
                        dark_mode
                          ? CONST.darkerColor
                          : high_contrast && selected !== "personal"
                          ? CONST.darkerColor
                          : CONST.whiteText
                      }
                      transform="translate(0, 9)"
                    />
                  </AnimatedSvg>
                </View>
              </View>
              {happy ? (
                <EmojiHappy
                  style={styles.batteryEmoji}
                  size="40"
                  color={
                    dark_mode
                      ? CONST.darkerColor
                      : high_contrast && selected !== "personal"
                      ? CONST.darkerColor
                      : CONST.lightBackgroundColor
                  }
                />
              ) : (
                <EmojiSad
                  style={styles.batteryEmoji}
                  size="40"
                  color={
                    dark_mode
                      ? CONST.darkerColor
                      : high_contrast && selected !== "personal"
                      ? CONST.darkerColor
                      : CONST.lightBackgroundColor
                  }
                />
              )}
            </View>
          </View>
        </View>

        <View style={{}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.metricsElement}>
              <View
                style={[
                  styles.metricsCircle,
                  selected === "personal"
                    ? { backgroundColor: CONST.thirdBlue }
                    : { backgroundColor: CONST.thirdOrange },
                ]}
              >
                <MoneyRecive color="black" />
              </View>

              {selected == "personal" ? (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Poupaste {(price * battery).toFixed(2)} euros.
                </Text>
              ) : (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Pouparam {(price * batteryDep).toFixed(2)} euros.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View
                style={[
                  styles.metricsCircle,
                  selected === "personal"
                    ? { backgroundColor: CONST.thirdBlue }
                    : { backgroundColor: CONST.thirdOrange },
                ]}
              >
                <Car color="black" />
              </View>
              {selected == "personal" ? (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Consegues colocar {((price * battery) / fuel).toFixed(0)}{" "}
                  litros de combustível.
                </Text>
              ) : (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Conseguem colocar {((price * batteryDep) / fuel).toFixed(0)}{" "}
                  litros de combustível.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View
                style={[
                  styles.metricsCircle,
                  selected === "personal"
                    ? { backgroundColor: CONST.thirdBlue }
                    : { backgroundColor: CONST.thirdOrange },
                ]}
              >
                <Clock color="black" />
              </View>
              {selected == "personal" ? (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Consegues carregar um computador por{" "}
                  {(battery / kw).toFixed(0)} horas.
                </Text>
              ) : (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Conseguem carregar um computador por{" "}
                  {(batteryDep / kw).toFixed(0)} horas.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View
                style={[
                  styles.metricsCircle,
                  selected === "personal"
                    ? { backgroundColor: CONST.thirdBlue }
                    : { backgroundColor: CONST.thirdOrange },
                ]}
              >
                <Ticket color="black" />
              </View>
              {selected == "personal" ? (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Poupaste o equivalente a{" "}
                  {((price * battery) / food).toFixed(0)} refeições.
                </Text>
              ) : (
                <Text
                  style={
                    dark_mode
                      ? dark_styles.metricsElementText
                      : styles.metricsElementText
                  }
                >
                  Pouparam o equivalente a{" "}
                  {((price * batteryDep) / food).toFixed(0)} refeições.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

async function startPausePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Começaste uma pausa!",
      body: "Não te esqueças de desligar os teus equipamentos! Vemo-nos daqui a pouco.",
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "SmartBreak",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
