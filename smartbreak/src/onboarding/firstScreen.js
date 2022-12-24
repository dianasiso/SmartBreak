import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FirstScreen() {
  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '50px',
    padingLeft: '25px',
    paddingRight: '25px',
    flex: 1,
    backgroundColor: '#0051BA',
    alignItems: 'center'
  },
});
