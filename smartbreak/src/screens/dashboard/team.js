import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation , useRoute} from "@react-navigation/native";
import { ArrowCircleRight } from "iconsax-react-native";

import { useSelector } from "react-redux";
// Font Gotham
import { useFonts } from "expo-font";


// Firebase
import firebase from "./../../config/firebase.js";

// CSS
import { styles } from "./../../styles/css.js";

// CSS
import * as CONST from "./../../styles/variables.js";


const Info = ({value}) => {
  
  const navigation = useNavigation();
  const [teamId, setTeamId] = useState(useRoute().params.teamId);

  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRewards, setUserRewards] = useState();


  firebase
  .firestore()
  .collection("users_data")
  .doc(value)
  .get()
  .then((doc) => {
    
      setUserName(doc.data().name + " " + doc.data().lastName)
      setUserEmail(doc.data().email)
      setUserRewards(doc.data().rewards)
  })

  return (
    <>
    
    <View>
      <Text style={styles.normalText}>{userName}</Text>
      <Text style={styles.normalText}>{userEmail}</Text>
    </View>
    {userRewards ?
      <ArrowCircleRight
        style={{position: "absolute", right: 0}}
        variant="Bold"
        color={CONST.mainOrange}
        onPress={() =>
          navigation.navigate("MembersRewardsDashboard", {
          username: userName,
          teamId: teamId,
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

  const [teamId, setTeamId] = useState(useRoute().params.teamId);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [users, setUsers] = useState();


  const userData = useSelector((state) => state.user.userID);
  useEffect(() => {
    firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .get()
    .then((doc) => {
      setName(doc.data().name);
      setDescription(doc.data().description);
      setUsers(doc.data().users);
    })
    
  }, []);

  return (
    <SafeAreaProvider
      showsVerticalScrollIndicator={false}
      style={[styles.containerLight, {paddingTop: 0}]}
    >
      <ScrollView>
        <StatusBar style="dark" />
        <Text style={[styles.titleText, {paddingBottom: CONST.textPadding}]}>{name}</Text>
        <Text style={styles.normalText}>{description}</Text>
       
          {users && users.map((callbackfn, id) => (
            <View style={styles.membersView}>
              <Info value={users[id]} />
            </View>
          ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}
