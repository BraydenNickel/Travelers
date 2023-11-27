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
        backgroundColor: '#3f3f3f',
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
    choiceButton: {
        backgroundColor: 'rgba(39, 39, 39, 1)',
        width: 200,
        marginVertical: 10,
        marginHorizontal: 50,
        titleStyle: {
            color: 'white',
            marginHorizontal: 20,
        },
    },
});
