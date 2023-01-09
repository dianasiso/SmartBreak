import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//páginas
import Dashboard from "../../src/screens/dashboard";
import Goals from "../../src/screens/goals";
import ProfilePage from "../../src/screens/profile";
import Stats from "../../src/screens/stats";

//fontes
import { useFonts } from "expo-font";

import { Category } from "iconsax-react-native";
import { ArchiveBook } from "iconsax-react-native";
import { Diagram } from "iconsax-react-native";
import { Profile } from "iconsax-react-native";

const Tab = createBottomTabNavigator();

//icones
function Icon({ name, color }) {
  switch (name) {
    case "dashboard":
      return <Category size="32" color={color} />;
    case "goals":
      return <ArchiveBook size="32" color={color} />;
    case "stats":
      return <Diagram size="32" color={color} />;
    case "profile":
      return <Profile size="32" color={color} />;
    default:
      return <Category size="32" color={color} />;
  }
}

//routes da barra de navegação
const TabRoutes = () => {
  const [loaded] = useFonts({
    GothamMedium: require("./../fonts/GothamMedium.ttf"),
    GothamBook: require("./../fonts/GothamBook.ttf"),
  });
  if (!loaded) {
    return null; // Returns null if unable to load the font
  }
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          position: "absolute",
          padding: 6,
          fontFamily: "GothamBook",
          fontWeight: "400",
          fontSize: 12,
        },
        tabBarIconStyle: {
          padding: 7,
        },
        tabBarStyle: {
          backgroundColor: "#fffff",
          borderTopColor: "transparent",
          height: 80,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          position: "absolute",
          elevation: 0,
        },

        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Painel",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ color }) => <Icon name="dashboard" color={color} />,
        }}
      />

      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          tabBarLabel: "Dicas",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ color }) => <Icon name="goals" color={color} />,
        }}
      />

      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: "Estatísticas",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ color }) => <Icon name="stats" color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ color }) => <Icon name="profile" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
