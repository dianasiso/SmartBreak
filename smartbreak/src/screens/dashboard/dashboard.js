import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  Dimensions,
  Text,
  Image,
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
  CloseCircle,
  Ticket,
  Play,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

//screenOrientation
import * as ScreenOrientation from "expo-screen-orientation";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";

// Firebase
import firebase from "./../../config/firebase.js";
const Battery = ({ selected }) => {
  if (pausa === false) {
    return (
      <View style={styles.batteryView}>
        <View style={styles.batteryTip} />
        <View style={styles.batteryContainer} />
        <View style={styles.batteryFill} />
      </View>
    );
  } else {
    return (
      <View style={styles.batteryView}>
        <View style={styles.batteryFillPausa} />
        <View style={styles.batteryContainer}>
          <Image
            source={require("../../imgs/batteryBolt.png")}
            style={styles.batteryBolt}
          />
        </View>
        <View style={styles.batteryTip} />
      </View>
    );
  }
};

const BatteryContainer = ({ selected }) => {
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const [pause, setPause] = useState(false);
  const [battery, setBattery] = useState(0);
  const [widthBattery, setWidthBattery] = useState(0);
  const [heightBattery, setHeightBattery] = useState(0);
  const [batteryTeams, setBatteryTeams] = useState([]);
  const [widthBatteryTeams, setWidthBatteryTeams] = useState(0);
  const [heightBatteryTeams, setHeightBatteryTeams] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [teams, setTeams] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users_data")
      .doc(uid)
      .get()
      .then((doc) => {
        setTeams(doc.data().teams);
        setPause(doc.data().pause);

        let temp = doc.data().battery;
        setBattery(temp);
        // width max é 163
        // temp -> 100
        // width -> 163
        if (temp < 3) {
          setHeightBattery(70);
        } else if (temp < 6) {
          setHeightBattery(76);
        } else if (temp < 9) {
          setHeightBattery(79);
        } else if (temp < 12) {
          setHeightBattery(82);
        } else {
          setHeightBattery(88);
        }
        setWidthBattery((temp * 163) / 100);

        if (doc.data().teams.length == 0) {
          setHeightBatteryTeams(0);
          setWidthBatteryTeams(0);
          setBatteryTeamsTeams(0);
        } else {
          firebase
            .firestore()
            .collection("teams")
            .doc(doc.data().teams[0])
            .get()
            .then((element) => {
              console.log("ELEMENT: ", element.data());
              let tempTeam = element.data().battery;
              setBatteryTeams(tempTeam);
              // width max é 163
              // temp -> 100
              // width -> 163
              if (tempTeam < 3) {
                setHeightBatteryTeams(70);
              } else if (tempTeam < 6) {
                setHeightBatteryTeams(76);
              } else if (tempTeam < 9) {
                setHeightBatteryTeams(79);
              } else if (tempTeam < 12) {
                setHeightBatteryTeams(82);
              } else {
                setHeightBatteryTeams(88);
              }
              setWidthBatteryTeams((tempTeam * 163) / 100);
            });
        }
      });
  }, [userData]);

  const navigation = useNavigation();

  if (selected === "personal") {
    if (!pause) {
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
                    Tem a certeza que pretende adicionar uma pausa?
                  </Text>
                  <Text style={styles.modalText}>
                    Não se esqueça de garantir que todos os equipamentos
                    associados à sua conta estão devidamente desligados!
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
                      style={{ color: "#0051ba", fontFamily: "GothamMedium" }}
                    >
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      firebase
                        .firestore()
                        .collection("users_data")
                        .doc(uid)
                        .update({
                          pause: !pause,
                        });
                      setPause(true);
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.buttonAdd}
                  >
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                      Adicionar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.batteryView}>
            <View style={styles.batteryTip} />
            <View style={styles.batteryContainer} />

            <View
              style={[
                styles.batteryFill,
                { width: widthBattery, height: heightBattery },
              ]}
            />
          </View>
          <View style={styles.addPauseButtonContainer}>
            <View style={styles.pauseCircle}>
              <Play variant="Bold" color="#07407B" size={26} />
            </View>
            <View style={styles.ButtonDashboardView}>
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
                style={styles.addPauseButton}
              >
                <Text style={styles.addPauseButtonText}> Iniciar pausa</Text>
              </Pressable>
            </View>
          </View>
        </>
      );
    } else {
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
                    Tem a certeza que pretende terminar a sua pausa?{" "}
                  </Text>
                  <Text style={styles.modalText}>
                    Bom regresso ao trabalho!
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
                      style={{ color: "#0051ba", fontFamily: "GothamMedium" }}
                    >
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      firebase
                        .firestore()
                        .collection("users_data")
                        .doc(uid)
                        .update({
                          pause: !pause,
                          battery: battery + 3,
                        });
                      firebase
                        .firestore()
                        .collection("teams")
                        .doc(teams[0])
                        .update({
                          battery: batteryTeams + 1,
                        });
                      if (battery < 3) {
                        setHeightBattery(70);
                      } else if (battery < 6) {
                        setHeightBattery(76);
                      } else if (battery < 9) {
                        setHeightBattery(82);
                      } else if (battery < 12) {
                        setHeightBattery(79);
                      } else {
                        setHeightBattery(88);
                      }
                      if (battery + 3 > 100) {
                        setBattery(0);
                        setWidthBattery(0);
                      } else {
                        setBattery(battery + 3);
                        setWidthBattery((battery * 163) / 100);
                      }
                      if (batteryTeams < 3) {
                        setHeightBatteryTeams(70);
                      } else if (batteryTeams < 6) {
                        setHeightBatteryTeams(76);
                      } else if (batteryTeams < 9) {
                        setHeightBatteryTeams(82);
                      } else if (batteryTeams < 12) {
                        setHeightBatteryTeams(79);
                      } else {
                        setHeightBatteryTeams(88);
                      }
                      if (batteryTeams + 3 > 100) {
                        setBatteryTeams(0);
                        setWidthBatteryTeams(0);
                      } else {
                        setBatteryTeams(batteryTeams + 3);
                        setWidthBatteryTeams((batteryTeams * 163) / 100);
                      }

                      setPause(false);

                      setModalVisible(!modalVisible);
                    }}
                    style={styles.buttonAdd}
                  >
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                      Terminar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.batteryView}>
            <View style={styles.batteryContainer} />
            <View style={styles.batteryTip} />
            <Image
              source={require("./../../imgs/img_battery_pause.png")}
              resizeMode={"contain"}
              style={{
                position: "absolute",
                zIndex: 100,
                width: "25%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            <View
              style={[
                styles.batteryFillPause,
                { width: widthBattery, height: heightBattery },
              ]}
            />
          </View>
          <View style={styles.ButtonDashboardView}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.ButtonDashboardContainer}
            >
              <Text style={styles.ButtonDashboardText}>Terminar pausa</Text>
              <CloseCircle
                color="white"
                size={26}
                variant="Bold"
                style={styles.icon}
              />
            </Pressable>
          </View>
        </>
      );
    }
  } else {
    return (
      <>
        <View style={styles.batteryView}>
          <View style={styles.batteryContainer} />
          <View style={styles.batteryTip} />
          <View
            style={[
              styles.batteryFill,
              { width: widthBatteryTeams, height: heightBatteryTeams },
            ]}
          />
        </View>
        <View style={styles.verEquipaButtonContainer}>
          <View style={styles.pauseCircle}>
            <People color="#F57738" size={26} variant="Bold" />
          </View>
          {teams[0] ? (
            <Pressable
              onPress={() =>
                navigation.navigate("TeamDashboard", { teamId: teams[0] })
              }
              style={styles.verEquipaButton}
            >
              <Text style={styles.addPauseButtonText}>Ver equipa</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                ToastAndroid.show(
                  "Não está em nenhuma equipa!",
                  ToastAndroid.SHORT
                )
              }
              style={[
                styles.ButtonDashboardContainer,
                { backgroundColor: "#777" },
              ]}
            >
              <Text style={styles.ButtonDashboardText}>Ver equipa</Text>
              <People
                color="white"
                size={26}
                variant="Bold"
                style={styles.icon}
              />
            </Pressable>
          )}
        </View>
      </>
    );
  }
};

const Metricas = ({ selected }) => {
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const [battery, setBattery] = useState(0);
  const [teams, setTeams] = useState([]);
  const [batteryTeams, setBatteryTeams] = useState(0);
  const [kwh, setKwh] = useState(0);
  const [kwhTeams, setKwhTeams] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users_data")
      .doc(uid)
      .onSnapshot((doc) => {
        setTeams(doc.data().teams);
        setBattery(doc.data().battery);

        if (doc.data().teams.length != 0) {
          firebase
            .firestore()
            .collection("teams")
            .doc(doc.data().teams[0])
            .onSnapshot((element) => {
              setBatteryTeams(element.data().battery);
              setKwh((150 * battery) / 100);
              setKwhTeams((150 * batteryTeams) / 100);
            });
        }
      });
  }, [userData]);

  const metrics = (value) => {
    // 0.15eur -> 1kwh
    let price = value * 0.15;
    console.log("Poupaste ", price.toFixed(2), " euros");
  };

  return (
    <>
      <View style={styles.metricasElement}>
        <View style={styles.metricasCircle}>
          <MoneyRecive color="black" />
        </View>

        {selected == "personal" ? (
          <Text style={styles.metricasElementText}>
            Poupaste {(((150 * battery) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        ) : (
          <Text style={styles.metricasElementText}>
            Pouparam {(((150 * batteryTeams) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        )}
      </View>
      <View style={styles.metricasElement}>
        <View style={styles.metricasCircle}>
          <Car color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricasElementText}>
            Consegues colocar{" "}
            {((((150 * battery) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        ) : (
          <Text style={styles.metricasElementText}>
            Conseguem colocar{" "}
            {((((150 * batteryTeams) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        )}
      </View>
      <View style={styles.metricasElement}>
        <View style={styles.metricasCircle}>
          <Clock color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricasElementText}>
            A energia que poupaste equivale a carregar um portátil por{" "}
            {((((150 * battery) / 100) * 0.15 * 24) / 0.23).toFixed(0)} horas.
          </Text>
        ) : (
          <Text style={styles.metricasElementText}>
            A energia que pouparam equivale a carregar um portátil por{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 24) / 0.23).toFixed(0)}{" "}
            horas.
          </Text>
        )}
      </View>
      <View style={styles.metricasElement}>
        <View style={styles.metricasCircle}>
          <Ticket color="black" />
        </View>
        {selected == "personal" ? (
          <Text style={styles.metricasElementText}>
            O dinheiro que poupaste equivale a{" "}
            {((((150 * battery) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        ) : (
          <Text style={styles.metricasElementText}>
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
        <View>
          {/* Metricas */}
          <Text style={styles.metricasText}>Métricas</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Metricas selected={selected} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
