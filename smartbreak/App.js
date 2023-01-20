//import { StyleSheet, Text, View } from "react-native";
//import Maintenance from "./src/errors/maintenance";

//navegação
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//import TabRoutes from "./src/routes/Routes";
import MainStackNavigation from "./src/routes/Routes";

//funções navegação
const Stack = createStackNavigator();


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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
