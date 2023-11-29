/* eslint-disable prettier/prettier */
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-native';
import { View, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import GameScenarios from '../components/GameScenarios';
import hallwayImage from '../assets/img/hallway.jpeg';
import { TouchableOpacity } from 'react-native-gesture-handler';

function GameScreen({ navigation }) {
    const [currentScenario, setCurrentScenario] = useState('BeginGame');
    const scenarios = GameScenarios();

  

    const handelChoice = (choiceIndex) => {
        const nextScenario = scenarios[currentScenario].choices[choiceIndex].nextScenario;
        setCurrentScenario(nextScenario);
    };

    const CustomButton = ({ title,onPress}) => {
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
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
      <Text style={styles.Title}>Travelers</Text>
      <Image source={currentScenarioData.image} style={styles.Image} />
      <Text style={styles.question}>{currentScenarioData.question}</Text>


      {currentScenarioData.choices.map((choice, index) => (
        <CustomButton
            key={index}
            title={choice.text}
            onPress={() => handelChoice(index)}
        />
        ))};
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
        fontFamily: 'MedievalSharp-Regular', 
        textAlign: 'justify',
        fontSize: 24,
        marginVertical: 20,
        marginTop: 150,
        marginHorizontal: 10,
    },
});

export default GameScreen;
