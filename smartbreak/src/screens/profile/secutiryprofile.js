import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  TouchableHighlight,
} from "react-native";

export default function NotificationsProfile({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ marginTop: 30 }}>Segurança</Text>
      <View style={{ alignItems: "center" }}>
        <Text style={{ marginTop: 30, lineHeight: 24 }}>
          O utilizador, ao aceitar os Termos e Política de Privacidade, autoriza
          expressamente a aplicação a coletar, usar, armazenar, tratar, ceder ou
          utilizar as informações derivadas do uso da aplicação, incluindo todas
          as informações preenchidas pelo utilizador no momento em que realizar
          ou atualizar o seu cadastro, além de outras expressamente descritas na
          Política de Privacidade que deverá ser autorizada pelo usuário.
        </Text>
        <View style={styles.options}>
          <TouchableHighlight
            onPress={() => navigation.navigate("EditProfile")}
            underlayColor={"transparent"}
          >
            <Text style={{ marginLeft: 15 }}>Recolha de dados</Text>
          </TouchableHighlight>
          <Switch
            trackColor={{ false: "#BBBABA", true: "#0051BA" }}
            onValueChange={true}
          />
        </View>

        <View style={styles.options}>
          <TouchableHighlight
            onPress={() => navigation.navigate("EditProfile")}
            underlayColor={"transparent"}
          >
            <Text style={{ marginLeft: 15 }}>Partilha de dados</Text>
          </TouchableHighlight>
          <Switch
            trackColor={{ false: "#BBBABA", true: "#0051BA" }}
            onValueChange={true}
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

  options: {
    marginTop: 30,
    borderRadius: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
    justifyContent: "space-between",
  },
});
