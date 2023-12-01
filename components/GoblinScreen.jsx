/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import GameScenarios from './GameScenarios';
import { useFocusEffect } from '@react-navigation/native';
import ChoiceButton from '../layout/ChoiceButton';
import Goblin from '../assets/img/goblin.png';
import goblinBg from '../assets/img/enemy_encounterbg.jpg';


const GoblinScreen = ({ navigation, route} ) => {
    const { scenarios } = GameScenarios({ navigate: navigation.navigate });
    const { playerStats: initialPlayerStats, updateStats } = route.params;
    const [playerStats, setPlayerStats] = useState(initialPlayerStats);
    const [combatLog, setCombatLog] = useState([]);
    const [goblinHealth, setGoblinHealth] = useState(50);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [canPlayerAttack, setCanPlayerAttack] = useState(true);
    const [damageAnimation] = useState(new Animated.Value(0));

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

    //Causes monster to shake when damaged by player
    const monsterDamage = () => {
      Animated.timing(damageAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        damageAnimation.setValue(0);
      });
    };

    const handleAttack = () => {
        if (!canPlayerAttack) {
            return;
        }
        const playerDamage = Math.floor(Math.random() * playerStats.strength) + 1;
        setGoblinHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
        addLog(`Player attacks for ${playerDamage} damage.`, 'player');
        setIsPlayerTurn(false); //Switch to goblin's turn
        setCanPlayerAttack(false); // Disable player's attack

        //Trigger damage animation
        monsterDamage();

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
          addLog(`Player casts magic for ${magicDamage} damage.`, 'magic');
          setIsPlayerTurn(false); //Switch to goblin's turn
          setCanPlayerAttack(false); // Disable player's attack

          //Trigger damage animation
          monsterDamage();
              // Log playerStats every attack
          console.log('Player Stats:', playerStats);


          handleGoblinAttack(); // Goblin's turn
        } else {
          addLog('Not enough mana to cast magic.', 'player');
        }
      };

      const handleGoblinAttack = () => {
        const goblinDamage = Math.floor(Math.random() * 10) + 1;
        setPlayerStats((prevStats) => ({
          ...prevStats,
          health: Math.max(prevStats.health - goblinDamage, 0),
        }));
        addLog(`Goblin attacks for ${goblinDamage} damage.`, 'goblin');
        setIsPlayerTurn(true); //Switch to player's turn
        setCanPlayerAttack(true); // Enable player's attack
      };

      const addLog = (text, source) => {
        setCombatLog((prevLog) => [...prevLog, { text, source }]);
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

    }, [goblinHealth, playerStats, isPlayerTurn, navigation, scenarios, updateStats]);

    const scrollViewRef = useRef();

    const scrollToBot = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated:true});
      }
    };


    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={goblinBg} style={styles.bottomImage} />

            <Animated.Image
              source={Goblin}
              style={[
                styles.topImage,
                {
                  transform: [
                    {
                      translateX: damageAnimation.interpolate({
                        inputRange: [0,0.2,0.4,0.6,0.8,1],
                        outputRange: [0,-10,10,-10,10,0],
                      }),
                    },
                  ],
                },
              ]}
              />
          </View>
          <View style={styles.informationContainer}>
          <Text style={styles.informationEnemy}><Text style={styles.goblin}>Goblin</Text> Health: <Text style={styles.health}>{goblinHealth}</Text></Text>
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
                      : log.source === 'goblin'
                      ? styles.goblinLog
                      : styles.magicLog,
                    ]}
                    key={index}
                    >
                      {log.text}
                    </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 20,
    paddingRight: 15,
  },

  imageContainer : {
    position: 'relative',
    width: '100%',
    height: '50%',
  },

  bottomImage : {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  topImage : {
    position: 'absolute',
    top: '30%',
    left : '25%',
    right: 0,
    bottom: 0,
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
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
  goblin: {
    color: 'rgba(38,185,70,1)',
  },

  playerLog: {
    color: 'white',
  },
  magicLog: {
    color: 'white',
  },
  goblinLog: {
    color: 'rgba(38,185,70,1)',
  },

  informationContainer : {
    marginBottom: 25,
    width: '100%',
    borderColor: 'white',
  },

  buttonContainer : {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
});

export default GoblinScreen;
