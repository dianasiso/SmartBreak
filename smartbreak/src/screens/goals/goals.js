import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Icons
import { Candle2, Icon } from "iconsax-react-native";

// Font Gotham
import { useFonts } from 'expo-font';

export default function Goals() {

  const data = [
    { label: 'Design', value: '1' },
    { label: 'Frontend', value: '2' },
    { label: 'Backend', value: '3' },
    { label: 'Marketing', value: '4' },
    { label: 'Recursos Humanos', value: '5' },
  ];

  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);

  const renderItens = () => {
    if (value || focus) {
      return (
        <Text> Equipa</Text>
      )
    }
    return null;
  }

  return (
    <View style={styles.container}>
      {renderItens()}
      <Dropdown
        data={data}
        style= {[styles.dropdown, focus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={300}
        search
        labelField= 'label'
        valueField='value'
        placeholder= {!focus ? 'Equipa' : '...'}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange= {item => {
          setValue(item.value);
          setFocus(false);
        }}
      />
      <StatusBar style="auto" />
      <View>
        <TouchableOpacity style={styles.filtros}>
        <Candle2 color='white' style= {styles.icon}></Candle2>
      </TouchableOpacity>
      </View>

      <View style={styles.objetivos}>
        <Text>Diminuir o custo dos gastos de energia da empresa para menos 20%</Text>
        <View style={styles.filtroCaixa}>
          <Text>Urgente</Text>
        </View>
      </View>
      
      
      <Button
        title="Go to Goal1"
      /*onPress={() => navigation.navigate('TestGoal')} */
      /> 
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
    borderWidth: 0.5,
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
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  filtros: {
    backgroundColor: '#0051BA',
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
    left: 325,
    top: 123
  },
  objetivos: {
    left: 25,
    width: 340,
    backgroundColor: '#e3ecf7',
    borderRadius: 14,
    padding: 10,
  },
  filtroCaixa: {
    width: 56,
    height: 15,
    fontSize: 14,
    color: '#0051BA',
  }
});