/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text } from 'react-native';
import GameScenarios from './GameScenarios';
import { useFocusEffect } from '@react-navigation/native';

const MinotaurScreen = ({ navigation, route} ) => {
    const { scenarios } = GameScenarios();
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
        setCombatLog((prevLog) => [
          ...prevLog,
          `Player attacks for ${playerDamage} damage.`,
        ]);
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
          setCombatLog((prevLog) => [
            ...prevLog,
            `Player casts magic for ${magicDamage} damage.`,
          ]);
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
        setCombatLog((prevLog) => [
          ...prevLog,
          `Minotaur attacks for ${minotaurDamage} damage.`,
        ]);
        setIsPlayerTurn(true); //Switch to player's turn
        setCanPlayerAttack(true); // Enable player's attack
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


    return (
        <View>
            <Text>Player Health: {playerStats.health}</Text>
            <Text>Player Mana: {playerStats.mana}</Text>
            <Text>Minotaur Health: {minotaurHealth}</Text>
            <Button title="Physical Attack" onPress={handleAttack} />
            <Button title="Magic Attack" onPress={handleMagic} />
            <View>
                {combatLog.map((log, index) => (
                    <Text key={index}>{log}</Text>
                ))}
            </View>
        </View>
    );
};

export default MinotaurScreen;
