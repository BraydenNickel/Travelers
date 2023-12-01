/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import GameScenarios from './GameScenarios';
import { useFocusEffect } from '@react-navigation/native';
import ChoiceButton from '../layout/ChoiceButton';
import TreeSpiritForest from '../assets/img/TreeSpiritForest.jpeg';

const TreeSpiritScreen = ({ navigation, route }) => {
  const { scenarios } = GameScenarios({ navigate: navigation.navigate });
  const { playerStats: initialPlayerStats, updateStats } = route.params;
  const [playerStats, setPlayerStats] = useState(initialPlayerStats);
  const [combatLog, setCombatLog] = useState([]);
  const [treeSpiritHealth, setTreeSpiritHealth] = useState(50); // Updated variable name
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
    setTreeSpiritHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0)); // Updated variable name
    addLog(`Player attacks for ${playerDamage} damage.`, 'player');
    setIsPlayerTurn(false); // Switch to TreeSpirit's turn
    setCanPlayerAttack(false); // Disable player's attack

    // Log playerStats every attack
    console.log('Player Stats:', playerStats);

    handleTreeSpiritAttack(); // TreeSpirit's turn
  };

  const handleMagic = () => {
    if (!canPlayerAttack) {
      return;
    }
    if (playerStats.mana >= 10) {
      const magicDamage = Math.floor(Math.random() * playerStats.intelligence) + 1;
      setTreeSpiritHealth((prevHealth) => Math.max(prevHealth - magicDamage, 0)); // Updated variable name
      setPlayerStats((prevStats) => ({ ...prevStats, mana: prevStats.mana - 10 }));
      addLog(`Player casts magic for ${magicDamage} damage.`, 'magic');
      setIsPlayerTurn(false); // Switch to TreeSpirit's turn
      setCanPlayerAttack(false); // Disable player's attack
      // Log playerStats every attack
      console.log('Player Stats:', playerStats);

      handleTreeSpiritAttack(); // TreeSpirit's turn
    } else {
        addLog('Not enough mana to cast magic.', 'player');
    }
  };

  const handleTreeSpiritAttack = () => {
    const treeSpiritDamage = Math.floor(Math.random() * 10) + 1; // Updated variable name
    setPlayerStats((prevStats) => ({
      ...prevStats,
      health: Math.max(prevStats.health - treeSpiritDamage, 0), // Updated variable name
    }));
    addLog(`TreeSpirit attacks for ${treeSpiritDamage} damage.`, 'treeSpirit'); // Updated text
    setIsPlayerTurn(true); // Switch to player's turn
    setCanPlayerAttack(true); // Enable player's attack
  };

  const addLog = (text, source) => {
    setCombatLog((prevLog) => [...prevLog, { text, source }]);
  };

  useEffect(() => {
    if (treeSpiritHealth === 0) {
      const nextScenarioId = 'VictoryTreeSpirit'; // Updated scenario ID
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
  }, [treeSpiritHealth, playerStats, isPlayerTurn, navigation, scenarios, updateStats]);

  const scrollViewRef = useRef();

  const scrollToBot = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={TreeSpiritForest} style={styles.Image} />
      <View style={styles.informationContainer}>
        <Text style={styles.informationEnemy}><Text style={styles.treeSpirit}>TreeSpirit</Text> Health: <Text style={styles.health}>{treeSpiritHealth}</Text></Text>
        <Text style={styles.information}>Player Health: <Text style={styles.health}>{playerStats.health}</Text></Text>
        <Text style={styles.information}>Player Mana: <Text style={styles.mana}>{playerStats.mana}</Text></Text>
      </View>
      <View style={styles.buttonContainer}>
        <ChoiceButton title="Physical Attack" onPress={handleAttack} />
        <ChoiceButton title="Magic Attack" onPress={handleMagic} />
        <ChoiceButton title="Run Away" onPress={() => navigation.pop()} />
      </View>
      <ScrollView style={styles.logScrollContainer} ref={scrollViewRef} onContentSizeChange={scrollToBot}>
        <View style={styles.logContainer}>
          {combatLog.map((log, index) => (
            <Text
              style={[
                styles.logInformation,
                log.source === 'player'
                  ? styles.playerLog
                  : log.source === 'treeSpirit'
                  ? styles.treeSpiritLog
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
  container: {
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
  treeSpirit: {
    color: 'rgba(114,34,16,1)',
  },

  playerLog: {
    color: 'white',
  },
  magicLog: {
    color: 'white',
  },
  treeSpiritLog: {
    color: 'rgba(114,34,16,1)',
  },

  informationContainer: {
    marginBottom: 25,
    width: '100%',
    borderColor: 'white',
  },

  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 15,
  },

  logInformation: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'MedievalSharp-Regular',
  },

  logScrollContainer: {
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

export default TreeSpiritScreen;
