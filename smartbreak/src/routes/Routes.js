//navegações
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//páginas
import Dashboard from "../screens/dashboard/dashboard";
import Goals from "../screens/goals/goals";
import ProfilePage from "../screens/profile/profile";
import Stats from "../screens/stats/stats";
import TestGoal from "../screens/goals/testgoal";

//fontes
import { useFonts } from "expo-font";

//import de icones
import { Category } from "iconsax-react-native";
import { ArchiveBook } from "iconsax-react-native";
import { Diagram } from "iconsax-react-native";
import { Profile } from "iconsax-react-native";

//funções navegação
const Tab = createBottomTabNavigator();
const GoalsStack = createStackNavigator();

//navegação stack nos objetivos
const GoalsStackNavigation = () => {
  return (
    <GoalsStack.Navigator>
      <GoalsStack.Screen
        name="GoalsOverview"
        component={Goals}
        options={{ headerShown: false }}
      />
      <GoalsStack.Screen
        name="TestGoal"
        component={TestGoal}
        options={{ headerShown: false }}
      />
    </GoalsStack.Navigator>
  );
};

//função para os icones
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
          height: 90,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopColor: "#0051BA",
          borderTopWidth: 0,
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
        component={GoalsStackNavigation}
        options={{
          tabBarLabel: "Objetivos",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ color }) => <Icon name="goals" color={color} />,
        }}
        /* navigation={navigation}*/
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
