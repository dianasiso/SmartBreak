import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Icons
import { Candle2, ArrowRight2 } from "iconsax-react-native";

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

  const [visibleModal, setVisibleModal] = useState(false)
  const handleModal = () => setVisibleModal(() => !visibleModal);

  return (
    <View style={styles.container}>
      {renderItens()}
      <Dropdown
        data={data}
        style={[styles.dropdown, focus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={300}
        search
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
      <StatusBar style="auto" />



      <View style={styles.filtrosArea}>
        <View style={styles.filtroCaixa}>
          <Text style={styles.filtroTexto}>Urgente</Text>
        </View>
        <TouchableOpacity style={styles.filtros} onPress={handleModal}>
          <Candle2 color='white' style={styles.icon}></Candle2>
        </TouchableOpacity>
      </View>



      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Urgente</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>31/01/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Reduzir número de pausas para 3 por dia.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Alta prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>15/05/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir a temperatura do ar condicionado para menos 2 graus.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Baixa prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>29/03/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Baixa prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Baixa prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Baixa prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
        </View>
      </View>

      <View style={styles.objetivosCaixa}>
        <View style={{ width: 275 }}>
          <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir as vezes que se inicia a impressora para metade.</Text>
          <View style={styles.parteBaixo}>
            <View style={styles.filtroCaixa}>
              <Text style={styles.filtroTexto}>Baixa prioridade</Text>
            </View>
            <Text style={{ fontFamily: 'GothamMedium', fontSize: 14 }}>03/08/23</Text>
          </View>
        </View>

        <View style={styles.seta}>
          <ArrowRight2 color='white' style={{ width: 20, alignSelf: 'center' }}></ArrowRight2>
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
    paddingTop: 65,
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
  filtrosArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
    marginLeft: 25,
    marginTop: 24,
    marginBottom: 4,
  },
  filtros: {
    backgroundColor: '#0051BA',
    width: 44,
    height: 44,
    borderRadius: 8,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    left: 325,
    top: 123,
    alignSelf: 'center',
  },
  objetivosCaixa: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 25,
    width: 340,
    backgroundColor: '#e3ecf7',
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  filtroCaixa: {
    width: 140,
    height: 25,
    backgroundColor: '#0051BA',
    borderRadius: 12,
    marginTop: 15,
  },
  filtroTexto: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'GothamBook',
    paddingTop: 3,
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
  }
});