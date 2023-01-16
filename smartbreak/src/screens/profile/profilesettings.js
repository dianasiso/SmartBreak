import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Lock1,
  Notification,
  SecurityUser,
  DocumentText1,
  MessageQuestion,
  Trash,
  Logout,
} from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

export default function ProfileSettings({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  if (!loaded) {
    return null;  // Returns null if unable to load the font
  }

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
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>Definições</Text>

        <View style={styles.options}>
          <Lock1 color="#000000" onPress={() => navigation.navigate("EditPassword")} />
          <TouchableHighlight onPress={() => navigation.navigate("EditPassword")} underlayColor={"transparent"}>
            <Text style={styles.text}>  Alterar palavra-passe</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <Notification color="#000000"  onPress={() => navigation.navigate("NotificationsProfile")}/>
          <TouchableHighlight onPress={() => navigation.navigate("NotificationsProfile")} underlayColor={"transparent"} >
            <Text style={styles.text}>  Notificações</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <SecurityUser color="#000000" onPress={() => navigation.navigate("SecurityProfile")} /> 
          <TouchableHighlight onPress={() => navigation.navigate("SecurityProfile")} underlayColor={"transparent"} >
            <Text style={styles.text}>  Segurança</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <DocumentText1 color="#000000"  onPress={() => navigation.navigate("TermsofUseProfile")} />
          <TouchableHighlight onPress={() => navigation.navigate("TermsofUseProfile")} underlayColor={"transparent"} >
            <Text style={styles.text}>  Termos de utilização</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <MessageQuestion color="#000000" onPress={() => navigation.navigate("HelpCenterProfile")} />
          <TouchableHighlight onPress={() => navigation.navigate("HelpCenterProfile")} underlayColor={"transparent"} >
            <Text style={styles.text}>  Centro de ajuda</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <Trash color="#000000"  onPress={apagarconta}/>
          <TouchableHighlight onPress={apagarconta} underlayColor={"transparent"} >
            <Text style={styles.text}>  Apagar conta</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.options}>
          <Logout color="#000000" onPress={terminarsessao}/>
          <TouchableHighlight onPress={terminarsessao} underlayColor={"transparent"} >
            <Text style={styles.text}>  Terminar sessão</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 100,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },

  options: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    width: screenWidth - 50, 
    flexDirection: "row",
    alignItems: "center",
    textAlign: 'left',
    backgroundColor: "#E3ECF7",
  },

  text: {
    marginLeft: 10,
    fontFamily: "GothamBook",
    fontSize: 16,
  },
});
