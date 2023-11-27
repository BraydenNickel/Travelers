/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Button, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import logoTextImage from '../assets/img/logo.png';
//import HomeLayout from '../layout/HomeLayout';

const HomeScreen = ({ navigation }) => {
  const startNewGame = () => {
    navigation.navigate('IntroPage');
    console.log('New Game started');
  };

  const loadSavedGame = () => {
    // Add logic for loading a saved game
    console.log('Load Game');
  };

  return (
    <View style={styles.container}>
      <Image source={logoTextImage} style={styles.Image} resizeMode="cover" />
      <View style={styles.ButtonContainer}>
      <Text style={styles.Title}>Travellers</Text>
        <Button title="New Game" onPress={startNewGame} />
        <View style={styles.ButtonSpace} />
        <Button title="Load Game" onPress={loadSavedGame} />
      </View>
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
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  Image: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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
  ButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '75%',
    height: '100%',
    marginVertical: 10,
  },
  ButtonSpace: {
    height: 10,
  },
});

export default HomeScreen;
