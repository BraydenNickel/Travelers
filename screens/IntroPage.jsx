/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Button, Text } from 'react-native';
import CharacterImage from '../assets/img/charabg.jpeg';
import { StyleSheet } from 'react-native';


const IntroPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={CharacterImage} style={styles.Image} />
            <Text>Welcome to Travelers story book game</Text>
            <Button title="Continue" onPress={() => navigation.navigate('GameScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f3f3f',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    Title: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular', // not working
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    Text: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular', // not working
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    Image: {
        justifyContent: 'center', // i want this at the top of the screen
        width: '80%',
        height: '50%',
    },
    Button: {
        width: 200,
        marginVertical: 10,
        marginHorizontal: 50,
        titleStyle: {
            color: 'white',
            marginHorizontal: 20,
        },
    },
});
export default IntroPage;
