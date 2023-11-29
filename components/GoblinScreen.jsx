/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import GameScenarios from './GameScenarios';
import { useFocusEffect } from '@react-navigation/native';
import ChoiceButton from '../layout/ChoiceButton';


const GoblinScreen = ({ navigation, route} ) => {
    const { scenarios } = GameScenarios();
    const { playerStats: initialPlayerStats, updateStats } = route.params;
    const [playerStats, setPlayerStats] = useState(initialPlayerStats);
    const [combatLog, setCombatLog] = useState([]);
    const [goblinHealth, setGoblinHealth] = useState(50);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [canPlayerAttack, setCanPlayerAttack] = useState(true);

    useEffect(() => {
        // Call updateStats when the component mounts
        updateStats(initialPlayerStats);
    }, [updateStats, initialPlayerStats]);

    // Use useFocusEffect to update playerStats when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            setPlayerStats(initialPlayerStats);
        }, [initialPlayerStats])
    );

    // Update playerStats whenever it changes
    useEffect(() => {
        updateStats(playerStats);
    }, [updateStats, playerStats]);

    const handleAttack = () => {
        if (!canPlayerAttack) {
            return;
        }
        const playerDamage = Math.floor(Math.random() * playerStats.strength) + 1;
        setGoblinHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
        setCombatLog((prevLog) => [
          ...prevLog,
          `Player attacks for ${playerDamage} damage.`,
        ]);
        setIsPlayerTurn(false); //Switch to goblin's turn
        setCanPlayerAttack(false); // Disable player's attack

            // Log playerStats every attack
        console.log('Player Stats:', playerStats);


        handleGoblinAttack(); // Goblin's turn
      };

      const handleMagic = () => {
        if (!canPlayerAttack) {
            return;
        }
        if (playerStats.mana >= 10) {
          const magicDamage =
            Math.floor(Math.random() * playerStats.intelligence) + 1;
          setGoblinHealth((prevHealth) => Math.max(prevHealth - magicDamage, 0));
          setPlayerStats((prevStats) => ({ ...prevStats, mana: prevStats.mana - 10 }));
          setCombatLog((prevLog) => [
            ...prevLog,
            `Player casts magic for ${magicDamage} damage.`,
          ]);
          setIsPlayerTurn(false); //Switch to goblin's turn
          setCanPlayerAttack(false); // Disable player's attack
              // Log playerStats every attack
          console.log('Player Stats:', playerStats);


          handleGoblinAttack(); // Goblin's turn
        } else {
          setCombatLog((prevLog) => [
            ...prevLog,
            'Not enough mana to cast magic.',
          ]);
        }
      };

      const handleGoblinAttack = () => {
        const goblinDamage = Math.floor(Math.random() * 10) + 1;
        setPlayerStats((prevStats) => ({
          ...prevStats,
          health: Math.max(prevStats.health - goblinDamage, 0),
        }));
        setCombatLog((prevLog) => [
          ...prevLog,
          `Goblin attacks for ${goblinDamage} damage.`,
        ]);
        setIsPlayerTurn(true); //Switch to player's turn
        setCanPlayerAttack(true); // Enable player's attack
      };

      useEffect(() => {
        if (goblinHealth === 0) {
            const nextScenarioId = 'VictoryGoblin';
            const nextScenario = scenarios.find((scenario) => scenario.id === nextScenarioId);

            if (nextScenario) {
                updateStats(playerStats);
              // Replace the current screen with the Victory scenario
              navigation.navigate('VictoryScreen');
            } else {
                console.error(`Scenario with ID ${nextScenarioId} not found.`);
            }
        }

        if (playerStats.health === 0) {
            // Navigate to the HomeScreen if player health reaches 0
            navigation.navigate('GameOverScreen');
        }

        if (!isPlayerTurn) {
            // Goblin's turn
            console.log("Player's Current Stats:", playerStats); // Print player's current stats
            const goblinTimeout = setTimeout(() => {
                handleGoblinAttack();
            }, 1000);

            return () => clearTimeout(goblinTimeout);
        }
    }, [goblinHealth, playerStats, isPlayerTurn, navigation, scenarios, updateStats]);

    const scrollViewRef = useRef();

    const scrollToBot = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated:true});
      }
    }
  


    return (
        <View style={styles.container}>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>Player Health: {playerStats.health}</Text>
            <Text style={styles.information}>Player Mana: {playerStats.mana}</Text>
            <Text style={styles.information}>Goblin Health: {goblinHealth}</Text>
          </View>
          <View style={styles.buttonContainer}>
              <ChoiceButton title="Physical Attack" onPress={handleAttack} />
              <ChoiceButton title="Magic Attack" onPress={handleMagic} />
          </View>
          <ScrollView 
            style={styles.logScrollContainer}  
            ref={scrollViewRef}
            onContentSizeChange={scrollToBot}>
            <View style={styles.logContainer}>
                {combatLog.map((log, index) => (
                    <Text style={styles.logInformation} key={index}>{log}</Text>
                ))}
            </View>
          </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: 'rgba(12,12,12,0.90)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 20,
  },

  information : {
    color: 'white',
    fontSize: 24,
    fontFamily: 'MedievalSharp-Regular',
    paddingBottom: 4,
    textAlign: 'left',
  },

  informationContainer : {
    marginBottom: 25,
  },

  buttonContainer : {
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 15,
  },

  logInformation : {
    color: 'white',
    fontSize: 20,
    fontFamily: 'MedievalSharp-Regular',
  },

  logScrollContainer : {
    flex: 1,
    maxHeight: 350,
    marginTop: 20
  }

  
})

export default GoblinScreen;
