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

export default function EditProfile({ navigation }) {
  const editarperfil = () => {
    Alert.alert("Atenção", "Deseja confirmar as alterações?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("ProfilePage"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../imgs/ester.png")}
          style={styles.profilepicture}
        />
        <View style={styles.edit}>
          <Text>Nome</Text>
          <TextInput placeholder="Ester" style={styles.input} />
          <Text style={{ marginTop: 30 }}>Apelido</Text>
          <TextInput placeholder="Carvalho" style={styles.input} />
          <Text style={{ marginTop: 30 }}>Email</Text>
          <TextInput placeholder="estercarvalho@ua.pt" style={styles.input} />
          <Text style={{ marginTop: 30 }}>Empresa</Text>
          <TextInput
            placeholder="Universidade de Aveiro"
            style={styles.input}
          />
          <View style={styles.rewards}>
            <Text>Tornar as recompensas públicas</Text>
            <Switch
              trackColor={{ false: "#BBBABA", true: "#0051BA" }}
              onValueChange={true}
            />
          </View>
        </View>
        <View style={styles.options}>
          <Button
            color="#FFFFFF"
            title="Concluído"
            onPress={editarperfil}
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

  profilepicture: {
    backgroundColor: "#F5F5F5",
    //mudar os tamanhos para percentagens para funcionar bem em todos os ecrãs
    height: 110,
    width: 110,
    borderRadius: 100,
    marginTop: 40,
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

  rewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
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
