import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ScrollView, Image } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../styles/css.js";

export default function Maintenance() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../fonts/GothamMedium.ttf"),
    GothamBook: require("./../fonts/GothamBook.ttf"),
  });
  if (!loaded) {
    return null; // Returns null if unable to load the font
  }

  return (
    <View style={[styles.container, { backgroundColor: "#F57738" }]}>
      <StatusBar style="light" />
      <View>
        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
      </View>
      <ScrollView>
        <Text style={styles.errorTitleText}>Manutenção</Text>
        <Text style={styles.errorNormalText}>
          Estamos a recarregar as nossas baterias.
        </Text>
        <View
          style={[
            styles.imageLogo,
            { justifyContent: "center", marginRight: 20 },
          ]}
        >
          <Image
            source={require("./../imgs/img_maintenance.png")}
            style={{ width: 130, height: 180 }}
          />
        </View>
        <Text style={styles.errorNormalText}>
          Poderás voltar a ser produtivo não tarda.
        </Text>
      </ScrollView>
    </View>
  );
}
