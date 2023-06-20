import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowCircleRight } from "iconsax-react-native";

import { useSelector } from "react-redux";
// Font Gotham
import { useFonts } from "expo-font";


// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";
import * as CONST from "./../../styles/variables.js";


const Info = ({ value }) => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]

  const [depID, setDepID] = useState(userData.department);
  const [userName, setUserName] = useState(value.name);
  const [userEmail, setUserEmail] = useState(value.email);
  const [userRewards, setUserRewards] = useState(value.permissions[0]);

  return (
    <>
      <View>
        <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>{userName}</Text>
        <Text style={dark_mode ? [dark_styles.smallText,  { color: CONST.greySoft}] :  [styles.smallText, {color: CONST.enableColor}]}>{userEmail}</Text>
      </View>
      {userRewards ?
        <ArrowCircleRight
          style={{ position: "absolute", right: 0, padding: CONST.boxPadding}}
          variant="Bold"
          color={dark_mode ? CONST.thirdOrange : CONST.mainOrange}
          onPress={() =>
            navigation.navigate("MembersRewardsDashboard", {
              userID : value._id,
              userName : userName
            })
          }
        />
        :
        <></>
      }
    </>
  )
}

export default function Team({ navigation }) {
  // Loading Gotham font
  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1]

  const [depID, setDepID] = useState(userData.department);
  const [depName, setDepName] = useState();
  const [depDescription, setDepDescription] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/users/department/" + depID, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDepName(data.department)
          setDepDescription(data.description)
          setUsers(data.message);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }
    }
    fetchData();

  }, []);

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[dark_mode ?  dark_styles.containerLight : styles.containerLight, { paddingTop: CONST.backgroundPaddingTop/2}]}
    >
        <StatusBar style={dark_mode ? "light" : "dark" } />
        <Text style={dark_mode ? dark_styles.titleText : styles.titleText}>{depName}</Text>
        <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>{depDescription}</Text>

        <ScrollView>
        {users && users.map((callbackfn, id) => (
          <View key={users[id]._id} style={styles.membersView}>
            <Info value={users[id]} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}
