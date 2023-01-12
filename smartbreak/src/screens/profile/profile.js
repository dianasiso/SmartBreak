//Mudar fonte :p
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Edit2,
  Category,
  Calendar,
  Clock,
  MedalStar,
  Setting2,
} from "iconsax-react-native";

export default function ProfilePage() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../imgs/ester.png")}
          style={styles.profilepicture}
        />
        <Text style={styles.name}>Ester Carvalho</Text>
        <Text>Chefe da equipa de design Universidade de Aveiro</Text>
      </View>
      <View style={styles.options}>
        <Edit2 color="#000000" />
        <Button
          color="#000000"
          title="Editar perfil"
          onPress={() => navigation.navigate("EditProfile")}
        />
      </View>
      <View style={styles.options}>
        <Category color="#000000" />
        <Button
          color="#000000"
          title="Os meus equipamentos"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <Calendar color="#000000" />
        <Button
          color="#000000"
          title="As minhas rotinas"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <Clock color="#000000" />
        <Button
          color="#000000"
          title="Histórico de pausas"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <MedalStar color="#000000" />
        <Button
          color="#000000"
          title="As minhas recompensas"
          onPress={() => navigation.navigate("###")}
        />
      </View>
      <View style={styles.options}>
        <Setting2 color="#000000" />
        <Button
          color="#000000"
          title="Definições"
          onPress={() => navigation.navigate("ProfileSettings")}
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
