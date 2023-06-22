import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Pressable } from 'react-native';
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";


// Font Gotham
import { useFonts } from 'expo-font';

// CSS
import { styles } from "./../../styles/css.js";
import { dark_styles } from "../../styles/darkcss.js";

// Variables
import * as CONST from "./../../styles/variables.js";


export default function HistoricoPausas({ navigation }) {
    // Loading Gotham font
    const [loaded] = useFonts({
        GothamMedium: "./../fonts/GothamMedium.ttf",
        GothamBook: "./../fonts/GothamBook.ttf",
    });

    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [total, setTotal] = useState([]);
    const [tempoSelected, setTempoSelected] = useState('este dia')
    const currentDate = new Date().toISOString();

    const userData = useSelector((state) => state.user);
    const dark_mode = userData.accessibility[1]

    let startDay;
    let startMonth;
    let endDay;
    let endMonth;

    // para ter o dia e a semana
    const renderDate = (tempoSelected) => {
        const lowerCaseDate = tempoSelected.toLowerCase();

        if (lowerCaseDate === 'este dia') {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            return `${day}-${month}`;
        } else if (lowerCaseDate === 'esta semana') {
            const currentDate = new Date();
            const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
            const daysToMonday = (currentDay + 6) % 7; // Calculate the number of days to Monday
            const startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - daysToMonday);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            startDay = startDate.getDate().toString().padStart(2, '0');
            startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
            endDay = endDate.getDate().toString().padStart(2, '0');
            endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');

            return `${startDay}-${startMonth} until ${endDay}-${endMonth}`;
        } else {
            return 'Invalid date';
        }
    };
    // console.log(start);
    // console.log(end);
    // console.log(total);

    // ver se a data atual dá match com os dados da API 
    const matchingDates = start.reduce((matches, date, index) => {
        const startDate = new Date(date);
        const endDate = new Date(end[index]);
        const currentDay = new Date(currentDate).getDate();

        if (startDate.getDate() === currentDay && endDate.getDate() === currentDay) {
            matches.push({
                start: date,
                end: end[index],
                time: total[index]
            });
        }

        return matches;
    }, []);

    // ver se a data atual dá match com os dados da API numa semana
    const matchingDatesWeek = start.reduce((matches, date, index) => {
        const startDate = new Date(date);
        const endDate = new Date(end[index]);
        const weekStartDate = new Date('2023-06-19'); // Start of the week (June 19)
        const weekEndDate = new Date('2023-06-25'); // End of the week (June 25)

        console.log('start' + weekStartDate)
        console.log('end' + weekEndDate)

        if (startDate >= weekStartDate && endDate <= weekEndDate) {
            matches.push({
                date: startDate.toLocaleDateString(), // Store the date as a string
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                time: total[index]
            });
        }

        return matches;
    }, []);


    // soma do tempo total de pausa do 'este dia'
    const totalMinutes = matchingDates.reduce((accumulator, data) => accumulator + data.time, 0);
    const formattedTotalMinutes = totalMinutes.toFixed(2);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://sb-api.herokuapp.com/pauses/user/" + userData.userID, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + userData.token
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    const startDates = data.message.map((item) => item.start_date);
                    setStart(startDates);

                    const endDates = data.message.map((item) => item.end_date);
                    setEnd(endDates);

                    const tempoTotal = data.message.map((item) => item.time);
                    setTotal(tempoTotal);

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
      style={[dark_mode ? dark_styles.containerLight : styles.containerLight, { paddingTop: CONST.backgroundPaddingTop / 2 }]}
    >
      <StatusBar style={dark_mode ? "light" : "dark"} />
            <ScrollView style={{marginBottom: 70}}>
{/* 
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Pressable
                        style={[
                            dark_mode ? dark_styles.primaryButton : styles.primaryButton,
                            {
                                marginTop: CONST.backgroundPaddingLateral
                            },
                            tempoSelected === 'este dia' ? styles.primaryButton : styles.buttonWhite,
                        ]}
                        onPress={() => setTempoSelected('este dia')}
                    >
                        <Text style={[dark_mode ? dark_styles.normalText : styles.normalText]}>Este Dia</Text>
                    </Pressable>

                    <Pressable
                        style={[
                            dark_mode ? dark_styles.primaryButton : styles.primaryButton,
                            {
                                marginTop: CONST.backgroundPaddingLateral
                            },
                            tempoSelected === 'esta semana' ? styles.primaryButton : styles.buttonWhite,
                        ]}
                        onPress={() => setTempoSelected('esta semana')}
                    >
                        <Text style={[dark_mode ? dark_styles.normalText : styles.normalText]}>Esta Semana</Text>
                    </Pressable>
                </View> */}

{/* <Text style={[styles.subTitleText, { marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral, paddingBottom: CONST.textPadding }]}>{renderDate(tempoSelected)}</Text> */}
                <Text style={[dark_mode ? dark_styles.subTitleText : styles.subTitleText, { paddingBottom: CONST.textPadding }]}>Pausas realizadas hoje</Text>

                    <View>

                        {tempoSelected === 'este dia' && matchingDates.length > 0 && (
                            <View style={dark_mode ? dark_styles.pauseBoxMain : styles.pauseBoxMain}>
                                <View style={dark_mode ? dark_styles.pauseBoxTop : styles.pauseBoxTop}>
                                    <Text style={dark_mode ? dark_styles.normalTextWhite : styles.normalTextWhite}>Total de pausa</Text>
                                    <Text style={dark_mode ? dark_styles.normalTextWhite : styles.normalTextWhite}><Text style={{fontFamily: 'GothamMedium'}}>{formattedTotalMinutes} </Text>minutos</Text>
                                </View>
                                <View style={dark_mode ? dark_styles.pauseBoxBottom : styles.pauseBoxBottom}>
                                    <View>
                                        {matchingDates.map((data, index) => (
                                            <View key={index}>
                                                {data.start && data.end && (
                                                    <>
                                                        <Text style={dark_mode ? dark_styles.smallText : styles.smallText}>{data.start.substr(11, 5)}h - {data.end.substr(11, 5)}h{"\n"}</Text>
                                                    </>
                                                )}
                                            </View>
                                        ))}
                                    </View>

                                    <View>
                                        {matchingDates.map((data, index) => (
                                            <View key={index}>
                                                {data.time && (
                                                    <>
                                                        <Text style={[dark_mode ? dark_styles.smallText : styles.smallText, {textAlign: "right"}]}>
                                                            {data.time}min {"\n"}
                                                        </Text>
                                                    </>
                                                )}
                                            </View>
                                        ))}
                                    </View>

                                </View>
                            </View>
                        )}
                        {tempoSelected === 'este dia' && matchingDates.length === 0 && (
                            <Text style={dark_mode ? dark_styles.normalText : styles.normalText}>Não fizeste pausas neste dia.</Text>
                        )}

                        {/* {tempoSelected === 'esta semana' && matchingDatesWeek.length > 0 && (
                            matchingDatesWeek.map((data, index) => {
                                const { date, start, end, time } = data;
                                const startDate = new Date(start);
                                const endDate = new Date(end);
                                const formattedDate = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                                const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0, -3);
                                const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0, -3);

                                return (
                                    <View key={index}>
                                        <Text style={[styles.normalText, { marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral }]}>
                                            {formattedDate}
                                        </Text>
                                        <View style={styles.pauseBoxMain}>
                                            <View style={styles.pauseBoxTop}>
                                                <Text style={styles.normalTextWhite}>Total de pausa</Text>
                                                <Text style={styles.normalTextWhite}>{formattedTotalMinutes} minutos</Text>
                                            </View>
                                            <View style={styles.pauseBoxBottom}>
                                                <View>
                                                    <Text style={styles.smallText}>{startTime}-{endTime}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.smallText}>{time}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                        )}
                        {tempoSelected === 'esta semana' && matchingDatesWeek.length === 0 && (
                            <Text>Não fizeste pausas neste dia.</Text>
                        )} */}
                    </View>


            </ScrollView>
        </SafeAreaProvider >
    );
}