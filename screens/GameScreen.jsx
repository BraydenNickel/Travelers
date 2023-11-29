/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import GameScenarios from '../components/GameScenarios';
import ChoiceButton from '../layout/ChoiceButton';

// Combat component
import CombatScreen from '../components/GoblinScreen';
import PlayerStats from '../components/PlayerStats';

function GameScreen({ navigation }) {
    const [currentScenario, setCurrentScenario] = useState('GameStart');
    const { scenarios, playerStats, updateStats} = GameScenarios();

    const handleChoice = (choiceIndex) => {
        const currentScenarioData = scenarios.find((scenario) => scenario.id === currentScenario);

        // check if the current scenario is a combat scenario
        if (currentScenarioData.choices[choiceIndex].nextScenario === 'CombatGoblin') {
            navigation.navigate('GoblinScreen', { playerStats: playerStats, updateStats: updateStats, currentScenario: currentScenario });
        }
        else if (currentScenarioData.choices[choiceIndex].nextScenario === 'CombatMinotaur'){
            navigation.navigate('MinotaurScreen', { playerStats: playerStats, updateStats: updateStats, currentScenario: currentScenario });
        } else {
            const nextScenario = currentScenarioData.choices[choiceIndex].nextScenario;
            setCurrentScenario(nextScenario);

            const action = currentScenarioData.choices[choiceIndex].action;
            if (action) {
                const updatedStats = action();
                updateStats(updatedStats);
            }
        }
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
        <ChoiceButton
            key={index}
            title={choice.text}
            onPress={() => handleChoice(index)}
        />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(12, 12, 12, 0.90)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    Image: {
        alignSelf: 'center',
        width: '90%',
        height: '35%',
        position: 'relative',
        marginTop: 20,
    },
    question: {
        color: 'white',
        fontFamily: 'MedievalSharp-Regular',
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        marginTop: 20,
    },
});
export default GameScreen;
