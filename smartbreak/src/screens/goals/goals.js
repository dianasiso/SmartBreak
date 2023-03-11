import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

// Icons
import { Candle2, ArrowCircleRight } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

// Firebase
import firebase from "./../../config/firebase.js";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Goals() {
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user.userID);
  const uid = userData;
  const navigation = useNavigation();

  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [docs, setDocs] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Geral");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dataDropdwon, setDataDropdown] = useState([
    { label: "Geral", value: "Geral" },
    { label: "Design", value: "Design" },
    { label: "Frontend A", value: "Frontend A" },
    { label: "Backend A", value: "Backend A" },
    { label: "Marketing", value: "Marketing" },
    { label: "Recursos Humanos", value: "Recursos Humanos" },
  ]);

  useEffect(() => {
    try {
      firebase
        .firestore()
        .collection("goals")
        .get()
        .then((documents) => {
          let arrayTemp = [];
          documents.forEach((doc) => {
            // console.log(doc.id)
            // console.log(doc.data())
            arrayTemp.push(doc.data());
          });
          setDocs(arrayTemp);
          // console.log(docs)
        });
    } catch {
      setDocs([]);
    }
  }, []);
  // // MODAL FILTERS SELECTED
  // const [selectedIds, setSelectedIds] = useState([]);

  // const handlePress = (id) => {
  //   let newSelectedIds = [...selectedIds];
  //   if (!selectedIds.includes(id)) {
  //     newSelectedIds.push(id);
  //   } else {
  //     newSelectedIds = newSelectedIds.filter(item => item !== id);
  //   }
  //   setSelectedIds(newSelectedIds);
  // }

  // MOSTRAR FILTROS SELECIONADOS

  // const showFilters = () => {
  //   if (selectedIds.length !== 0) {
  //     const filteredFiltres = filtres.filter(filtro => selectedIds.includes(filtro.id));
  //     return filteredFiltres.map(({ id, label }) => (
  //       <View style={{ ...styles.filtroCaixa, width: 180 }} key={id}>
  //         <Text style={styles.filtroTexto}>{label}</Text>
  //       </View>
  //     ));

  //   } else {
  //     return (
  //       <View ></View>
  //     )
  //   }
  // }

  // const listagem = () => {
  //   return (
  //     <View style={{ width: '90%' }}>
  //       {filtres.map(({ id, label }) => {
  //         const isSelected = selectedIds.includes(id);
  //         return (
  //           <Pressable
  //             style={[
  //               { ...styles.filtroCaixa, width: '100%' },
  //               { backgroundColor: isSelected ? '#558BD1' : 'white' },
  //             ]}
  //             onPress={() => handlePress(id)}
  //           >
  //             <Text style={[
  //               styles.filtroTexto,
  //               { color: isSelected ? 'white' : 'black' }
  //             ]}>
  //               {label}
  //             </Text>
  //           </Pressable>
  //         );
  //       })}
  //     </View>
  //   )
  // }

  // const cancelar = () => {
  //   setModalOpen(false);
  //   setSelectedIds([]);
  // }

  // console.log(selectedIds)

  // IF THERE ARE FILTERS SELECTED OR NOT

  const pressFilter = (x) => {
    if (filtersSelected[x]) {
      filtersSelected[x] = false;
    } else {
      filtersSelected[x] = true;
    }
    forceUpdate();
  };
  const whichPriorityText = (priorityNumber) => {
    if (priorityNumber == 1) {
      return <Text style={[styles.smallText, { fontFamily: "GothamMedium" }]}>Baixa Prioridade</Text>;
    } else if (priorityNumber == 2) {
      return <Text style={[styles.smallText, { fontFamily: "GothamMedium" }]}>Média Prioridade</Text>;
    } else {
      return <Text style={[styles.smallText, { fontFamily: "GothamMedium" }]}>Alta Prioridade</Text>;
    }
  };

  const whichPriorityColor = (priorityNumber) => {
    if (priorityNumber == 1) {
      return CONST.lowPriorityColor; // default color
    } else if (priorityNumber == 2) {
      return CONST.mediumPriorityColor; // medium priority color
    } else {
      return CONST.highPriorityColor; // high priority color
    }
  };

  // ESTILOS NÃO ATUALIZADOS PQ NÃO APARECEM
  const showFilters = (i) => {
    console.log("index ", i);
    if (i == 0) {
      return "<View style={styles.viewPriority}><Text style={styles.textPriority}>Prioridade Crescente</Text></View>";
    } else if (i == 1) {
      return "<View style={styles.viewPriority}><Text style={styles.textPriority}>Prioridade Decrescente</Text></View>";
    } else if (i == 2) {
      return "<View style={styles.viewPriority}><Text style={styles.textPriority}>Data Crescente</Text></View>";
    }
    return "<View style={styles.viewPriority}><Text style={styles.textPriority}>Data Decrescente</Text></View>";
  };

  const [selected, setSelected] = useState("personal");

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

          <Modal
            style={{ margin: 0 }}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >

            <View style={styles.modalBackgroundView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <Pressable
                    style={
                      filtersSelected[0]
                        ? styles.modalFilterSelected
                        : styles.modalFilter
                    }
                    onPress={() => pressFilter(0)}
                  >
                    <Text
                      style={
                        filtersSelected[0]
                          ? styles.modalFilterTextSelect
                          : styles.modalFilterText
                      }
                    >
                      Alta Prioridade
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      filtersSelected[1]
                        ? styles.modalFilterSelected
                        : styles.modalFilter
                    }
                    onPress={() => pressFilter(1)}
                  >
                    <Text
                      style={
                        filtersSelected[1]
                          ? styles.modalFilterTextSelect
                          : styles.modalFilterText
                      }
                    >
                      Média Prioridade
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      filtersSelected[2]
                        ? styles.modalFilterSelected
                        : styles.modalFilter
                    }
                    onPress={() => pressFilter(2)}
                  >
                    <Text
                      style={
                        filtersSelected[2]
                          ? styles.modalFilterTextSelect
                          : styles.modalFilterText
                      }
                    >
                      Baixa Prioridade
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      filtersSelected[3]
                        ? styles.modalFilterSelected
                        : styles.modalFilter
                    }
                    onPress={() => pressFilter(3)}
                  >
                    <Text
                      style={
                        filtersSelected[3]
                          ? styles.modalFilterTextSelect
                          : styles.modalFilterText
                      }
                    >
                      Data crescente
                    </Text>
                  </Pressable>
                  <Pressable
                    style={
                      filtersSelected[4]
                        ? styles.modalFilterSelected
                        : styles.modalFilter
                    }
                    onPress={() => pressFilter(4)}
                  >
                    <Text
                      style={
                        filtersSelected[4]
                          ? styles.modalFilterTextSelect
                          : styles.modalFilterText
                      }
                    >
                      Data decrescente
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: CONST.boxMargin,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setFiltersSelected([]);
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.smallSecondaryButton}
                  >
                    <Text style={styles.smallSecondaryButtonText}>
                      Cancelar
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={styles.smallPrimaryButton}
                  >
                    <Text style={styles.smallPrimaryButtonText}>
                      Aplicar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

          </Modal>
        </View>


        {/*<DropDownPicker
        disabled={true}
        open={openDropdown}
        value={dropdownValue}
        items={dataDropdwon}
        setOpen={setOpenDropdown}
        setValue={setDropdownValue}
        setItems={setDataDropdown}
        style={{
          marginTop: 65,
          backgroundColor: "transparent",
          borderWidth: 0,
          borderBottomWidth: 1,
          paddingBottom: 0,
          fontSize: 16,
          fontFamily: "GothamBook",
        }}
        multiple={false}
        showTickIcon={false}
        closeAfterSelecting={true}
        textStyle={{ fontSize: 16 }}
        dropDownContainerStyle={{
          backgroundColor: "#D2DBE6",
          borderColor: "#000",
          fontFamily: "GothamBook",
          fontSize: 16,
        }}
      />*/}
        <View
          style={styles.modalAlign}
        >
          {/* <View style={{flex: 1,  alignItems: 'center', marginLeft: 0, marginRight: 'auto'}}>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Urgente</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Alta Prioridade</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Média Prioridade</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Baixa Prioridade</Text></View>
      </View> */}
          <View
            style={{
              marginLeft: "auto",
              marginRight: 0,
            }}>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={[styles.modal, selected == "personal"
                ? { backgroundColor: CONST.mainBlue }
                : { backgroundColor: CONST.mainOrange }]}
            >
              <Candle2 color="#FFF" size="24" />
            </Pressable>
          </View>
        </View>

        
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", overflow: "scroll" }}
        >
          {docs &&
            docs.length > 0 &&
            docs.map((callbackfn, id) => (
              <Pressable style={[styles.goals, { borderLeftColor: whichPriorityColor(docs[id].priority) }]} key={id}>
                <View style={styles.goalsBox}>
                  <View style={styles.goalsBoxContent}>
                    <Text style={styles.normalText}>
                      {docs[id].description}
                    </Text>

                    <View style={styles.goalsBoxPriority}>
                      <View>
                        {whichPriorityText(docs[id].priority)}
                      </View>
                      <View style={{ marginRight: 0, marginLeft: "auto" }}>
                        <Text style={[styles.smallText, { fontFamily: "GothamMedium" }]}>{docs[id].date}</Text>
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={{ marginLeft: CONST.boxPadding }}
                    onPress={() =>
                      navigation.navigate("Tips", { goalId: docs[id].id })
                    }
                  >
                    <ArrowCircleRight variant="Bold" color={whichPriorityColor(docs[id].priority)} size="30" />
                  </Pressable>
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

