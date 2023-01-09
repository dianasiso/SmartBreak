import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Goals() {
  return (
    <View style={styles.container}>
      <Text>Goals</Text>
      <StatusBar style="auto" />
      <Button 
        title="Go to Goal1"
        /*onPress={() => navigation.navigate('TestGoal')}*/
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
