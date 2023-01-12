import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TouchableHighlight,
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

export default function ProfileSettings({ navigation }) {
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
        <TouchableHighlight
          onPress={() => navigation.navigate("EditPassword")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Alterar palavra-passe</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Notification color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("NotificationsProfile")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Notificações</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <SecurityUser color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("SecurityProfile")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Segurança</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <DocumentText1 color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("TermsofUseProfile")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Termos de utilização</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <MessageQuestion color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("HelpCenterProfile")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Centro de ajuda</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Trash color="#000000" />
        <TouchableHighlight onPress={apagarconta} underlayColor={"transparent"}>
          <Text style={{ marginLeft: 15 }}>Apagar conta</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Logout color="#000000" />
        <TouchableHighlight
          onPress={terminarsessao}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Terminar sessão</Text>
        </TouchableHighlight>
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
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
  },
});
