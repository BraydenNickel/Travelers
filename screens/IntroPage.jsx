/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CharacterImg from '../assets/img/charabg.jpeg';

const IntroPage = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleContinue} activeOpacity={1}>
      <Image source={CharacterImg} style={styles.image} />
      <Text style={styles.text}>Welcome to Travelers story book game</Text>
      <Text style={styles.button}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 35,
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: 'MedievalSharp-Regular'
  },
  button: {
    color: 'white',
    fontSize: 30,
    marginVertical: 10,
    fontFamily: 'MedievalSharp-Regular'
  },
  image: {
    justifyContent: 'flex-start',
    width: '75%',
    height: '50%'
  }
});

export default IntroPage;
