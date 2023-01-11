import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Goals() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Objetivos</Text>
      <StatusBar style="auto" />
      <Button
        title="abrir uma objetivo"
        onPress={() => navigation.navigate("TestGoal")}
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
