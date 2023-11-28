/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-native';
import { View, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import GameScenarios from '../components/GameScenarios';
import hallwayImage from '../assets/img/hallway.jpeg';

function GameScreen() {
    const [currentScenario, setCurrentScenario] = useState(1);
    const scenarios = GameScenarios();

    const handelChoice = (choiceIndex) => {
        const nextScenario = scenarios.find((scenario) => scenario.id === currentScenario).choices[choiceIndex].nextScenario;
        setCurrentScenario(nextScenario);
    };

    const currentScenarioData = scenarios.find((scenario) => scenario.id === currentScenario);

    if (!currentScenarioData) {
        return (
          <View style={styles.container}>
            <Text style={styles.Title}>No scenario found</Text>
          </View>
        );
      }

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentScenarioData.image}} style={styles.Image} />
      <Text style={styles.question}>{currentScenarioData.question}</Text>
      {currentScenarioData.choices.map((choice, index) => (
        <Button
            key={index}
            style={styles.choiceButton}
            title={choice.text}
            onPress={() => handelChoice(index)}
        />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f3f3f',
        alignItems: 'center',
    },
    Title: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular', // not working
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    Image: {
        justifyContent: 'center', // i want this at the top of the screen
        width: '80%',
        height: '50%',
    },
    Text: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular', // not working
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    question: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular', // not working
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    choiceButton: {
        backgroundColor: 'rgba(39, 39, 39, 1)',
        width: 200,
        marginVertical: 10,
        marginHorizontal: 50,
        titleStyle: {
        color: 'white',
        marginHorizontal: 20,
        },
    },
});

export default GameScreen;
