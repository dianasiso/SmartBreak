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
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Segurança</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>
            O utilizador, ao aceitar os Termos e Política de Privacidade,
            autoriza expressamente a aplicação a coletar, usar, armazenar,
            tratar, ceder ou utilizar as informações derivadas do uso da
            aplicação, incluindo todas as informações preenchidas pelo
            utilizador no momento em que realizar ou atualizar o seu cadastro,
            além de outras expressamente descritas na Política de Privacidade
            que deverá ser autorizada pelo usuário.
          </Text>
          <View style={styles.options}>
            <TouchableHighlight
              onPress={() => navigation.navigate("EditProfile")}
              underlayColor={"transparent"}
            >
              <Text
                style={{
                  marginLeft: 15,
                  fontFamily: "GothamBook",
                  fontSize: 16,
                }}
              >
                Recolha de dados
              </Text>
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
              <Text
                style={{
                  marginLeft: 15,
                  fontFamily: "GothamBook",
                  fontSize: 16,
                }}
              >
                Partilha de dados
              </Text>
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

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    marginTop: 30,
    lineHeight: 24,
  },
});
