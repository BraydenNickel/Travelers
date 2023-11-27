/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import logoTextImage from '../assets/img/logo_text.png';
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
      <Image source={logoTextImage} />
      <Text style={styles.title}>Travellers</Text>
      <Button title="New Game" onPress={startNewGame} />
      <Button title="Load Game" onPress={loadSavedGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default HomeScreen;
