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
import { SafeAreaProvider } from "react-native-safe-area-context";

// Font Gotham
import { useFonts } from "expo-font";

export default function NotificationsProfile({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Notificações</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.options}>
            <TouchableHighlight
              onPress={() => navigation.navigate("EditProfile")}
              underlayColor={"transparent"}
            >
              <Text style={styles.text}>Supender tudo</Text>
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
              <Text style={styles.text}>Recomendações de pausas</Text>
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
              <Text style={styles.text}>Dicas diárias</Text>
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
              <Text style={styles.text}>Novos objetivos</Text>
            </TouchableHighlight>
            <Switch
              trackColor={{ false: "#BBBABA", true: "#0051BA" }}
              onValueChange={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
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

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    marginLeft: 15,
    lineHeight: 24,
  },
});
