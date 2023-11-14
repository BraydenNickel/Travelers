/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState} from 'react';
import {Button} from 'react-native';
import gameScenarios from './scenarios/gameScenarios';
import {View, Image, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import logoTextImage from './img/logo_text.png';

function App() {
  const [currentScenario, setCurrentScenario] = useState(null);

  // Function to handle choice selection
  const handleChoice = (choiceId) => {
    // Add logic to determine the next scenario based on the choice
    // For simplicity, let's just go to the first scenario for a new game
    const nextScenario = gameScenarios().find((s) => s.id === 1);

    // If there's a next scenario, update the current scenario
    if (nextScenario) {
      setCurrentScenario(nextScenario);
    } else {
      // Handle game completion or ending
      console.log('Game Over');
    }
  };

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

  // If a scenario is not selected, show the home page
  if (!currentScenario) {
    return (
      <View style={styles.container}>
        <Image source={logoTextImage} />
        <Text style={styles.title}>RPG Game</Text>
        <Button title="New Game" onPress={startNewGame} />
        <Button title="Load Game" onPress={loadSavedGame} />
      </View>
    );
  }

  // If a scenario is selected, show the scenario page
  return (
    <View style={styles.container}>
      {/* Display current scenario information */}
      <Text style={styles.title}>RPG Game</Text>
      <Text style={styles.question}>{currentScenario.question}</Text>

      {/* Display choices as buttons */}
      {currentScenario.choices.map((choice) => (
        <Button
          key={choice.id}
          title={choice.text}
          onPress={() => handleChoice(choice.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
