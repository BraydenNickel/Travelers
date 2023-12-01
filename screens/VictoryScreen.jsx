/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChoiceButton from '../layout/ChoiceButton';

const VictoryScreen = ({ navigation}) => {

  const handlePlayAgain = () => {
    navigation.navigate('IntroPage');
  };
  const handleExit = () => {
    navigation.navigate('HomeScreen');
  };

  console.log('VictoryScreen rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory!</Text>
      <ChoiceButton title='Play Again' onPress={handlePlayAgain}/>
      <ChoiceButton title='Main Menu' onPress={handleExit}/>
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
    color: 'white',
    fontFamily: 'MedievalSharp-Regular',
    fontSize: 40,
    marginVertical: 20,
    marginBottom: 20,
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

export default VictoryScreen;
