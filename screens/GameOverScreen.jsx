/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameOverScreen = ({ navigation }) => {
  const handleTryAgain = () => {
    navigation.navigate('IntroPage');
  };

  const handleMainMenu = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMainMenu}>
        <Text style={styles.buttonText}>Main Menu</Text>
      </TouchableOpacity>
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
    color: 'white',
    fontFamily: 'MedievalSharp-Regular',
    fontSize: 40,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#808080',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'MedievalSharp-Regular',
    textAlign: 'center',
  },
});

export default GameOverScreen;
