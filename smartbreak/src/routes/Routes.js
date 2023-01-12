//elementos react
import { View, StyleSheet } from "react-native";

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
import NotificationsProfile from "../screens/profile/notificationsprofile";
import SecurityProfile from "../screens/profile/secutiryprofile";
import TermsofUseProfile from "../screens/profile/termsofuseprofile";
import HelpCenterProfile from "../screens/profile/helpcenterprofile";

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
const GoalsStackNavigation = ({ navigation }) => {
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
                onPress={() => navigation.navigate("GoalsOverview")} //não esquecer de colocar sempre a pagina para onde queremos voltar!
              />
            </View>
          ),
        }}
      />
    </GoalsStack.Navigator>
  );
};

//navegação stack no perfil
const ProfileStackNavigation = ({ navigation }) => {
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
                onPress={() => navigation.navigate("ProfilePage")}
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
                onPress={() => navigation.navigate("ProfilePage")}
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
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="NotificationsProfile"
        component={NotificationsProfile}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="SecurityProfile"
        component={SecurityProfile}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="TermsofUseProfile"
        component={TermsofUseProfile}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="HelpCenterProfile"
        component={HelpCenterProfile}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const RectangleIndicator = () => {
  return <View style={styles.Indicator} />;
};
//style={ { display: isLoggedIn ? 'block' : 'none' } }

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
          tabBarIcon: ({ focused, color }) => (
            <>
              <View style={{ opacity: focused ? 1 : 0 }}>
                <RectangleIndicator />
              </View>
              <Icon name="dashboard" color={color} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsStackNavigation}
        options={{
          tabBarLabel: "Objetivos",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ focused, color }) => (
            <>
              <View style={{ opacity: focused ? 1 : 0 }}>
                <RectangleIndicator />
              </View>
              <Icon name="goals" color={color} />
            </>
          ),
        }}
        /* navigation={navigation}*/
      />

      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: "Estatísticas",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ focused, color }) => (
            <>
              <View style={{ opacity: focused ? 1 : 0 }}>
                <RectangleIndicator />
              </View>
              <Icon name="stats" color={color} />
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: "#0051BA",
          tabBarIcon: ({ focused, color }) => (
            <>
              <View style={{ opacity: focused ? 1 : 0 }}>
                <RectangleIndicator />
              </View>
              <Icon name="profile" color={color} />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  IconContainer: {},
  Indicator: {
    width: 50,
    height: 5,
    backgroundColor: "#0051BA",
    borderRadius: 5,
    //position: "absolute",
    top: -15,
  },
});

export default TabRoutes;
