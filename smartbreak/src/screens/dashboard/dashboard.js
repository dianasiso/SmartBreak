import { StatusBar } from "expo-status-bar";
import Animated, { Easing, useAnimatedProps, useSharedValue, EasingNode, FadeIn, FadeOut, withRepeat, withTiming } from 'react-native-reanimated'
import { Svg, Path } from "react-native-svg";

import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Image,
  Alert,
  RefreshControl,
  View,
  ToastAndroid,
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

import * as Notifications from "expo-notifications";

//screenOrientation
import * as ScreenOrientation from "expo-screen-orientation";

// CSS
import { styles } from "./../../styles/css.js";
import * as CONST from "./../../styles/variables.js";

//REDUX
import { useDispatch } from "react-redux";
import { logUser } from "../../redux/user.js";

//Preço kWh EDP segundo https://lojaluz.com/faq/preco-kwh a 13/06/2021
const precoKwh = 0.1364;
const apiURL = "https://sb-api.herokuapp.com/users/";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userData = useSelector((state) => state.user);

  const [selected, setSelected] = useState("personal");

  const uid = userData.userID;
  const token = userData.token;

  const [goals, setGoals] = useState(0);
  const [goalsDep, setGoalsDep] = useState(0);
  const [pause, setPause] = useState(userData.pause);
  const [battery, setBattery] = useState(userData.battery);
  const [batteryFull, setBatteryFull] = useState(userData.full);
  const [happy, setHappy] = useState(false);
  const [heightBattery, setHeightBattery] = useState(0);
  const [batteryDep, setbatteryDep] = useState(0);
  const [startPause, setStartPause] = useState();
  const [endPause, setEndPause] = useState();
  const [differenceInHours, setDifferenceInHours] = useState()

  // ---- MÉTRICAS ----
  const [price, setPrice] = useState();
  const fuel = 1.6; //TODO: change to db 
  // ? fuel = preço de 1 litro de combustível
  // ? carregar um pc durante 1 hora gasta +/- 200 wats ou seja 0.2 kwt
  const kw = 0.2
  // ? 150eur em refeição num mês para uma pessoa -> 5eur por dia -> 2.5eur uma refeição (lmao lmao queria)
  const food = 2.5
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
  const heightAnimated = useSharedValue(20);

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
      `
    }
  })

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
       M 0 0
    Q 25 ${(waveAnimatedBackground.value + 10 / 2)} 50 10
    Q 68 ${-(waveAnimatedBackground.value + 10) / 3} 85 ${-(waveAnimatedBackground.value + 10) / 4.5}
    T 85 ${heightAnimated.value - 23}
    
    Q 85 ${heightAnimated.value} 23 ${heightAnimated.value}
    L ${85 - 23} ${heightAnimated.value}
    Q 0 ${heightAnimated.value} 0 ${heightAnimated.value - 23}

    Z
    `}
  })
  const heightAlgorithm = (full, value) => {
    if (value >= full / 3) {
      setHappy(true);
    } else {
      setHappy(false);
    }
    //max 163
    const x = (value * 163) / full
    if (x < 20) {
      heightAnimated.value = 20;
    } else {
      heightAnimated.value = (value * 163) / full;
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
          easing: Easing.ease
        }), Infinity, true
      )
      waveAnimatedBackground.value = withRepeat(
        withTiming(30, {
          duration: 400,
          easing: Easing.ease
        }), Infinity, true
      )
    } else {
      waveAnimated.value = withRepeat(
        withTiming(30, {
          duration: 2000,
          easing: Easing.ease
        }), Infinity, true
      )
      waveAnimatedBackground.value = withRepeat(
        withTiming(30, {
          duration: 1800,
          easing: Easing.ease
        }), Infinity, true
      )
    }
  }

  // ---- TERMINA ONDAS ----

  const addPauseAPI = async () => {
    console.log("vars: ", startPause, endPause, differenceInHours, uid)
    try {
      const response = await fetch("https://sb-api.herokuapp.com/pauses", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date : startPause,
          end_date : endPause,
          time : differenceInHours,
          user: uid
        }),
      });
      if (response.ok) {
       //TODO : CALCULAR QUANTO POUPOU COM BASE NOS DEVICES
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };
  

  const changePause = async () => {
    try {
      // ! ATUALIZAR O USERDATA NA PAUSE E DEPOIS NA BATTERY
      // TODO: ADICIONAR UM IF E SE A PAUSA FOR TRUE SIGNIFICA QUE ELE VAI TERMINAR, PELO QUE TEM DE ATUALIZAR TBM O BATTERY COM O NOVO VALOR DO BATTERY
      const fetch_url = apiURL + uid
      const response = await fetch(fetch_url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          pause: !pause,
        }),
      });
      if (response.ok) {
        setPause(!pause);
        setModalVisible(!modalVisible);
        // if (pause)
        //   await schedulePushNotification();
      } else {
        const errorData = await response.json();
        Alert.alert("Falha no servidor!", errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Ocorreu um erro durante a mudança de estado.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/values" , {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("PRICE", data.average.toFixed(2))
          setPrice(data.average.toFixed(2));

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
  }, [])
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

    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + uid + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setGoals(data.total);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }

      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.department + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setGoalsDep(data.total);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }

      try {
        const response = await fetch("https://sb-api.herokuapp.com/departments/" + userData.department, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setbatteryDep(data.battery_dep);

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
    console.log("hei: ", heightAnimated.value)


  }, [userData, selected, pause]);

  return (
    <SafeAreaView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.mainContainerLight}>
      <StatusBar style="light" />
      <View

        style={[
          styles.dashboardContainer,
          selected == "personal"
            ? { backgroundColor: CONST.mainBlue }
            : { backgroundColor: CONST.mainOrange },
        ]}
      >
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
            <View style={styles.modalView}>
              <View style={{ flexDirection: "column", marginTop: 5 }}>
                <Text style={styles.modalTextBold}>
                  {pause
                    ? "Tem a certeza que pretende terminar a sua pausa?"
                    : "Tem a certeza que pretende iniciar uma pausa?"}
                </Text>
                <Text style={styles.modalText}>
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
                  <Text style={{ color: "#0051ba", fontFamily: "GothamMedium" }}>
                    {" "}
                    Cancelar{" "}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch(logUser({ ...userData, pause: !pause }));
                    changePause();
                    if (pause) {
                      setEndPause(Date.now())
                      const timePause = ((startPause - endPause )/ (1000 * 60 * 60)).toFixed(2)
                      setDifferenceInHours(timePause)
                      addPauseAPI(endPause, differenceInHours, startPause);
                    } else {
                      setStartPause(Date.now())
                    }
                  }}
                  style={styles.buttonAdd}
                >
                  {pause ? (
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                      Terminar
                    </Text>
                  ) : (
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
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
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor branca escrito a sua carga pessoal."
                style={styles.batteryValuesTitle}
              >
                A sua carga pessoal
              </Text>
              {selected === "personal" ?
                <Text style={styles.batteryValuesCharge}>{battery} kWh</Text>
                :
                <Text style={styles.batteryValuesCharge}>{batteryDep} kWh</Text>
              }
              <Text
                accessible={true}
                accessibilityLabel="Texto na cor branca escrito a sua carga pessoal."
                style={styles.batteryValuesTitle}
              >
                Objetivos por cumprir
              </Text>
              <Text style={styles.batteryValuesGoals}>{goals}</Text>
              <View style={styles.addPauseButtonContainer}>
                {selected === "personal" ? (
                  <Pressable
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={styles.pauseCircle}
                  >
                    {pause ? (
                      <Pause variant="Bold" color="#07407B" size={20} />
                    ) : (
                      <Play variant="Bold" color="#07407B" size={20} />
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
                    <People color="#F57738" size={20} variant="Bold" />
                  </Pressable>
                )}
                <View style={styles.buttonDashboardView}>
                  {selected === "personal" ? (
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={styles.addPauseButton}
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
                      style={[
                        styles.addPauseButton,
                        { backgroundColor: CONST.thirdOrange },
                      ]}
                    >
                      <Text style={styles.addPauseButtonText}>Ver equipa</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.columnContainerRight}>
              <View style={styles.batteryView}>
                <View style={styles.batteryTip} />

                  <View style={styles.batteryContainer}>
                    <AnimatedSvg
                      style={[
                        styles.batteryFill,
                      ]}
                      width={82}
                      height={heightAnimated.value}
                      viewBox={`0 0 85 ${heightAnimated.value}`}
                    >
                      <AnimatedPath
                        animatedProps={firstWaveProps}
                        fill={selected === "personal" ? CONST.thirdBlue : CONST.thirdOrange}
                        transform="translate(0, 9)"
                      />
                      <AnimatedPath
                        animatedProps={secondWaveProps}
                        fill={CONST.whiteText}
                        transform="translate(0, 9)"
                      />
                    </AnimatedSvg>
                  </View>
              </View>
              {happy ? (
                <EmojiHappy
                  style={styles.batteryEmoji}
                  size="40"
                  color="#FEFEFE"
                />
              ) : (
                <EmojiSad style={styles.batteryEmoji} size="40" color="#FEFEFE" />
              )}
            </View>
          </View>
        </View>
        <View style={{
        }}>
          <ScrollView>
            <View style={styles.metricsElement}>
              <View style={[styles.metricsCircle, selected === 'personal' ? { backgroundColor: CONST.thirdBlue } : { backgroundColor: CONST.thirdOrange }]}>
                <MoneyRecive color="black" />
              </View>

              {selected == "personal" ? (
                <Text style={styles.metricsElementText}>
                  Poupaste {price * battery} euros.
                </Text>
              ) : (
                <Text style={styles.metricsElementText}>
                  Pouparam {price * batteryDep} euros.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View style={[styles.metricsCircle, selected === 'personal' ? { backgroundColor: CONST.thirdBlue } : { backgroundColor: CONST.thirdOrange }]}>
                <Car color="black" />
              </View>
              {selected == "personal" ? (
                <Text style={styles.metricsElementText}>
                  Consegues colocar {(price * battery / fuel).toFixed(0)} litros de combustível.
                </Text>
              ) : (
                <Text style={styles.metricsElementText}>
                  Conseguem colocar {(price * batteryDep / fuel).toFixed(0)} litros de combustível.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View style={[styles.metricsCircle, selected === 'personal' ? { backgroundColor: CONST.thirdBlue } : { backgroundColor: CONST.thirdOrange }]}>
                <Clock color="black" />
              </View>
              {selected == "personal" ? (
                <Text style={styles.metricsElementText}>
                  Consegues carregar um computador por {(battery / kw).toFixed(0)} horas.
                </Text>
              ) : (
                <Text style={styles.metricsElementText}>
                  Conseguem carregar um computador por {(batteryDep / kw).toFixed(0)} horas.
                </Text>
              )}
            </View>
            <View style={styles.metricsElement}>
              <View style={[styles.metricsCircle, selected === 'personal' ? { backgroundColor: CONST.thirdBlue } : { backgroundColor: CONST.thirdOrange }]}>
                <Ticket color="black" />
              </View>
              {selected == "personal" ? (
                <Text style={styles.metricsElementText}>
                  Poupaste o equivalente a {(price * battery / food).toFixed(0)} refeições.
                </Text>
              ) : (
                <Text style={styles.metricsElementText}>
                  Pouparam o equivalente a {(price * batteryDep / food).toFixed(0)} refeições.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
