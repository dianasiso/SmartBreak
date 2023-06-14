import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Alert,
  View,
  ToastAndroid,
  Pressable,
  SafeAreaView,
  Modal,
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
  EmojiSad, //depois mudar, so serve de exemplo
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import * as Notifications from 'expo-notifications';

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

const BatteryContainer = ({ selected }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userData = useSelector((state) => state.user);

  const [organization, setOrganization] = useState(userData.organization)

  const uid = userData.userID;
  const token = userData.token;

  console.log("User Data:", userData);
  console.log("User ID:", userData.userID);
  console.log("User ORG:", userData.organization);

  const [goals, setGoals] = useState();
  const [pause, setPause] = useState(userData.pause);
  const [battery, setBattery] = useState(userData.battery);
  const [happy, setHappy] = useState(false);
  const [heightBattery, setHeightBattery] = useState(0);
  const [batteryTeams, setBatteryTeams] = useState([]);
  const [heightBatteryTeams, setHeightBatteryTeams] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [teams, setTeams] = useState();


  const heightAlgorithm = (full, value) => {
    if (value >= full / 2) {
      setHappy(true)
    } else {
      setHappy(false)
    }
    //max 160
    return value * 163 / full;
  }

  const changePause = async () => {
    try {
      const response = await fetch(apiURL + uid, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
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
    // Calculate the height
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/organizations/" + organization, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json();
          setHeightBattery(heightAlgorithm(data.message.full, battery));

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + uid + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("GOALS", data)
          setGoals(data.message.total);

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

  }, [userData]);


  return (
    <>
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
                {pause ? "Tem a certeza que pretende terminar a sua pausa?" : "Tem a certeza que pretende iniciar uma pausa?"}
              </Text>
              <Text style={styles.modalText}>
                {pause ? "Bom regresso ao trabalho!" : "Não se esqueça de garantir que todos os equipamentos associados à sua conta estão devidamente desligados!"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }} >
              <Pressable
                onPress={() => { setModalVisible(!modalVisible); }}
                style={{ padding: 10, marginRight: 10 }} >
                <Text style={{ color: "#0051ba", fontFamily: "GothamMedium" }} > Cancelar </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(logUser({ ...userData, pause: !pause }));
                  changePause()
                }}
                style={styles.buttonAdd}
              >
                {pause ?
                  <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                    Terminar
                  </Text>
                  :
                  <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                    Iniciar
                  </Text>
                }
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
              style={styles.batteryValuesTitle}>
              A sua carga pessoal
            </Text>
            <Text style={styles.batteryValuesCharge}>{battery} kWh</Text>
            <Text
              accessible={true}
              accessibilityLabel="Texto na cor branca escrito a sua carga pessoal."
              style={styles.batteryValuesTitle}>
              Objetivos por cumprir
            </Text>
            <Text style={styles.batteryValuesGoals}>{goals ? goals : 0}</Text>
            <View style={styles.addPauseButtonContainer}>
              {selected === "personal" ?
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={styles.pauseCircle}>
                  {pause ?
                    <Pause variant="Bold" color="#07407B" size={20} />
                    :
                    <Play variant="Bold" color="#07407B" size={20} />
                  }
                </Pressable>
                :
                <Pressable
                  onPress={() =>
                    navigation.navigate("TeamDashboard", {
                      teamId: userData.department,
                    })
                  }
                  style={styles.pauseCircle}>
                  <People color="#F57738" size={20} variant="Bold" />
                </Pressable>
              }
              <View style={styles.buttonDashboardView}>
                {selected === "personal" ?
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
                  :
                  <Pressable
                    onPress={() =>
                      navigation.navigate("TeamDashboard", {
                        teamId: userData.department,
                      })
                    }
                    style={[styles.addPauseButton, { backgroundColor: CONST.thirdOrange }]}
                  >
                    <Text style={styles.addPauseButtonText}>Ver equipa</Text>
                  </Pressable>
                }
              </View>
            </View>
          </View>
          <View style={styles.columnContainerRight}>
            <View style={styles.batteryView}>
              <View style={styles.batteryTip} />
              <View style={styles.batteryContainer}>
                <View style={[styles.batteryFill]} />
                <View
                  style={[
                    styles.batteryFill,
                    {
                      height: heightBattery,
                    },
                  ]}
                />
              </View>
            </View>
            {happy ?
              <EmojiHappy
                style={styles.batteryEmoji}
                size="40"
                color="#FEFEFE"
              />
              :
              <EmojiSad
                style={styles.batteryEmoji}
                size="40"
                color="#FEFEFE"
              />
            }
          </View>
        </View>
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <MoneyRecive color="black" />
        </View>

        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            Poupaste {(((150 * battery) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            Pouparam {(((150 * batteryTeams) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Car color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            Consegues colocar{" "}
            {((((150 * battery) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            Conseguem colocar{" "}
            {((((150 * batteryTeams) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Clock color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            A energia que poupaste equivale a carregar um portátil por{" "}
            {((((150 * battery) / 100) * 0.15 * 24) / 0.23).toFixed(0)} horas.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            A energia que pouparam equivale a carregar um portátil por{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 24) / 0.23).toFixed(0)}{" "}
            horas.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Ticket color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            O dinheiro que poupaste equivale a{" "}
            {((((150 * battery) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            O dinheiro que pouparam equivale a{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        )}
      </View>
    </>
  );


};

const Metrics = ({ selected }) => {
  const userData = useSelector((state) => state.user.userID);
  console.log(userData)
  const uid = userData;
  const [battery, setBattery] = useState(0);
  const [teams, setTeams] = useState([]);
  const [batteryTeams, setBatteryTeams] = useState(0);
  const [kwh, setKwh] = useState(0);
  const [kwhTeams, setKwhTeams] = useState(0);

  useEffect(() => {
    // firebase
    //   .firestore()
    //   .collection("users_data")
    //   .doc(uid)
    //   .onSnapshot((doc) => {
    //     setTeams(doc.data().teams);
    //     setBattery(doc.data().battery);

    //     if (doc.data().teams.length != 0) {
    //       firebase
    //         .firestore()
    //         .collection("teams")
    //         .doc(doc.data().teams[0])
    //         .onSnapshot((element) => {
    //           setBatteryTeams(element.data().battery);
    //           setKwh((150 * battery) / 100);
    //           setKwhTeams((150 * batteryTeams) / 100);
    //         });
    //     }
    //   });
  }, [userData]);

  const metrics = (value) => {
    // 0.15eur -> 1kwh
    let price = value * 0.15;
    console.log("Poupaste ", price.toFixed(2), " euros");
  };

  return (
    <>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <MoneyRecive color="black" />
        </View>

        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            Poupaste {(((150 * battery) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            Pouparam {(((150 * batteryTeams) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Car color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            Consegues colocar{" "}
            {((((150 * battery) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            Conseguem colocar{" "}
            {((((150 * batteryTeams) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Clock color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            A energia que poupaste equivale a carregar um portátil por{" "}
            {((((150 * battery) / 100) * 0.15 * 24) / 0.23).toFixed(0)} horas.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            A energia que pouparam equivale a carregar um portátil por{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 24) / 0.23).toFixed(0)}{" "}
            horas.
          </Text>
        )}
      </View>
      <View style={styles.metricsElement}>
        <View style={styles.metricsCircle}>
          <Ticket color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricsElementText}>
            O dinheiro que poupaste equivale a{" "}
            {((((150 * battery) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        ) : (
          <Text style={styles.metricsElementText}>
            O dinheiro que pouparam equivale a{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        )}
      </View>
    </>
  );
};

export default function Dashboard() {
  //const { idUser } = route.params.idUser;
  //console.log(route);
  const reduxState = useSelector((state) => state.user.userID);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log("redux state:", reduxState);
  }, [reduxState]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

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

  const [selected, setSelected] = useState("personal");

  return (
    <SafeAreaView style={styles.mainContainerLight}>
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
        <BatteryContainer selected={selected} />
        
      </View>
    </SafeAreaView>
  );
}
