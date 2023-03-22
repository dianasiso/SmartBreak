import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

// Font Gotham
import { useFonts } from 'expo-font';

// CSS
import { styles } from "./../../styles/css.js";

// Variables
import * as CONST from "./../../styles/variables.js";

export default function historicoPausas() {
    return (
        <SafeAreaView
            showsVerticalScrollIndicator={false}
            style={styles.mainContainerLight}>
            <ScrollView>
                <StatusBar style="dark" />

                <Text style={[styles.subTitleText, { marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral, paddingBottom: CONST.textPadding}]}>14 de nov. - 20 de nov.</Text>
                <View>
                    <Text style={[styles.normalText, {marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral}]}>Segunda-feira, 14 de nov.</Text>
                    <View style={styles.pauseBoxMain}>
                        <View style={styles.pauseBoxTop}>
                            <Text style={styles.normalTextWhite}>Total de pausa</Text>
                            <Text style={styles.normalTextWhite}>25 minutos</Text>
                        </View>
                        <View style={styles.pauseBoxBottom}>
                            <View>
                                <Text style={styles.smallText}>10:30 - 10:40</Text>
                                <Text style={styles.smallText}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>10 min</Text>
                                <Text style={styles.smallText}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={[styles.normalText, {marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral}]}>Terça-feira, 15 de nov.</Text>
                    <View style={styles.pauseBoxMain}>
                        <View style={styles.pauseBoxTop}>
                            <Text style={styles.normalTextWhite}>Total de pausa</Text>
                            <Text style={styles.normalTextWhite}>25 minutos</Text>
                        </View>
                        <View style={styles.pauseBoxBottom}>
                            <View>
                                <Text style={styles.smallText}>10:30 - 10:40</Text>
                                <Text style={styles.smallText}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>10 min</Text>
                                <Text style={styles.smallText}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={[styles.normalText, {marginLeft: CONST.backgroundPaddingLateral, marginRight: CONST.backgroundPaddingLateral}]}>Quarta-feira, 16 de nov.</Text>
                    <View style={styles.pauseBoxMain}>
                        <View style={styles.pauseBoxTop}>
                            <Text style={styles.normalTextWhite}>Total de pausa</Text>
                            <Text style={styles.normalTextWhite}>25 minutos</Text>
                        </View>
                        <View style={styles.pauseBoxBottom}>
                            <View>
                                <Text style={styles.smallText}>10:30 - 10:40</Text>
                                <Text style={styles.smallText}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>10 min</Text>
                                <Text style={styles.smallText}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}