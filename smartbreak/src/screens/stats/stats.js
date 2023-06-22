import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";


// Font Gotham
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";


// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// CSS
import * as CONST from "./../../styles/variables.js";

export default function Stats() {

  const userData = useSelector((state) => state.user);
  const dark_mode = userData.accessibility[1];

  const [activeGoals, setActiveGoals] = useState()
  const [inactiveGoals, setInactiveGoals] = useState()

  const [loaded] = useFonts({
    GothamMedium: "./../fonts/GothamMedium.ttf",
    GothamBook: "./../fonts/GothamBook.ttf",
  });

  const navigation = useNavigation();
  const [selected, setSelected] = useState("personal");


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/active", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("active:", data.total)
          setActiveGoals(data.total);

        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", error.message);
      }

      try {
        const response = await fetch("https://sb-api.herokuapp.com/goals/destination/" + userData.userID + "/inactive", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + userData.token
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log("inactive:", data.total)
          setInactiveGoals(data.total);

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
  // // MOD

  return (
    <SafeAreaProvider style={dark_mode ? dark_styles.mainContainerDark : styles.mainContainerLight}>
      <StatusBar style={dark_mode ? "light" : "dark"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={dark_mode ? dark_styles.containerLight : styles.containerLight}
      >
        <View
          style={[
            styles.toggleContainer,
            selected == "personal"
              ? dark_mode ?
                { backgroundColor: "#444" }
                :
                { backgroundColor: "#f0f0f0" }
              :
              dark_mode ?
                { backgroundColor: "#444" }
                :
                { backgroundColor: "#f0f0f0" },
          ]}
        >
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "personal"
                ? { backgroundColor: CONST.lightBlue }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("personal")}
          >
            <Text style={[dark_mode ? dark_styles.normalText : styles.normalText, { fontFamily: "GothamMedium" }]}>
              Individual
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleSelector,
              selected === "team"
                ? { backgroundColor: CONST.lightOrange }
                : { backgroundColor: "transparent" },
            ]}
            onPress={() => setSelected("team")}
          >
            <Text style={[dark_mode ? dark_styles.normalText : styles.normalText, { fontFamily: "GothamMedium" }]}>
              Departamental
            </Text>
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", marginTop: 40, overflow: "scroll" }}>
          <View style={dark_mode ? dark_styles.goalsBox : styles.goalsBox}>
            <View style={[dark_mode ? dark_styles.goals : styles.goals]}>
              <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
                {selected === "personal" ?
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
                    Concluíste um total de <Text style={{ fontFamily: 'GothamMedium' }}>{inactiveGoals}</Text> objetivos.
                  </Text>
                  :
                  <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
                    Concluíram um total de <Text style={{ fontFamily: 'GothamMedium' }}>{inactiveGoals}</Text> objetivos.
                  </Text>
                }
              </View>
            </View>
          </View>

          <View style={[dark_mode ? dark_styles.goalsBox : styles.goalsBox, {marginTop: 10}]}>
            <View style={[dark_mode ? dark_styles.goalsv2 : styles.goalsv2]}>
              <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
                {selected === "personal" ?
                  <Text style={[dark_mode ? dark_styles.normalText : styles.normalText, {textAlign: 'right'}]}>
                    Atualmente tens pendentes <Text style={{ fontFamily: 'GothamMedium' }}>{activeGoals}</Text> objetivos.
                  </Text>
                  :
                  <Text style={[dark_mode ? dark_styles.normalText : styles.normalText, {textAlign: 'right'}]}>
                    Atualmente têm pendentes <Text style={{ fontFamily: 'GothamMedium' }}>{activeGoals}</Text> objetivos.
                  </Text>
                }
              </View>
            </View>
          </View>

        </ScrollView>


        {/* 

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", overflow: "scroll" }}
        >
          {docs &&
            docs.length > 0 &&
            docs.map((callbackfn, id) => (
              <Pressable style={[dark_mode ? dark_styles.goals : styles.goals, { borderLeftColor: whichPriorityColor(docs[id].priority) }]} key={docs[id]._id}>
                <View style={dark_mode ? dark_styles.goalsBox : styles.goalsBox}>
                  <View style={dark_mode ? dark_styles.goalsBoxContent : styles.goalsBoxContent}>
                    <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>
                      {docs[id].description}
                    </Text>

                    <View style={dark_mode ? dark_styles.goalsBoxPriority : styles.goalsBoxPriority}>
                      <View>
                        {whichPriorityText(docs[id].priority)}
                      </View>
                      <View style={{ marginRight: 0, marginLeft: "auto" }}>
                        <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, { fontFamily: "GothamMedium" }]}>{(docs[id].date).substring(0, 10)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
        </ScrollView> */}
      </ScrollView>
    </SafeAreaProvider>
  );
}
