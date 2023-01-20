import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Pressable} from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Font Gotham
import { useFonts } from 'expo-font';

export default function Tips() {

  const navigation = useNavigation();

  const objetivos = [
    'Diminuir o custo dos gastos de energia da empresa para menos 20%.',
    'Reduzir número de pausas para 3 por dia.',
    'Diminuir a temperatura do ar condicionado para menos 2 graus.',
    'Diminuir as vezes que se inicia a impressora para metade.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const proximo = () => {
    setCurrentIndex(currentIndex + 1);
  }

  const anterior = () => {
    setCurrentIndex(currentIndex - 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>

        <StatusBar style="auto" />

        <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium' }}>
          <View style={{ width: '100%' }}>
            <Text style={styles.titulo}>Objetivos</Text>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>{objetivos[currentIndex]}</Text>

            <View style={[styles.parteBaixo, {justifyContent: currentIndex !== 0 ? 'space-between' : 'flex-end'}]}>
              {currentIndex !== 0 ?
                <Pressable style={{ ...styles.caixaAnterior, width: '50%' }} onPress={anterior}>
                  <Text style={styles.textoAnterior}>Anterior</Text>
                </Pressable>
                : null}

              {currentIndex !== objetivos.length - 1 ?
                <Pressable style={{ ...styles.caixaProxima, width: '50%' }} onPress={proximo}>
                  <Text style={styles.textoProxima}>Proximo</Text>
                </Pressable>
                : null}
            </View>

          </View>
        </View>

        <View style={styles.dicas}>
          <Text style={{ fontFamily: 'GothamMedium', fontSize: 24 }}>Dicas</Text>

          <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium', left: 0 }}>
            <View style={{ width: '100%' }}>
              <Text style={styles.titulo}>Dica 01</Text>
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
              <View style={{ ...styles.parteBaixo, justifyContent: 'end' }}>
                <Pressable style={{ ...styles.caixaProxima, width: '50%' }}>
                  <Text style={styles.textoProxima}>Saber mais</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium', left: 0 }}>
            <View style={{ width: '100%' }}>
              <Text style={styles.titulo}>Dica 02</Text>
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
              <View style={{ ...styles.parteBaixo, justifyContent: 'end' }}>
                <Pressable style={{ ...styles.caixaProxima, width: '50%' }}>
                  <Text style={styles.textoProxima}>Saber mais</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium', left: 0 }}>
            <View style={{ width: '100%' }}>
              <Text style={styles.titulo}>Dica 03</Text>
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 20 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
              <View style={{ ...styles.parteBaixo, justifyContent: 'end' }}>
                <Pressable style={{ ...styles.caixaProxima, width: '50%' }}>
                  <Text style={styles.textoProxima}>Saber mais</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <Button
          title="Go to Goal1"
        /*onPress={() => navigation.navigate('TestGoal')} */
        />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  titulo: {
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: 'GothamMedium',
    fontSize: 16,
  },
  parteBaixo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  caixaAnterior: {
    width: 140,
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginTop: 20,
    padding: 4,
  },
  caixaProxima: {
    width: 140,
    height: 32,
    backgroundColor: '#0051BA',
    borderRadius: 12,
    marginTop: 20,
    padding: 4,
  },
  textoAnterior: {
    alignSelf: 'center',
    color: '#0051BA',
    fontFamily: 'GothamBook',
    paddingTop: 4,
  },
  textoProxima: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'GothamBook',
    paddingTop: 4,
  },
  dicas: {
    left: 25,
    paddingTop: 30,
  }
});