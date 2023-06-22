import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Icons
import { Candle2 } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";


// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Goals() {

  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1];

  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const navigation = useNavigation();

  const [docs, setDocs] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [filtersSelected, setFiltersSelected] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

    setFilterFlag(false)
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
          console.log("Data: ", data)
          setDocs(data.message);

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
  }, []);
  // // MODAL FILTERS SELECTED

  const applyFilter = async (value) => {
    if (value < 0) {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDocs(data.message);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        //Alert.alert("Error", error.message);
      }
    } else {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/filter/" + value, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDocs(data.message);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
       // Alert.alert("Error", error.message);
      }
    }
  }

  const showFilter = () => {
    return (<View style={dark_mode ? [dark_styles.viewPriority, { backgroundColor: CONST.lightBackgroundColor }]
      : [styles.viewPriority, { backgroundColor: CONST.darkerColor }]}>
      <Text style={dark_mode ? dark_styles.textPriority : styles.textPriority}>{filterText}</Text>
    </View>)
  }

  const whichPriorityText = (priorityNumber) => {
    if (priorityNumber == 1) {
      return <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, { fontFamily: "GothamMedium" }]}>Baixa Prioridade</Text>;
    } else if (priorityNumber == 2) {
      return <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, { fontFamily: "GothamMedium" }]}>Média Prioridade</Text>;
    } else {
      return <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, { fontFamily: "GothamMedium" }]}>Alta Prioridade</Text>;
    }
  };

  const whichPriorityColor = (priorityNumber) => {
    if (priorityNumber == 1) {
      return dark_mode ? CONST.lowPriorityColorDark : CONST.lowPriorityColor; // default color
    } else if (priorityNumber == 2) {
      return dark_mode ? CONST.mediumPriorityColorDark : CONST.mediumPriorityColor; // medium priority color
    } else {
      return dark_mode ? CONST.highPriorityColorDark : CONST.highPriorityColor; // high priority color
    }
  };


  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[
        dark_mode ? dark_styles.mainContainerDark : styles.mainContainerLight,
        { paddingTop: 0},
      ]}
    >
      <View
        style={dark_mode ? dark_styles.containerLight : styles.containerLight}>
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
                <Text style={dark_mode ? dark_styles.modalTextBold : styles.modalTextBold}>
                  Filtrar objetivos por:
                </Text>

              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    setFiltersSelected([false, true, false, false, false])
                    applyFilter(1)
                    setModalVisible(!modalVisible);
                    setFilterFlag(true)
                    setFilterText("Maior prazo")
                  }}
                  style={dark_mode ? [dark_styles.viewPriority, { backgroundColor: CONST.lightBackgroundColor },  filtersSelected[1] ? {opacity: 1} : {opacity: 0.8}] : [styles.viewPriority, { backgroundColor: CONST.darkerColor }, filtersSelected[1] ? {opacity: 1} : {opacity: 0.8}]}><Text style={dark_mode ? dark_styles.textPriority : styles.textPriority}>Maior prazo</Text></Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersSelected([false, false, true, false, false])
                    applyFilter(0)
                    setModalVisible(!modalVisible);
                    setFilterFlag(true)
                    setFilterText("Menor prazo")
                  }}
                  style={dark_mode ? [dark_styles.viewPriority, { backgroundColor: CONST.lightBackgroundColor }, filtersSelected[2] ? {opacity: 1} : {opacity: 0.8}] : [styles.viewPriority, { backgroundColor: CONST.darkerColor }, filtersSelected[2] ? {opacity: 1} : {opacity: 0.8}]}><Text style={dark_mode ? dark_styles.textPriority : styles.textPriority}>Menor prazo</Text></Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersSelected([false, false, false, true, false])
                    applyFilter(3)
                    setModalVisible(!modalVisible);
                    setFilterFlag(true)
                    setFilterText("Maior prioridade")
                  }}
                  style={dark_mode ? [dark_styles.viewPriority, { backgroundColor: CONST.lightBackgroundColor }, filtersSelected[3] ? {opacity: 1} : {opacity: 0.8}] : [styles.viewPriority, { backgroundColor: CONST.darkerColor }, filtersSelected[3] ? {opacity: 1} : {opacity: 0.8}]}><Text style={dark_mode ? dark_styles.textPriority : styles.textPriority}>Maior prioridade</Text></Pressable>
                <Pressable
                  onPress={() => {
                    setFiltersSelected([false, false, false, false, true])
                    applyFilter(2)
                    setModalVisible(!modalVisible);
                    setFilterFlag(true)
                    setFilterText("Menor prioridade")
                  }}
                  style={dark_mode ? [dark_styles.viewPriority, { backgroundColor: CONST.lightBackgroundColor }, filtersSelected[4] ? {opacity: 1} : {opacity: 0.8}] : [styles.viewPriority, { backgroundColor: CONST.darkerColor }, filtersSelected[4] ? {opacity: 1} : {opacity: 0.8}]}><Text style={dark_mode ? dark_styles.textPriority : styles.textPriority}>Menor prioridade</Text></Pressable>
                <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => { setModalVisible(!modalVisible); }}
                  style={{ padding: 10, marginRight: 10 }} >
                  <Text style={{ color: dark_mode ? CONST.thirdBlue : CONST.mainBlue, fontFamily: "GothamMedium" }}>
                    {" "} Cancelar{" "}
                  </Text>
                </Pressable>
                <Pressable 
                onPress = {() => {
                  setFiltersSelected([true, false, false, false, false])
                    applyFilter(-1)
                    setModalVisible(!modalVisible);
                    setFilterFlag(false)
                }}
                style={dark_mode ? dark_styles.buttonAdd : styles.buttonAdd} >
                  <Text style={{ color: dark_mode ? CONST.darkerColor : CONST.whiteText, fontFamily: "GothamMedium" }}>
                    Limpar filtros
                  </Text>
                </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={dark_mode ? dark_styles.modalAlign : styles.modalAlign}
        >
          <View
            style={{
              marginLeft: "auto",
              marginRight: 0,
            }}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
             
              style={[dark_mode ? dark_styles.modal : styles.modal, dark_mode ? { backgroundColor: CONST.thirdBlue }
                : { backgroundColor: CONST.mainBlue }]}
            >
              <Candle2 color={dark_mode ? CONST.darkerColor : CONST.whiteText} size="24" />
              <Text style={[!dark_mode ? dark_styles.normalText : styles.normalText, {marginLeft: 10, fontFamily: 'GothamMedium'}]}>Filtrar objetivos</Text>
            </Pressable>
          </View>
          <View
            style={{
              marginRight: "auto",
              marginLeft: 0,
            }}>

            {filterFlag ? showFilter() : null}
          </View>
        </View>


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", overflow: "scroll" }}
        >
          {docs &&
            docs.length > 0 &&
            docs.map((callbackfn, id) => (
              <Pressable style={[dark_mode ? dark_styles.goals : styles.goals, { borderLeftColor: whichPriorityColor(docs[id].priority) }]} key={docs[id]._id}>
                <View style={dark_mode ? dark_styles.goalsBox : styles.goalsBox}>
                  <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
                    <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
                      {docs[id].description}
                    </Text>

                    <View style={dark_mode ? dark_styles.goalsBoxPriority : styles.goalsBoxPriority}>
                      <View>
                        {whichPriorityText(docs[id].priority)}
                      </View>
                      <View style={{ marginRight: 0, marginLeft: "auto" }}>
                        <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, { fontFamily: "GothamMedium" }]}>{(docs[id].date).substring(0, 10)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

