import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ArrowCircleRight } from "iconsax-react-native";

// Font Gotham
import { useFonts } from "expo-font";

export default function Team({ navigation }) {
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
        <Text style={styles.title}>Design</Text>
        <Text style={styles.text}>
          Criação de aspetos visuais para o projeto Smart Break.
        </Text>
        <View style={styles.membros}>
          <Image
            source={require("../../imgs/img_register_photo_default.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Agostinho Martins</Text>
            <Text style={styles.text}>agostinhomartins@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
        </View>

        <View style={styles.membros}>
          <Image
            source={require("../../imgs/img_register_photo_default.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Daniel Alves</Text>
            <Text style={styles.text}>alvesdaniel@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
        </View>

        <View style={styles.membros}>
          <Image
            source={require("../../imgs/img_register_photo_default.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Diana Siso</Text>
            <Text style={styles.text}>diana.siso@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
        </View>

        <View style={styles.membros}>
          <Image
            source={require("../../imgs/ester.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Ester Carvalho</Text>
            <Text style={styles.text}>estercarvalho@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
        </View>

        <View style={styles.membros}>
          <Image
            source={require("../../imgs/img_register_photo_default.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Joana Tavares</Text>
            <Text style={styles.text}>joanalt@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
        </View>

        <View style={styles.membros}>
          <Image
            source={require("../../imgs/img_register_photo_default.png")}
            style={styles.profilepicture}
          />
          <View>
            <Text style={styles.subtitulo}>Juliana Gouveia</Text>
            <Text style={styles.text}>julianagouveia@ua.pt</Text>
          </View>
          <ArrowCircleRight
            variant="Bold"
            color="#0051BA"
            onPress={() => navigation.navigate("MembersRewardsDashboard")}
          />
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

  profilepicture: {
    backgroundColor: "#F5F5F5",
    //mudar os tamanhos para percentagens para funcionar bem em todos os ecrãs
    height: 60,
    width: 60,
    borderRadius: 100,
    marginRight: 30,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  subtitulo: {
    fontFamily: "GothamMedium",
    fontSize: 16,
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
  },

  membros: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});
