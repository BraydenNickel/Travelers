/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Button, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import logoTextImage from '../assets/img/logo_text.png';
<<<<<<< Updated upstream
=======
import { TouchableOpacity } from 'react-native-gesture-handler';
>>>>>>> Stashed changes

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
      <Image source={logoTextImage} style={styles.Image}/>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={startNewGame}>
            <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <View style={styles.ButtonSpace} />
        <TouchableOpacity style={styles.button} onPress={loadSavedGame}>
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
    fontFamily: 'MedievalSharp-Regular', // not working
    textAlign: 'center',
    fontSize: 36,
    marginVertical: 20,
  },
  Image: {
    alignSelf: 'flex-start',
    alignSelf: 'center',
    width: '95%',
    height: 231,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'MedievalSharp-Regular',
    textAlign: 'center',
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
