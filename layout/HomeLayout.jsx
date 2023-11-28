/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';


export default function HomeScreen({ children }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(12, 12, 12, 0.75)',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    question: {
        fontSize: 18,
        marginVertical: 20,
    },
});
