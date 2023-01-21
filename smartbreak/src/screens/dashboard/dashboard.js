import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  RefreshControl,
  Dimensions,
  Text,
  Image,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { AddCircle, People, Clock , CloseCircle} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';

// Firebase
import firebase from "./../../config/firebase.js";

const BatteryToggle = () => {
  const [selected, setSelected] = useState("personal");
  const [pausa, setPausa] = useState(false);

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
          <View style={batteryStyles.batteryContainer}>
            <Image
              source={require("../../imgs/batteryBolt.png")}
              style={batteryStyles.batteryBolt}
            />
          </View>
          <View style={batteryStyles.batteryTip} />
          <View style={batteryStyles.batteryFillPausa} />
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

  return (
    <>
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
      <ButtonDashboard selected={selected} />
    </>
  );
};


const ButtonDashboard = ({ selected }) => {
  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const [pause, setPause] = useState();
  const [battery , setBattery] = useState();
  const [widthBattery, setWidthBattery] = useState();
  const [heightBattery, setHeightBattery] = useState();
  const [batteryTeams , setBatteryTeams] = useState();
  const [widthBatteryTeams, setWidthBatteryTeams] = useState();
  const [heightBatteryTeams, setHeightBatteryTeams] = useState();

  const [dropdownValue, setDropdownValue] = useState('Equipa');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [teams, setTeams] = useState();
  const teamsDropdown = [];

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
        setHeightBattery(70)
      } else if (temp < 6) {
        setHeightBattery(76)
      } else if (temp < 9) {
        setHeightBattery(82)
      } else if (temp < 12) {
        setHeightBattery(79)
      } else {
        setHeightBattery(88)
      }
      setWidthBattery((temp*163/100));

      console.log(doc.data().teams)

      teams.map((item) => {
        firebase
        .firestore()
        .collection("teams")
        .doc(item)
        .get()
        .then((element) => {
          let tempTeam = element.data().battery;
          setBatteryTeams(temp);
          // width max é 163
          // temp -> 100 
          // width -> 163
          if (tempTeam < 3) {
            setHeightBatteryTeams(70)
          } else if (tempTeam < 6) {
            setHeightBatteryTeams(76)
          } else if (tempTeam < 9) {
            setHeightBatteryTeams(82)
          } else if (tempTeam < 12) {
            setHeightBatteryTeams(79)
          } else {
            setHeightBatteryTeams(88)
          }
          setWidthBatteryTeams((tempTeam*163/100));


          console.log(element.data().name)
          teamsDropdown.push({
            label : element.data().name,
            value : item,
          })
        })
      })

      setDropdownValue(teams[0]);
    });
  }, [userData]);

  const navigation = useNavigation();

  if (selected === "personal") {
    if (!pause) {
      return (
        <>
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <View style={[batteryStyles.batteryFill, {width: widthBattery, height: heightBattery}]} />
        </View>
        <View style={ButtonDashboardStyles.ButtonDashboardView}>
          <Pressable onPress={() => {
             firebase.firestore().collection('users_data').doc(uid).update({
              pause : !pause,
            })
            setPause(true)
          }} style={ButtonDashboardStyles.ButtonDashboardContainer}>
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
        <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <Image
            source={require("./../../imgs/img_battery_pause.png")}
            style={{
              position: 'absolute',
              zIndex: 100,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
          <View style={[batteryStyles.batteryFillPause, {width: widthBattery, height: heightBattery}]} />
        </View>
        <View style={ButtonDashboardStyles.ButtonDashboardView}>
          <Pressable onPress={() => {
            firebase.firestore().collection('users_data').doc(uid).update({
              pause : !pause,
              battery : (battery + 3)
            })
            firebase.firestore().collection('teams').doc(teams[0]).update({
              battery : (batteryTeams + 3)
            })
            if (battery < 3) {
              setHeightBattery(70)
            } else if (battery < 6) {
              setHeightBattery(76)
            } else if (battery < 9) {
              setHeightBattery(82)
            } else if (battery < 12) {
              setHeightBattery(79)
            } else {
              setHeightBattery(88)
            }
            if (battery + 3 > 100) {
              setBattery(0)
              setWidthBattery(0);
            } else {
              setBattery((battery + 3))
              setWidthBattery((battery*163/100));
            }
           
            setPause(false)
          }} style={ButtonDashboardStyles.ButtonDashboardContainer}>
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
       {/* <DropDownPicker 
        open={openDropdown}
        value={dropdownValue}
        items={teams}
        setOpen={setOpenDropdown}
        setValue={setDropdownValue}
        setItems={setTeams}
        style={{
          top: 85,
          backgroundColor: 'transparent', 
          borderWidth: 0,
          borderBottomWidth: 1,
          paddingBottom: 0,
          fontSize: 16,
          fontFamily: 'GothamBook'
        }}
        multiple={false}
        showTickIcon={false}
        closeAfterSelecting={true}
        textStyle={{ fontSize: 16 }}
        dropDownContainerStyle={{
          backgroundColor: "#D2DBE6",
          borderColor: '#000',
          fontFamily: 'GothamBook',
          fontSize: 16,
          }}
      />  */}
      <View style={batteryStyles.batteryView}>
          <View style={batteryStyles.batteryContainer} />
          <View style={batteryStyles.batteryTip} />
          <View style={[batteryStyles.batteryFill, {width: widthBatteryTeams, height: heightBatteryTeams}]} />
        </View>
      <View style={ButtonDashboardStyles.ButtonDashboardView}>
        <Pressable
          onPress={() => navigation.navigate("TeamDashboard")}
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
      </View>
      </>
    );
  }
};

const Metricas = () => {
  return (
    <View style={metricasStyles.metricasContainer}>
      <Text style={metricasStyles.metricasText}>Métricas</Text>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black"  />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
      <View style={metricasStyles.metricasElement}>
        <View style={metricasStyles.iconContainer}>
          <Clock color="black" variant="Bold" />
        </View>
        <Text style={metricasStyles.metricasElementText}>
          Carregar um portátil durante 2 horas
        </Text>
      </View>
    </View>
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
  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  return (
    <SafeAreaView style={dashboardStyles.pageContainer}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <View>
          <BatteryToggle />
          <Metricas />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const screenWidth = Dimensions.get('window').width;


const dashboardStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
    alignItems: "center",
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
    backgroundColor: "white",
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
    left: 93,
  },
  batteryFillPause: {
    // height: 88,
    // width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 16,
    position: "absolute",
    left: 93,
  },
  batteryFillPausa: {
    height: 88,
    width: 90, //máximo 163
    backgroundColor: "#E3ECF7",
    borderRadius: 18,
    position: "absolute",
    left: 82,
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
    width: (screenWidth - 50)/2 - 5,
    height: 25,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    alignSelf: "center",
  },
  toggleSelectorRight: {
    width: (screenWidth - 50)/2 - 5,
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
    textAlign: 'left',
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
  metricasContainer: {
    alignSelf: "flex-start",
    marginTop: 60,
  },
  metricasText: {
    fontSize: 20,
    fontFamily: "GothamMedium",
  },
  metricasElement: {
    width: screenWidth - 50,
    backgroundColor: "#E3ECF7",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    paddingLeft: 25,
    //justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  metricasElementText: {
    fontSize: 15,
    fontFamily: "GothamBook",
    marginLeft: 10,
    lineHeight: 20,
  },
});
