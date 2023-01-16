import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Pressable , TouchableHighlight, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

// Icons
import { Candle2, ArrowRight2 } from "iconsax-react-native";

// Font Gotham
import { useFonts } from 'expo-font';
import { Alert } from 'react-native-web';

export default function Goals() {

  const navigation = useNavigation();

  // DROPDOWN
  const data = [
    { label: 'Design', value: '1' },
    { label: 'Frontend', value: '2' },
    { label: 'Backend', value: '3' },
    { label: 'Marketing', value: '4' },
    { label: 'Recursos Humanos', value: '5' },
  ];

  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);


  // MODAL

  const [modalOpen, setModalOpen] = useState(false);

  const filtros = [
    { id: '1', label: 'Prioridade crescente', selected: false },
    { id: '2', label: 'Prioridade decrescente', selected: false },
    { id: '3', label: 'Data crescente', selected: false },
    { id: '4', label: 'Data decrescente', selected: false },
    { id: '5', label: 'Por cumprir', selected: false },
    { id: '6', label: 'Cumprido', selected: false },
  ]

  // MODAL FILTERS SELECTED
  const [selectedIds, setSelectedIds] = useState([]);

  const handlePress = (id) => {
    let newSelectedIds = [...selectedIds];
    if (!selectedIds.includes(id)) {
      newSelectedIds.push(id);
    } else {
      newSelectedIds = newSelectedIds.filter(item => item !== id);
    }
    setSelectedIds(newSelectedIds);
  }

  // MOSTRAR FILTROS SELECIONADOS

  const mostrarFiltros = () => {
    if (selectedIds.length !== 0) {
      const filteredFiltros = filtros.filter(filtro => selectedIds.includes(filtro.id));
      return filteredFiltros.map(({ id, label }) => (
        <View style={{ ...styles.filtroCaixa, width: 180 }} key={id}>
          <Text style={styles.filtroTexto}>{label}</Text>
        </View>
      ));

    } else {
      return (
        <View ></View>
      )
    }
  }

  const listagem = () => {
    return (
      <View style={{ width: '90%' }}>
        {filtros.map(({ id, label }) => {
          const isSelected = selectedIds.includes(id);
          return (
            <Pressable
              style={[
                { ...styles.filtroCaixa, width: '100%' },
                { backgroundColor: isSelected ? '#558BD1' : 'white' },
              ]}
              onPress={() => handlePress(id)}
            >
              <Text style={[
                styles.filtroTexto,
                { color: isSelected ? 'white' : 'black' }
              ]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    )
  }

  const cancelar = () => {
    setModalOpen(false);
    setSelectedIds([]);
  }

  console.log(selectedIds)

  // IF THERE ARE FILTERS SELECTED OR NOT

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Dropdown
            data={data}
            style={[styles.dropdown, focus]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={!focus ? 'Equipa' : '...'}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={item => {
              setValue(item.value);
              setFocus(false);
            }}
          />
        </View>

        <StatusBar style="auto" />


        <View style={styles.filtrosArea}>
          <View>
            {mostrarFiltros()}
          </View>

          <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalOpen}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalOpen);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {listagem()}
                  <View style={{ ...styles.filtrosArea, marginLeft: 0 }}>
                    <Pressable onPress={() => cancelar()} >
                      <Text style={{ color: '#0051BA', fontFamily: 'GothamMedium', paddingTop: 15 }}>Cancelar</Text>
                    </Pressable>
                    <Pressable onPress={() => setModalOpen(false)} style={{ ...styles.filtroCaixa, width: '50%' }}>
                      <Text style={styles.filtroTexto}>Aplicar</Text>
                    </Pressable>
                  </View>

                </View>
              </View>
            </Modal>

            <Pressable style={styles.filtros} underlayColor={'#FF00FF'} onPress={() => setModalOpen(true)}>
              <Candle2 color='white' style={styles.icon}></Candle2>
            </Pressable>
          </View>
        </View>



        <View style={styles.objetivosCaixa}>
          <View style={{ width: '85%' }}>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20}}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
            <View style={styles.parteBaixo}>
              <View style={styles.filtroCaixa}>
                <Text style={styles.filtroTexto}>Urgente</Text>
              </View>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>31/01/23</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.seta} onPress={() => navigation.navigate("Dicas")}>
            <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
          </TouchableHighlight>
        </View>

        <View style={styles.objetivosCaixa}>
          <View style={{ width: '85%' }}>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Reduzir número de pausas para 3 por dia.</Text>
            <View style={styles.parteBaixo}>
              <View style={styles.filtroCaixa}>
                <Text style={styles.filtroTexto}>Alta prioridade</Text>
              </View>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>15/05/23</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.seta} onPress={() => navigation.navigate("Dicas")}>
            <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
          </TouchableHighlight>
        </View>

        <View style={styles.objetivosCaixa}>
          <View style={{ width: '85%' }}>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir a temperatura do ar condicionado para menos 2 graus.</Text>
            <View style={styles.parteBaixo}>
              <View style={styles.filtroCaixa}>
                <Text style={styles.filtroTexto}>Baixa prioridade</Text>
              </View>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>29/03/23</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.seta} onPress={() => navigation.navigate("Dicas")}>
            <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
          </TouchableHighlight>
        </View>

        <View style={styles.objetivosCaixa}>
          <View style={{ width: '85%' }}>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
            <View style={styles.parteBaixo}>
              <View style={styles.filtroCaixa}>
                <Text style={styles.filtroTexto}>Baixa prioridade</Text>
              </View>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.seta} onPress={() => navigation.navigate("Dicas")}>
            <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
          </TouchableHighlight>
        </View>

        <View style={styles.objetivosCaixa}>
          <View style={{ width: '85%' }}>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
            <View style={styles.parteBaixo}>
              <View style={styles.filtroCaixa}>
                <Text style={styles.filtroTexto}>Baixa prioridade</Text>
              </View>
              <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.seta} onPress={() => navigation.navigate("Dicas")}>
            <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 65,
  },
  dropdown: {
    width: '86%',
    height: 50,
    borderBottomWidth: 2,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 20,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderBottom: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  filtrosArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%',
    marginLeft: 25,
    marginTop: 24,
    marginBottom: 4,
    alignItems: 'center'
  },
  filtros: {
    backgroundColor: '#0051BA',
    width: 44,
    height: 44,
    borderRadius: 8,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    elevation: 2
  },
  icon: {
    width: 30,
    height: 30,
    left: 325,
    top: 123,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#E3ECF7",
    borderRadius: 14,
    padding: 25,
    width: '80%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.20,
    shadowRadius: 5,
    elevation: 5
  },
  objetivosCaixa: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 25,
    width: '86%',
    backgroundColor: '#e3ecf7',
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    // height: '8%'
  },
  filtroCaixa: {
    width: 140,
    height: 25,
    backgroundColor: '#0051BA',
    borderRadius: 12,
    marginTop: 15,
    padding: 4,
  },
  filtroTexto: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'GothamBook',
  },
  seta: {
    backgroundColor: '#0051BA',
    borderRadius: 25,
    width: 25,
    height: 25,
  },
  parteBaixo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});