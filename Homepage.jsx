import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

  // Function to start a new game
  const startNewGame = () => {
    // Reset the current scenario to the first scenario
    setCurrentScenario(gameScenarios()[0]);
  };

  // Function to load a saved game (You can implement this based on your needs)
  const loadSavedGame = () => {
    // Add logic to load a saved game state
    console.log('Loading saved game...');
  };


const HomePage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/img/logo_text.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text} onPress={startNewGame}>New Game</Text>
        <Text style={styles.text} onPress={loadSavedGame}>Load Game</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 231,
  },
  image: {
    width: '80%',
    height: auto,
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default HomePage;
