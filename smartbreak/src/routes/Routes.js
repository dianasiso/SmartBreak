//elementos react
import { View } from "react-native";

//navegações
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

//páginas
//dashboard
import Dashboard from "../screens/dashboard/dashboard";
//ojbetivos
import Goals from "../screens/goals/goals";
//subpágina dos objetivos
import TestGoal from "../screens/goals/testgoal";
//perfil
import ProfilePage from "../screens/profile/profile";
//subpágina do perfil
import EditProfile from "../screens/profile/editprofile";
import Stats from "../screens/stats/stats";
import ProfileSettings from "../screens/profile/profilesettings";
import EditPassword from "../screens/profile/editpassword";

//fontes
import { useFonts } from "expo-font";

//import de icones
import { Category } from "iconsax-react-native";
import { ArchiveBook } from "iconsax-react-native";
import { Diagram } from "iconsax-react-native";
import { Profile } from "iconsax-react-native";
import { ArrowLeft2 } from "iconsax-react-native";

//funções navegação
const Tab = createBottomTabNavigator();
const GoalsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

//navegação stack nos objetivos
const GoalsStackNavigation = () => {
  const navigation = useNavigation();
  return (
    <GoalsStack.Navigator
      initialRouteName="GoalsOverview"
      screenOptions={{ animation: "none" }}
    >
      <GoalsStack.Screen
        name="GoalsOverview"
        component={Goals}
        options={{ headerShown: false }}
      />
      <GoalsStack.Screen
        name="TestGoal"
        component={TestGoal}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
      />
    </GoalsStack.Navigator>
  );
};

//navegação stack no perfil
const ProfileStackNavigation = () => {
  const navigation = useNavigation();
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{ animation: "none" }}
    >
      <ProfileStack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
      />

      <ProfileStack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

//função para os icones
function Icon({ name, color }) {
  switch (name) {
    case "dashboard":
      return <Category size="30" color={color} />;
    case "goals":
      return <ArchiveBook size="30" color={color} />;
    case "stats":
      return <Diagram size="30" color={color} />;
    case "profile":
      return <Profile size="30" color={color} />;
    default:
      return <Category size="30" color={color} />;
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
          padding: 18,
          fontFamily: "GothamBook",
          fontWeight: "400",
          fontSize: 12,
        },
        tabBarIconStyle: {
          padding: 12,
        },
        tabBarStyle: {
          backgroundColor: "white",
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
        component={ProfileStackNavigation}
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
