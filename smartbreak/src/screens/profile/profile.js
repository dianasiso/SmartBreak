//Mudar fonte :p
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Edit2 } from "iconsax-react-native";

export default function ProfilePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../../imgs/ester.png")}
        style={styles.profilepicture}
      />
      <Text style={styles.name}>Ester Carvalho</Text>
      <Text>Chefe da equipa de design Universidade de Aveiro</Text>
      <View style={styles.options}>
        <Edit2></Edit2>
        <Button
          title="Editar perfil"
          onPress={() => navigation.navigate("EditProfile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },

  profilepicture: {
    backgroundColor: "#F5F5F5",
    //mudar os tamanhos para percentagens para funcionar bem em todos os ecrãs
    height: 170,
    width: 170,
    borderRadius: 100,
    marginTop: 65,
  },

  name: {
    marginTop: 30,
    marginBottom: 15,
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
