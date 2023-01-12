import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height_modal = 150;

export default function ModalFiltros() {

    return (
        <TouchableOpacity disabled={true}>
            <View>
                <Text>modal</Text>
                <Text>outro texto</Text>
            </View>
        </TouchableOpacity>
    )
}