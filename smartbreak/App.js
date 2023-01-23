//import { StyleSheet, Text, View } from "react-native";
import AvailableSoon from "./src/errors/availableSoon";

//navegação
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//import TabRoutes from "./src/routes/Routes";
import MainStackNavigation from "./src/routes/Routes";

//funções navegação
const Stack = createStackNavigator();

// Font Gotham
import { useFonts } from "expo-font";


// Firebase
import firebase from "./src/config/firebase.js";

import { Provider } from "react-redux";
import store from "./src/redux/store";

//export da app
export default function App() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user logged')
    }
 });
  const user = firebase.auth().currentUser;
  console.log("user logged? ", user);

  const [loaded] = useFonts({
    GothamMedium: require("./src/fonts/GothamMedium.ttf"),
    GothamBook: require("./src/fonts/GothamBook.ttf"),
  });

  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="Home"
    //         component={MainStackNavigation}
    //         options={{ headerShown: false }}
    //       />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <AvailableSoon/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
