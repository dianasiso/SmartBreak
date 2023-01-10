import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <StatusBar style="auto" />
      <Button
        title="abrir cenas no perfil"
        onPress={() => navigation.navigate("TestProfile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
