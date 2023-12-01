/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Button, Text, StyleSheet, ScrollView } from 'react-native';
import GameScenarios from './GameScenarios';
import { useFocusEffect } from '@react-navigation/native';
import bullImage from '../assets/img/boss_encounter.jpeg';
import ChoiceButton from '../layout/ChoiceButton';
import VictoryScreen from '../screens/VictoryScreen';

const MinotaurScreen = ({ navigation, route} ) => {
    const { scenarios, handleScenarioAction } = GameScenarios({ navigate: navigation.navigate });
    const { playerStats: initialPlayerStats, updateStats } = route.params;
    const [playerStats, setPlayerStats] = useState(initialPlayerStats);
    const [combatLog, setCombatLog] = useState([]);
    const [minotaurHealth, setMinotaurHealth] = useState(50);
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
        setMinotaurHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
        addLog(`Player attacks for ${playerDamage} damage.`, 'player');
        setIsPlayerTurn(false); //Switch to minotaur's turn
        setCanPlayerAttack(false); // Disable player's attack

            // Log playerStats every attack
        console.log('Player Stats:', playerStats);


        handleMinotaurAttack(); // Minotaur's turn
      };

      const handleMagic = () => {
        if (!canPlayerAttack) {
            return;
        }
        if (playerStats.mana >= 10) {
          const magicDamage =
            Math.floor(Math.random() * playerStats.intelligence) + 1;
          setMinotaurHealth((prevHealth) => Math.max(prevHealth - magicDamage, 0));
          setPlayerStats((prevStats) => ({ ...prevStats, mana: prevStats.mana - 10 }));
          addLog(`Player casts magic for ${magicDamage} damage.`, 'magic');
          setIsPlayerTurn(false); //Switch to minotaur's turn
          setCanPlayerAttack(false); // Disable player's attack
              // Log playerStats every attack
          console.log('Player Stats:', playerStats);


          handleMinotaurAttack(); // Minotaur's turn
        } else {
          setCombatLog((prevLog) => [
            ...prevLog,
            'Not enough mana to cast magic.',
          ]);
        }
      };

      const handleMinotaurAttack = () => {
        const minotaurDamage = Math.floor(Math.random() * 10) + 1;
        setPlayerStats((prevStats) => ({
          ...prevStats,
          health: Math.max(prevStats.health - minotaurDamage, 0),
        }));
        addLog(`Minotaur attacks for ${minotaurDamage} damage.`, 'bull');
        setIsPlayerTurn(true); //Switch to player's turn
        setCanPlayerAttack(true); // Enable player's attack
      };

      const addLog = (text, source) => {
        setCombatLog((prevLog) => [...prevLog, { text, source }]);
      };

      useEffect(() => {
        if (minotaurHealth === 0) {
            const nextScenarioId = 'VictoryMinotaur';
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
            // Minotaur's turn
            console.log("Player's Current Stats:", playerStats); // Print player's current stats
            const minotaurTimeout = setTimeout(() => {
                handleMinotaurAttack();
            }, 1000);

            return () => clearTimeout(minotaurTimeout);
        }
    }, [minotaurHealth, playerStats, isPlayerTurn, navigation, scenarios, updateStats]);

    const scrollViewRef = useRef();

    const scrollToBot = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated:true});
      }
    };


    return (
      <View style={styles.container}>
      <Image source = {bullImage} style={styles.Image} />
      <View style={styles.informationContainer}>
      <Text style={styles.informationEnemy}><Text style={styles.bull}>Minotaur</Text> Health: <Text style={styles.health}>{minotaurHealth}</Text></Text>
        <Text style={styles.information}>Player Health: <Text style={styles.health}>{playerStats.health}</Text></Text>
        <Text style={styles.information}>Player Mana: <Text style={styles.mana}>{playerStats.mana}</Text></Text>
      </View>
      <View style={styles.buttonContainer}>
          <ChoiceButton title="Physical Attack" onPress={handleAttack} />
          <ChoiceButton title="Magic Attack" onPress={handleMagic} />
          <ChoiceButton title="Run Away" onPress={() => navigation.pop()} />
      </View>
      <ScrollView
        style={styles.logScrollContainer}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBot}>
        <View style={styles.logContainer}>
            {combatLog.map((log, index) => (
                <Text style={[
                  styles.logInformation,
                  log.source === 'player' 
                  ? styles.playerLog 
                  : log.source === 'bull'
                  ? styles.bullLog
                  : styles.magicLog,
                ]}
                key={index}
                >
                  {log.text}
                </Text>
            ))}
        </View>
      </ScrollView>
          {minotaurHealth === 0 && <VictoryScreen onReturnToMainHallway={handleReturnToMainHallway} />}

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
paddingRight: 15,
},

information: {
color: 'white',
fontSize: 24,
fontFamily: 'MedievalSharp-Regular',
paddingBottom: 4,
textAlign: 'left',
},

informationEnemy: {
color: 'white',
fontSize: 24,
fontFamily: 'MedievalSharp-Regular',
paddingBottom: 4,
textAlign: 'right',
paddingRight: 15,
},
health: {
color: 'red',
},
mana: {
color: 'blue',
},
bull: {
color: 'rgba(114,34,16,1)',
},

playerLog: {
color: 'white',
},
magicLog: {
color: 'blue',
},
bullLog: {
color: 'rgba(114,34,16,1)',
},

informationContainer : {
marginBottom: 25,
width: '100%',
borderColor: 'white',
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
maxHeight: 60,
marginTop: 20,
},
Image: {
alignSelf: 'center',
width: '90%',
height: '35%',
position: 'relative',
marginTop: 20,
marginBottom: 20,
},


});

export default MinotaurScreen;
