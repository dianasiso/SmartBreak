import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Font Gotham
import { useFonts } from "expo-font";

export default function EditPassword({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

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
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Alterar palavra-passe</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.edit}>
            <Text style={styles.text}>Palavra-passe atual</Text>
            <TextInput placeholder="" style={styles.input} />
            <Text style={styles.text}>Nova palavra-passe</Text>
            <TextInput placeholder="" style={styles.input} />
            <Text style={styles.text}>Confirmar nova palavra-passe</Text>
            <TextInput placeholder="" style={styles.input} />
          </View>
          <View style={styles.options}>
            <TouchableHighlight
              onPress={editarpasse}
              underlayColor={"transparent"}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontFamily: "GothamBook",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Concluído
              </Text>
            </TouchableHighlight>
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
    marginTop: 30,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0051BA",
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
