//elementos react
import { View, StyleSheet } from "react-native";

//navegações
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

//páginas
//dashboard
import Dashboard from "../screens/dashboard/dashboard";
//subpáginas dashboard
import Team from "../screens/dashboard/team";
import MembersRewards from "../screens/dashboard/membersrewards";
//ojbetivos
import Goals from "../screens/goals/goals";
//subpáginas dos objetivos
import TestGoal from "../screens/goals/testgoal";
//estatísticas
import Stats from "../screens/stats/stats";
//perfil
import ProfilePage from "../screens/profile/profile";
//subpáginas do perfil
import EditProfile from "../screens/profile/editprofile";
import ProfileRewards from "../screens/profile/profilerewards";
import ProfileSettings from "../screens/profile/profilesettings";
import EditPassword from "../screens/profile/editpassword";
import NotificationsProfile from "../screens/profile/notificationsprofile";
import SecurityProfile from "../screens/profile/secutiryprofile";
import TermsofUseProfile from "../screens/profile/termsofuseprofile";
import HelpCenterProfile from "../screens/profile/helpcenterprofile";
//autenticação
import Login from "../screens/authentication/login";
import Register from "../screens/authentication/register";
import Welcome from "../screens/authentication/welcome";

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
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const GoalsStack = createStackNavigator();
//autenticação
const AuthStack = createStackNavigator();

//stack que dá wrap a todas as outras stacks
const MainStack = createStackNavigator();

//nav stack de autenticacao
const AuthStackNavigation = ({ navigation }) => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ animation: "none" }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

//navegação stack na dashboard
const DashboardStackNavigation = ({ navigation, route }) => {
  return (
    <DashboardStack.Navigator
      initialRouteName="HomeDashboard"
      screenOptions={{ animation: "none" }}
    >
      <DashboardStack.Screen
        name="HomeDashboard"
        options={{ headerShown: false }}
        component={Dashboard}
      ></DashboardStack.Screen>

      <DashboardStack.Screen
        name="TeamDashboard"
        component={Team}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("HomeDashboard")}
              />
            </View>
          ),
        }}
      />

      <DashboardStack.Screen
        name="MembersRewardsDashboard"
        component={MembersRewards}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
              <ArrowLeft2
                size="24"
                color="#000000"
                onPress={() => navigation.navigate("TeamDashboard")}
              />
            </View>
          ),
        }}
      />
    </DashboardStack.Navigator>
  );
};

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
        name="ProfileRewards"
        component={ProfileRewards}
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
const TabRoutes = (
  {
    /* route*/
  }
) => {
  //const { idUser } = route.params;
  //console.log(idUser);

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
        component={DashboardStackNavigation}
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

const MainStackNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="AuthStack"
        component={AuthStackNavigation}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
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

export default MainStackNavigation;
