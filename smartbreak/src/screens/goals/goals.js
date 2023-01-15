import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import { useNavigation } from "@react-navigation/native";

// Font Gotham
import { useFonts } from 'expo-font';
import { Alert } from 'react-native-web';

export default function Goals() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.area}>

        <StatusBar style="auto" />

        <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium' }}>
          <View style={{ width: '100%' }}>
            <Text style={styles.titulo}>Objetivo</Text>
            <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
            <View style={styles.parteBaixo}>
              <Pressable style={{ ...styles.caixaCancelar, width: '50%' }}>
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>
              <Pressable style={{ ...styles.caixaProxima, width: '50%' }}>
                <Text style={styles.textoProxima}>Proxima</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.dicas}>
          <Text style={{ fontFamily: 'GothamMedium', fontSize: 24 }}>Dicas</Text>

          <View style={{ ...styles.objetivosCaixa, fontFamily: 'GothamMedium', left: 0 }}>
            <View style={{ width: '100%' }}>
              <Text style={styles.titulo}>Dica 01</Text>
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
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
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
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
              <Text style={{ fontFamily: 'GothamBook', fontSize: 14 }}>Diminuir o custo dos gastos de energia da empresa para menos 20%.</Text>
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
    paddingTop: 65,
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
  caixaCancelar: {
    width: 140,
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginTop: 15,
    padding: 4,
  },
  caixaProxima: {
    width: 140,
    height: 32,
    backgroundColor: '#0051BA',
    borderRadius: 12,
    marginTop: 15,
    padding: 4,
  },
  textoCancelar: {
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