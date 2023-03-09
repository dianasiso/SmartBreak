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
      <Text style={styles.subtitulo}>{userName}</Text>
      <Text style={styles.text}>{userEmail}</Text>
    </View>
    {userRewards ?
      <ArrowCircleRight
        style={{ position: "absolute", right: 0 }}
        variant="Bold"
        color="#0051BA"
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
      style={styles.container}
    >
      <ScrollView>
        <StatusBar style="auto" />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
       
          {users && users.map((callbackfn, id) => (
            <View style={styles.membros}>
              <Info value={users[id]} />
            </View>
          ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 90,
  },

  profilepicture: {
    backgroundColor: "#F5F5F5",
    //mudar os tamanhos para percentagens para funcionar bem em todos os ecrãs
    height: 60,
    width: 60,
    borderRadius: 100,
    marginRight: 30,
  },

  title: {
    fontFamily: "GothamMedium",
    fontSize: 24,
    marginTop: 30,
  },

  subtitulo: {
    fontFamily: "GothamMedium",
    fontSize: 16,
    textTransform: 'capitalize'
  },

  text: {
    fontFamily: "GothamBook",
    fontSize: 16,
    lineHeight: 24,
  },

  membros: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});
