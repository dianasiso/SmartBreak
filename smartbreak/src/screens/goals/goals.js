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

  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

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
  const whichPriority = (priorityNumber) => {
    if (priorityNumber == 1) {
      return <Text style={styles.textPriority}>Baixa Prioridade</Text>;
    } else if (priorityNumber == 2) {
      return <Text style={styles.textPriority}>Média Prioridade</Text>;
    } else if (priorityNumber == 3) {
      return <Text style={styles.textPriority}>Alta Prioridade</Text>;
    } else {
      return <Text style={styles.textPriority}>Urgente</Text>;
    }
  };

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

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        style={{ margin: 0 }}
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
                  Urgente
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
                  Alta Prioridade
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
                  Média Prioridade
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
                  Baixa Prioridade
                </Text>
              </Pressable>
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
                  setFiltersSelected([]);
                  setModalVisible(!modalVisible);
                }}
                style={{ padding: 10, marginRight: 10 }}
              >
                <Text style={{ color: "#0051ba", fontFamily: "GothamMedium" }}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={styles.buttonAdd}
              >
                <Text style={{ color: "#FFF", fontFamily: "GothamMedium" }}>
                  Aplicar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <DropDownPicker
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
      />
      <View
        style={{
          flexDirection: "row",
          marginBottom: 30,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        {/* <View style={{flex: 1,  alignItems: 'center', marginLeft: 0, marginRight: 'auto'}}>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Urgente</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Alta Prioridade</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Média Prioridade</Text></View>
        <View style={styles.viewPriority}><Text style={styles.textPriority}>Baixa Prioridade</Text></View>
      </View> */}
        <View style={{ marginLeft: "auto", marginRight: 0 }}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              marginRight: 0,
              marginLeft: "auto",
              backgroundColor: "#0051ba",
              padding: 8,
              borderRadius: 8,
            }}
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
            <Pressable style={styles.options} key={id}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: "auto",
                  marginBottom: "auto",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginRight: 5,
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Text style={styles.textDescription}>
                    {docs[id].description}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <View style={styles.viewPriority}>
                      {whichPriority(docs[id].priority)}
                    </View>
                    <View style={{ marginRight: 0, marginLeft: "auto" }}>
                      <Text style={styles.textDetails}>{docs[id].date}</Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  style={styles.arrow}
                  onPress={() =>
                    navigation.navigate("Tips", { goalId: docs[id].id })
                  }
                >
                  <ArrowCircleRight variant="Bold" color="#0051ba" size="40" />
                </Pressable>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  options: {
    flex: 1,
    marginBottom: 30,
    borderRadius: 15,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 15,
    width: screenWidth - 50,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    backgroundColor: "#E3ECF7",
  },

  textDescription: {
    fontFamily: "GothamBook",
    fontSize: 16,
  },

  textDetails: {
    fontFamily: "GothamMedium",
    fontSize: 12,
  },
  textPriority: {
    fontFamily: "GothamBook",
    color: "#FFF",
    fontSize: 12,
  },

  viewPriority: {
    marginRight: "auto",
    marginLeft: 0,
    backgroundColor: "#0051ba",
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 1,
  },

  modalFilterText: {
    fontFamily: "GothamBook",
    color: "#0051ba",
    fontSize: 12,
  },

  modalFilterTextSelect: {
    fontFamily: "GothamBook",
    color: "#FFF",
    fontSize: 12,
  },

  modalFilter: {
    marginRight: "auto",
    marginLeft: 0,
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  modalFilterSelected: {
    marginRight: "auto",
    marginLeft: 0,
    backgroundColor: "#0051ba",
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  button: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    width: screenWidth - 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "#0051ba",
  },

  textButton: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
    color: "#FFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalText: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 0,
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

  arrow: {
    marginLeft: 15,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth,
//     height: screenHeight,
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 65,
//   },
//   dropdown: {
//     width: '86%',
//     height: 50,
//     borderBottomWidth: 2,
//     paddingHorizontal: 8,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 20,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//     borderBottom: 'black',
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   filersArea: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '86%',
//     marginLeft: 25,
//     marginTop: 24,
//     marginBottom: 4,
//     alignItems: 'center'
//   },
//   filters: {
//     backgroundColor: '#0051BA',
//     width: 44,
//     height: 44,
//     borderRadius: 8,
//     display: 'flex',
//     flexWrap: 'nowrap',
//     justifyContent: 'center',
//     elevation: 2
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     left: 325,
//     top: 123,
//     alignSelf: 'center',
//   },
//   centeredView: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 0,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "#E3ECF7",
//     borderRadius: 14,
//     padding: 25,
//     width: '80%',
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.20,
//     shadowRadius: 5,
//     elevation: 5
//   },
//   objetivosCaixa: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     left: 25,
//     width: '86%',
//     backgroundColor: '#e3ecf7',
//     borderRadius: 14,
//     padding: 15,
//     marginTop: 20,
//     marginBottom: 20,
//     // height: '8%'
//   },
//   filtroCaixa: {
//     width: 140,
//     height: 25,
//     backgroundColor: '#0051BA',
//     borderRadius: 12,
//     marginTop: 15,
//     padding: 4,
//   },
//   filtroTexto: {
//     alignSelf: 'center',
//     color: 'white',
//     fontFamily: 'GothamBook',
//   },
//   seta: {
//     backgroundColor: '#0051BA',
//     borderRadius: 25,
//     width: 25,
//     height: 25,
//   },
//   parteBaixo: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     justifyContent: 'space-between',
//     alignItems: 'baseline',
//   },
// });
