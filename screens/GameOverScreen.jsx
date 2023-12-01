/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChoiceButton from '../layout/ChoiceButton';

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
      <ChoiceButton title='Play Again' onPress={handleTryAgain}/>
      <ChoiceButton title='Main Menu' onPress={handleMainMenu}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(12, 12, 12, 0.90)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(182,6,6,1)',
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
