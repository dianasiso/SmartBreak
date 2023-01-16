import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

// Font Gotham
import { useFonts } from 'expo-font';

export default function historicoPausas() {


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar style="auto" />
                <Text style={styles.textoData}>14 de nov. - 20 de nov.</Text>

                <View style={{ marginTop: 35 }}>
                    <Text style={{ fontFamily: 'GothamBook', fontSize: 16 }}>Segunda-feira, 14 de nov.</Text>
                    <View style={styles.caixa}>
                        <View style={styles.parteCima}>
                            <Text style={styles.textoCima}>Total de pausa</Text>
                            <Text style={styles.textoCima}>25 minutos</Text>
                        </View>
                        <View style={styles.parteBaixo}>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10:30 - 10:40</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10 min</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 35 }}>
                    <Text style={{ fontFamily: 'GothamBook', fontSize: 16 }}>Terça-feira, 15 de nov.</Text>
                    <View style={styles.caixa}>
                        <View style={styles.parteCima}>
                            <Text style={styles.textoCima}>Total de pausa</Text>
                            <Text style={styles.textoCima}>25 minutos</Text>
                        </View>
                        <View style={styles.parteBaixo}>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10:30 - 10:40</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10 min</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 35 }}>
                    <Text style={{ fontFamily: 'GothamBook', fontSize: 16 }}>Quarta-feira, 16 de nov.</Text>
                    <View style={styles.caixa}>
                        <View style={styles.parteCima}>
                            <Text style={styles.textoCima}>Total de pausa</Text>
                            <Text style={styles.textoCima}>25 minutos</Text>
                        </View>
                        <View style={styles.parteBaixo}>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10:30 - 10:40</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>16:40 - 16:55</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>10 min</Text>
                                <Text style={{ fontFamily: 'GothamBook', fontSize: 14, lineHeight: 24 }}>15 min</Text>
                            </View>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

// Get screen dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 50;

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 25,
    },
    textoData: {
        fontFamily: 'GothamMedium',
        fontSize: 20,
        marginTop: 10,
    },
    caixa: {
        backgroundColor: '#E3ECF7',
        borderRadius: 14,
        width: '92%',
        borderRadius: 14,
        padding: 15,
        marginTop: 10,
        marginBottom: 20,
    },
    parteCima: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
        borderColor: 'rgba(0, 81, 186, 0.5)',
        borderBottomWidth: 2,
    },
    textoCima: {
        fontFamily: 'GothamMedium',
        fontSize: 16,
    },
    parteBaixo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    }
});