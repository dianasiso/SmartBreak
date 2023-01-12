//Mudar fonte :p
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Switch,
} from "react-native";

export default function EditPassword({ navigation }) {
  const editarpasse = () => {
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("ProfileSettings"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ marginTop: 30 }}>Alterar palavra-passe</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.edit}>
          <Text>Palavra-passe atual</Text>
          <TextInput placeholder="" style={styles.input} />
          <Text style={{ marginTop: 30 }}>Nova palavra-passe</Text>
          <TextInput placeholder="" style={styles.input} />
          <Text style={{ marginTop: 30 }}>Confirmar nova palavra-passe</Text>
          <TextInput placeholder="" style={styles.input} />
        </View>
        <View style={styles.options}>
          <Button
            color="#FFFFFF"
            title="Concluído"
            onPress={editarpasse}
            underlayColor={"transparent"}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
  },

  edit: {
    marginTop: 30,
    width: "100%",
  },

  input: {
    marginTop: 5,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 5,
  },

  options: {
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#0051BA",
    marginTop: 30,
  },
});
