import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
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
        <Setting2 color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("ProfileSettings")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Definições</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Edit2 color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("EditProfile")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Editar perfil</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Category color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Os meus equipamentos</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Calendar color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>As minhas rotinas</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.options}>
        <Clock color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Histórico de pausas</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.options}>
        <MedalStar color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("###")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>As minhas recompensas</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.options}>
        <Setting2 color="#000000" />
        <TouchableHighlight
          onPress={() => navigation.navigate("ProfileSettings")}
          underlayColor={"transparent"}
        >
          <Text style={{ marginLeft: 15 }}>Definições</Text>
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
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3ECF7",
  },
});
