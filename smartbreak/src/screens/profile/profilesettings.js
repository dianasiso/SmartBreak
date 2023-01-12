//Mudar fonte :p
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Alert,
} from "react-native";
import {
  Lock1,
  Notification,
  SecurityUser,
  DocumentText1,
  MessageQuestion,
  Trash,
  Logout,
} from "iconsax-react-native";

export default function ProfileSettings() {
  const apagarconta = () => {
    Alert.alert("Atenção", "Deseja apagar a sua conta permanentemente?", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("###"),
      },
    ]);
  };

  const terminarsessao = () => {
    Alert.alert("Atenção", "Tem a certeza que deseja terminar a sessão? ", [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("###"),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ marginTop: 30 }}>Definições</Text>
      <View style={styles.options}>
        <Lock1 color="#000000" />
        <Button
          color="#000000"
          title="Alterar palavra-passe"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <Notification color="#000000" />
        <Button
          color="#000000"
          title="Notificações"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <SecurityUser color="#000000" />
        <Button
          color="#000000"
          title="Segurança"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <DocumentText1 color="#000000" />
        <Button
          color="#000000"
          title="Termos de utilização"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <MessageQuestion color="#000000" />
        <Button
          color="#000000"
          title="Centro de ajuda"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <Trash color="#000000" />
        <Button
          color="#000000"
          title="Apagar conta"
          onPress={apagarconta}
          underlayColor={"transparent"}
        />
      </View>
      <View style={styles.options}>
        <Logout color="#000000" />
        <Button
          color="#000000"
          title="Terminar sessão"
          onPress={terminarsessao}
          underlayColor={"transparent"}
        />
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

  options: {
    marginTop: 30,
    borderRadius: 15,
    paddingLeft: 25,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
  },
});
