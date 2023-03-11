import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ScrollView, Image } from "react-native";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

// Font Gotham
import { useFonts } from "expo-font";

// CSS
import { styles } from "./../styles/css.js";

export default function Error404() {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: require("./../fonts/GothamMedium.ttf"),
    GothamBook: require("./../fonts/GothamBook.ttf"),
  });

  return (
    <View style={[styles.container, { backgroundColor: "#F57738" }]}>
      <StatusBar style="light" />
      <View>
        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
      </View>
      <ScrollView>
        <Text style={styles.errorTitleText}>Erro</Text>
        <Text style={styles.errorNormalText}>Sobrecarga na bateria!</Text>
        <View
          style={[
            styles.imageLogo,
            { justifyContent: "center", marginRight: 20 },
          ]}
        >
          <Image
            source={require("./../imgs/img_error_404.png")}
            style={{ width: 215, height: 180 }}
          />
        </View>
        <Text style={styles.errorNormalText}>Esta página não existe.</Text>
      </ScrollView>
    </View>
  );
}
