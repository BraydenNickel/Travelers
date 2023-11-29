/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VictoryScreen = ({ navigation }) => {
  const handlePlayAgain = () => {
    navigation.navigate('IntroPage');
  };

  const handleExit = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory!</Text>
      <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleExit}>
        <Text style={styles.buttonText}>Exit</Text>
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

export default VictoryScreen;
