//elementos react
import { View, StyleSheet } from "react-native";

//navegações
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Variables
import * as CONST from "./../styles/variables.js";

// REDUX
import { useSelector } from "react-redux";

// CSS
import { styles } from "../styles/css.js";
import { dark_styles } from "../styles/darkcss.js";

//dashboard
import Dashboard from "../screens/dashboard/dashboard";

//subpáginas dashboard
import Team from "../screens/dashboard/team";
import MembersRewards from "../screens/dashboard/membersrewards";

//ojbetivos
import Goals from "../screens/goals/goals";

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
import SecurityProfile from "../screens/profile/securityprofile.js";
import TermsofUseProfile from "../screens/profile/termsofuseprofile";
import HelpCenterProfile from "../screens/profile/helpcenterprofile";
import historicoPausas from "../screens/profile/historicoPausas";
import Accessibility from "../screens/profile/accessibility.js";

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

//import dispatch
import { useDispatch } from "react-redux";
import { logUser } from "../redux/user.js";

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
export const AuthStackNavigation = ({ navigation }) => {
  console.log("Entrei no authstack!!!");
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
                color={CONST.lightBackgroundColor}
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
                color={CONST.lightBackgroundColor}
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
                color={CONST.lightBackgroundColor}
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
export const DashboardStackNavigation = ({ navigation, route }) => {
  // ---- userData information
  const userData = useSelector((state) => state.user);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];

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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
export const GoalsStackNavigation = ({ navigation }) => {
  // ---- userData information
  const userData = useSelector((state) => state.user);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];
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
    </GoalsStack.Navigator>
  );
};

//navegação stack no perfil
export const ProfileStackNavigation = ({ navigation }) => {
  // ---- userData information
  const userData = useSelector((state) => state.user);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
                onPress={() => navigation.navigate("ProfileSettings")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="Accessibility"
        component={Accessibility}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
          headerStyle: {
            backgroundColor: dark_mode
              ? CONST.darkerColor
              : CONST.lightBackgroundColor,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={styles.returnTopButton}>
              <ArrowLeft2
                size="24"
                color={
                  dark_mode ? CONST.lightBackgroundColor : CONST.darkerColor
                }
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
  // ---- userData information
  const userData = useSelector((state) => state.user);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];
  return (
    <View
      style={[
        styles.indicator,
        dark_mode
          ? { backgroundColor: CONST.thirdBlue }
          : { backgroundColor: CONST.mainBlue },
      ]}
    />
  );
};

const RectangleIndicatorError = () => {
  return <View style={styles.indicatorError} />;
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
export const TabRoutes = ({}) => {
  console.log("//   entrou no TabRoutes!    //");

  // ---- userData information
  const userData = useSelector((state) => state.user);

  // ---- check if dark mode or high contrast mode is active
  const dark_mode = userData.accessibility[1];

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
          backgroundColor: dark_mode
            ? CONST.darkerColor
            : CONST.lightBackgroundColor,
          borderTopColor: "transparent",
          height: 90,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopColor: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
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
          tabBarActiveTintColor: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
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
          tabBarActiveTintColor: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
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
          tabBarActiveTintColor: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
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
          tabBarActiveTintColor: dark_mode ? CONST.thirdBlue : CONST.mainBlue,
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

export const MainStackNavigation = ({ authStatus }) => {
  const dispatch = useDispatch();
  // guardar no redux
  if (authStatus === "true") {
    dispatch(logUser(JSON.stringify(getUserStorage())));
  }
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

export default MainStackNavigation;
