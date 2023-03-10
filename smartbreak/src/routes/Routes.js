//elementos react
import { View, StyleSheet } from "react-native";

//navegações
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Variables
import * as CONST from "./../styles/variables.js";

// CSS
import { styles } from "../styles/css.js";

//dashboard
import Dashboard from "../screens/dashboard/dashboard";

//subpáginas dashboard
import Team from "../screens/dashboard/team";
import MembersRewards from "../screens/dashboard/membersrewards";

//ojbetivos
import Goals from "../screens/goals/goals";

//subpágina dos objetivos
import Tips from "../screens/goals/tips";

//estatísticas
import Stats from "../screens/stats/stats";

//perfil
import ProfilePage from "../screens/profile/profile";

//subpáginas do perfil
import EditProfile from "../screens/profile/editprofile";
import MyDevices from "../screens/profile/devices";
import MyRoutines from "../screens/profile/routines";
import ProfileRewards from "../screens/profile/profilerewards";
import ProfileSettings from "../screens/profile/profilesettings";
import EditPassword from "../screens/profile/editpassword";
import NotificationsProfile from "../screens/profile/notificationsprofile";
import SecurityProfile from "../screens/profile/secutiryprofile";
import TermsofUseProfile from "../screens/profile/termsofuseprofile";
import HelpCenterProfile from "../screens/profile/helpcenterprofile";
import historicoPausas from "../screens/profile/historicoPausas";

//autenticação
import SplashScreen from "../screens/authentication/splashscreen";
import Login from "../screens/authentication/login";
import Register from "../screens/authentication/register";
import Password from "../screens/authentication/password";
import Welcome from "../screens/authentication/welcome";
import Onboarding from "../onboarding/screens";

// error
import AvailableSoon from "../errors/availableSoon";
import Maintenance from "../errors/maintenance";
import Error404 from "../errors/error404";

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
      initialRouteName="SplashScreen"
      screenOptions={{ animation: "none" }}
    >
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: CONST.mainBlue,
            shadowColor: "transparent",
          },
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#F5F5F5"
                onPress={() => navigation.navigate("Welcome")}
              />
            </View>
          ),
        }}
      />

      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: CONST.mainBlue,
            shadowColor: "transparent",
          },
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#F5F5F5"
                onPress={() => navigation.navigate("Welcome")}
              />
            </View>
          ),
        }}
      />
      <AuthStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Password"
        component={Password}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: CONST.mainBlue,
            shadowColor: "transparent",
          },
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#F5F5F5"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          ),
        }}
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
                onPress={() =>
                  navigation.navigate("TeamDashboard", { teamId: null })
                }
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
        name="Tips"
        component={Tips}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
                onPress={() => navigation.navigate("ProfilePage")}
              />
            </View>
          ),
        }}
      />

      <ProfileStack.Screen
        name="MyDevices"
        component={MyDevices}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
                onPress={() => navigation.navigate("ProfilePage")}
              />
            </View>
          ),
        }}
      />

      <ProfileStack.Screen
        name="MyRoutines"
        component={MyRoutines}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="historicoPausas"
        component={historicoPausas}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
                onPress={() => navigation.navigate("ProfilePage")}
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color="#333333"
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

const RectangleIndicatorError = () => {
  return <View style={styles.IndicatorError} />;
};
//style={ { display: isLoggedIn ? 'block' : 'none' } }

//função para os icones
function Icon({ name, color }) {
  switch (name) {
    case "dashboard":
      return <Category size="26" color={color} />;
    case "goals":
      return <ArchiveBook size="26" color={color} />;
    case "stats":
      return <Diagram size="26" color={color} />;
    case "profile":
      return <Profile size="26" color={color} />;
    default:
      return <Category size="26" color={color} />;
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
          borderTopColor: CONST.mainBlue,
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
          tabBarActiveTintColor: CONST.mainBlue,
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
          tabBarActiveTintColor: CONST.mainBlue,
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
        component={AvailableSoon}
        options={{
          tabBarLabel: "Estatísticas",
          tabBarActiveTintColor: "#F5F5F5",
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: { backgroundColor: CONST.mainOrange },
          tabBarIcon: ({ focused, color }) => (
            <>
              <View style={{ opacity: focused ? 1 : 0 }}>
                <RectangleIndicatorError
                  style={{ backgroundColor: "#F5F5F5" }}
                />
              </View>
              <Icon name="stats" color={color} />
            </>
          ),
          tabBarStyle: {
            backgroundColor: CONST.mainOrange,
            borderTopColor: "transparent",
            height: 90,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTopColor: "#F5F5F5",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            color: "#F5F5F5",
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: "Perfil",
          tabBarActiveTintColor: CONST.mainBlue,
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

/*
const styles = StyleSheet.create({
  IconContainer: {},
  Indicator: {
    width: 50,
    height: 5,
    backgroundColor: CONST.mainBlue,
    borderRadius: 5,
    //position: "absolute",
    top: -15,
  },
  IndicatorError: {
    width: 50,
    height: 5,
    backgroundColor: "#FFF",
    borderRadius: 5,
    //position: "absolute",
    top: -15,
  },
});*/

export default MainStackNavigation;
