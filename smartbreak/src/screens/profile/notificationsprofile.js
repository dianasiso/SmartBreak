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
      <Text style={{ marginTop: 30 }}>Notificações</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.options}>
          <TouchableHighlight
            onPress={() => navigation.navigate("EditProfile")}
            underlayColor={"transparent"}
          >
            <Text style={{ marginLeft: 15 }}>Supender tudo</Text>
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
            <Text style={{ marginLeft: 15 }}>Recomendações de pausas</Text>
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
            <Text style={{ marginLeft: 15 }}>Dicas diárias</Text>
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
            <Text style={{ marginLeft: 15 }}>Novos objetivos</Text>
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

  rewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
