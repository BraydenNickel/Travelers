/* eslint-disable prettier/prettier */


import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import logoTextImage from '../assets/img/logo.png';

//import HomeLayout from '../layout/HomeLayout'; 


const HomeScreen = ({ navigation }) => {
  const [scaleNewGame] = useState(new Animated.Value(1));
  const [scaleLoadGame] = useState(new Animated.Value(1));

  const startNewGame = () => {
    navigation.navigate('IntroPage');
    console.log('New Game started');
  };

  const loadSavedGame = () => {
    // Add logic for loading a saved game
    console.log('Load Game');
  };

  const breatheAnimation = (scale) => {
    return Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    let isMounted = true;

    const runAnimation = () => {
      if (isMounted) {
        Animated.loop(breatheAnimation(scaleNewGame)).start();
        Animated.loop(breatheAnimation(scaleLoadGame)).start();
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [scaleNewGame, scaleLoadGame]);

  return (
    <View style={styles.container}>
      <Image source={logoTextImage} style={styles.Image} />
      <View style={styles.ButtonContainer}>
        <Text style={styles.Title}>TRAVELERS</Text>
        <TouchableOpacity
          style={[styles.button, { transform: [{ scale: scaleNewGame }] }]}
          onPress={startNewGame}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <View style={styles.ButtonSpace} />
        <TouchableOpacity
          style={[styles.button, { transform: [{ scale: scaleLoadGame }] }]}
          onPress={loadSavedGame}
        >
          <Text style={styles.buttonText}>Load Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f3f3f',
    alignItems: 'center',
    position: 'relative',
  },
  Title: {
    color: 'white',
    fontFamily: 'MedievalSharp-Regular',
    textAlign: 'center',
    fontSize: 70,
    marginVertical: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 35,
  },
  Image: {
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'MedievalSharp-Regular',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 4,
  },
  ButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginVertical: 50,

  },
  ButtonSpace: {
    height: 30,
  },
});

export default HomeScreen;
