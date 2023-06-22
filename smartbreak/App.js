//add storybook (descomentar e comentar o resto se for para ver o storybook)
//export { default } from "./.storybook";

//import { StyleSheet, Text, View } from "react-native";
import AvailableSoon from "./src/errors/availableSoon";

//navegação
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//import TabRoutes from "./src/routes/Routes";
import { MainStackNavigation } from "./src/routes/Routes";

//funções navegação
const Stack = createStackNavigator();

// Font Gotham
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const [loaded] = useFonts({
    GothamMedium: require("./src/fonts/GothamMedium.ttf"),
    GothamBook: require("./src/fonts/GothamBook.ttf"),
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainStackNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
