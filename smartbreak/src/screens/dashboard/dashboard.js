import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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
  AddCircle,
  People,
  Clock,
  CloseCircle,
  Ticket,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

//screenOrientation
import * as ScreenOrientation from "expo-screen-orientation";


// Firebase
import firebase from "./../../config/firebase.js";
  const Battery = ({ selected }) => {
    if (pausa === false) {
      return (
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <View style={batteryStyles.batteryFill} />
        </View>
      );
    } else {
      return (
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryFillPausa} />
          <View style={batteryStyles.batteryContainer}>
            <Image
              source={require("../../imgs/batteryBolt.png")}
              style={batteryStyles.batteryBolt}
            />
          </View>
          <View style={batteryStyles.batteryTip} />
          
        </View>
      );
    }
  };

  const AdicionarPausa = ({ selected }) => {
    const navigation = useNavigation();
    if (selected === "personal") {
      return (
        <View style={adicionarPausaStyles.adicionarPausaView}>
          <Pressable
            onPress={() => {
              setPausa(!pausa);
            }}
            style={adicionarPausaStyles.adicionarPausaContainer}
          >
            <Text style={adicionarPausaStyles.adicionarPausaText}>
              {pausa ? "Terminar Pausa" : "Adicionar Pausa"}
            </Text>
            {pausa ? (
              <CloseCircle
                color="white"
                size={26}
                variant="Bold"
                style={adicionarPausaStyles.icon}
              />
            ) : (
              <AddCircle
                color="white"
                size={26}
                variant="Bold"
                style={adicionarPausaStyles.icon}
              />
            )}
          </Pressable>
        </View>
      );
    } else if (selected === "team") {
      return (
        <View style={adicionarPausaStyles.adicionarPausaView}>
          <Pressable
            onPress={() => navigation.navigate("TeamDashboard")}
            style={adicionarPausaStyles.adicionarPausaContainer}
          >
            <Text style={adicionarPausaStyles.adicionarPausaText}>
              Ver equipa
            </Text>
            <People
              color="white"
              size={26}
              variant="Bold"
              style={adicionarPausaStyles.icon}
            />
          </Pressable>
        </View>
      );
    }
  };


const BatteryToggle = () => {
  const [selected, setSelected] = useState("personal");
  return (
    <>
      {/* Toggle */}
      <View style={toggleStyles.toggleView}>
        <View style={toggleStyles.toggleContainer}>
          <Pressable
            style={[
              toggleStyles.toggleSelectorLeft,
              selected === "personal"
                ? toggleStyles.selected
                : toggleStyles.notSelected,
            ]}
            onPress={() => setSelected("personal")}
          >
            <Text style={toggleStyles.toggleText}>Bateria pessoal</Text>
          </Pressable>
          <Pressable
            style={[
              toggleStyles.toggleSelectorRight,
              selected === "team"
                ? toggleStyles.selected
                : toggleStyles.notSelected,
            ]}
            onPress={() => setSelected("team")}
          >
            <Text style={toggleStyles.toggleText}>Bateria da equipa</Text>
          </Pressable>
        </View>
      </View>

      {/* Battery */}
      <ButtonDashboard selected={selected} />
      {/* Metricas */}
      <Text style={metricasStyles.metricasText}>Métricas</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Metricas selected={selected} />
      </ScrollView>
    </>
  );
};

const ButtonDashboard = ({ selected }) => {
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
        
          setHeightBatteryTeams(0)
          setWidthBatteryTeams(0)
          setBatteryTeamsTeams(0)

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
            <View style={dashboardStyles.centeredView}>
              <View style={dashboardStyles.modalView}>
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <Text style={dashboardStyles.modalTextBold}>
                    Tem a certeza que pretende adicionar uma pausa?
                  </Text>
                  <Text style={dashboardStyles.modalText}>
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
                    style={dashboardStyles.buttonAdd}
                  >
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                      Adicionar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View style={batteryStyles.batteryView}>
            <View style={batteryStyles.batteryContainer} />
            <View style={batteryStyles.batteryTip} />
            <View
              style={[
                batteryStyles.batteryFill,
                { width: widthBattery, height: heightBattery },
              ]}
            />
          </View>
          <View style={ButtonDashboardStyles.ButtonDashboardView}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={ButtonDashboardStyles.ButtonDashboardContainer}
            >
              <Text style={ButtonDashboardStyles.ButtonDashboardText}>
                Adicionar pausa
              </Text>
              <AddCircle
                color="white"
                size={26}
                variant="Bold"
                style={ButtonDashboardStyles.icon}
              />
            </Pressable>
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
            <View style={dashboardStyles.centeredView}>
              <View style={dashboardStyles.modalView}>
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <Text style={dashboardStyles.modalTextBold}>
                    Tem a certeza que pretende terminar a sua pausa?{" "}
                  </Text>
                  <Text style={dashboardStyles.modalText}>
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
                    style={dashboardStyles.buttonAdd}
                  >
                    <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                      Terminar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <View style={batteryStyles.batteryView}>
            <View style={batteryStyles.batteryContainer} />
            <View style={batteryStyles.batteryTip} />
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
                batteryStyles.batteryFillPause,
                { width: widthBattery, height: heightBattery },
              ]}
            />
          </View>
          <View style={ButtonDashboardStyles.ButtonDashboardView}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={ButtonDashboardStyles.ButtonDashboardContainer}
            >
              <Text style={ButtonDashboardStyles.ButtonDashboardText}>
                Terminar pausa
              </Text>
              <CloseCircle
                color="white"
                size={26}
                variant="Bold"
                style={ButtonDashboardStyles.icon}
              />
            </Pressable>
          </View>
        </>
      );
    }
  } else {
    return (
      <>
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <View
            style={[
              batteryStyles.batteryFill,
              { width: widthBatteryTeams, height: heightBatteryTeams },
            ]}
          />
        </View>
        <View style={ButtonDashboardStyles.ButtonDashboardView}>
          {teams[0] ? 
          <Pressable
            onPress={() =>
              navigation.navigate("TeamDashboard", { teamId: teams[0] })
            }
            style={ButtonDashboardStyles.ButtonDashboardContainer}
          >
            <Text style={ButtonDashboardStyles.ButtonDashboardText}>
              Ver equipa
            </Text>
            <People
              color="white"
              size={26}
              variant="Bold"
              style={ButtonDashboardStyles.icon}
            />
          </Pressable>
          :
          <Pressable
            onPress={() => 
              ToastAndroid.show(
                "Não está em nenhuma equipa!",
                ToastAndroid.SHORT
              )
            }
            style={[ButtonDashboardStyles.ButtonDashboardContainer, {backgroundColor: "#777"}]}
          >
            <Text style={ButtonDashboardStyles.ButtonDashboardText}>
              Ver equipa
            </Text>
            <People
              color="white"
              size={26}
              variant="Bold"
              style={ButtonDashboardStyles.icon}
            />
          </Pressable>
          }
          
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
      <View style={metricasStyles.metricasElement}>
        <MoneyRecive color="black" />
        {selected == "personal" ? (
          <Text style={metricasStyles.metricasElementText}>
            Poupaste {(((150 * battery) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        ) : (
          <Text style={metricasStyles.metricasElementText}>
            Pouparam {(((150 * batteryTeams) / 100) * 0.15).toFixed(2)} euros.
          </Text>
        )}
      </View>
      <View style={metricasStyles.metricasElement}>
        <Car color="black" />
        {selected == "personal" ? (
          <Text style={metricasStyles.metricasElementText}>
            Consegues colocar{" "}
            {((((150 * battery) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        ) : (
          <Text style={metricasStyles.metricasElementText}>
            Conseguem colocar{" "}
            {((((150 * batteryTeams) / 100) * 0.15) / 1.6).toFixed(2)} litros de
            combustível.
          </Text>
        )}
      </View>
      <View style={metricasStyles.metricasElement}>
        <Clock color="black" />
        {selected == "personal" ? (
          <Text style={metricasStyles.metricasElementText}>
            A energia que poupaste equivale a carregar um portátil por{" "}
            {((((150 * battery) / 100) * 0.15 * 24) / 0.23).toFixed(0)} horas.
          </Text>
        ) : (
          <Text style={metricasStyles.metricasElementText}>
            A energia que pouparam equivale a carregar um portátil por{" "}
            {((((150 * batteryTeams) / 100) * 0.15 * 24) / 0.23).toFixed(0)}{" "}
            horas.
          </Text>
        )}
      </View>
      <View style={metricasStyles.metricasElement}>
        <Ticket color="black" />
        {selected == "personal" ? (
          <Text style={metricasStyles.metricasElementText}>
            O dinheiro que poupaste equivale a{" "}
            {((((150 * battery) / 100) * 0.15 * 60) / 125).toFixed(2)}{" "}
            refeições.
          </Text>
        ) : (
          <Text style={metricasStyles.metricasElementText}>
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

  return (
    <SafeAreaView style={dashboardStyles.pageContainer}>
      <StatusBar style="auto" />
      <View
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <BatteryToggle />
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;

const dashboardStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingLeft: 25,
    paddingRight: 25,
  },
  modalView: {
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  modalTextBold: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalText: {
    fontFamily: "GothamBook",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonAdd: {
    backgroundColor: "#0051ba",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
});

const batteryStyles = StyleSheet.create({
  batteryView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },
  batteryContainer: {
    height: 100.5,
    width: 175,
    borderRadius: 22,
    borderColor: "black",
    borderWidth: 2.5,
  },
  batteryBolt: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    width: 94,
    height: 94,
  },
  batteryTip: {
    height: 30,
    width: 10,
    backgroundColor: "black",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "black",
    borderWidth: 2.5,
    marginLeft: 4,
  },
  batteryFill: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: "#0051BA",
    borderRadius: 16,
    position: "absolute",
    left: screenWidth / 2 - 112,
  },
  batteryFillPause: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 16,
    position: "absolute",
    left: screenWidth / 2 - 112,
  },
});

const toggleStyles = StyleSheet.create({
  toggleView: {
    top: 65,
    alignItems: "center",
    flexDirection: "row",
  },
  toggleContainer: {
    width: screenWidth - 50,
    height: 35,
    backgroundColor: "#E3ECF7",
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toggleSelectorLeft: {
    width: (screenWidth - 50) / 2 - 5,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    alignSelf: "center",
  },
  toggleSelectorRight: {
    width: (screenWidth - 50) / 2 - 5,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    alignSelf: "center",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "GothamBook",
  },
  selected: {
    backgroundColor: "white",
  },
  notSelected: {
    backgroundColor: "transparent",
  },
});

const ButtonDashboardStyles = StyleSheet.create({
  ButtonDashboardView: {
    marginTop: 60,
    marginBottom: 60,
  },
  ButtonDashboardContainer: {
    backgroundColor: "#0051BA",
    width: screenWidth - 50,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  ButtonDashboardText: {
    color: "white",
    fontSize: 16,
    fontFamily: "GothamMedium",
    textAlign: "left",
    padding: 15,
    paddingLeft: 20,
  },
  icon: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: 20,
  },
});

const metricasStyles = StyleSheet.create({
  metricasText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
    marginBottom: 18,
  },
  metricasElement: {
    width: screenWidth - 50,
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  metricasElementText: {
    fontSize: 15,
    fontFamily: "GothamBook",
    paddingLeft: 15,
    paddingRight: 25,
    lineHeight: 20,
  },
});
