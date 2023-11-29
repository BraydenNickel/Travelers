/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text } from 'react-native';
import PlayerStats from '../components/PlayerStats';

const CombatScreen = ({ navigation, route} ) => {
    const initialPlayerStats = route.params?.playerStats || PlayerStats.defaultProps;
    const [playerStats, setPlayerStats] = useState(initialPlayerStats);
    const [combatLog, setCombatLog] = useState([]);
    const [goblinHealth, setGoblinHealth] = useState(50);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const handleAttack = () => {
        const playerDamage = Math.floor(Math.random() * playerStats.strength) + 1;
        setGoblinHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
        setCombatLog((prevLog) => [
          ...prevLog,
          `Player attacks for ${playerDamage} damage.`,
        ]);
      };

      const handleMagic = () => {
        if (playerStats.mana >= 10) {
          const magicDamage =
            Math.floor(Math.random() * playerStats.intelligence) + 1;
          setGoblinHealth((prevHealth) => Math.max(prevHealth - magicDamage, 0));
          setPlayerStats((prevStats) => ({ ...prevStats, mana: prevStats.mana - 10 }));
          setCombatLog((prevLog) => [
            ...prevLog,
            `Player casts magic for ${magicDamage} damage.`,
          ]);
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
      };

      useEffect(() => {
        if (!isPlayerTurn) {
          //goblin's turn
          const goblinTimeout = setTimeout(() => {
            handleGoblinAttack();
            setIsPlayerTurn(true);
          }, 1000);
            return () => clearTimeout(goblinTimeout);
        }
        }, [isPlayerTurn]);

      useEffect(() => {
        if (goblinHealth === 0) {
          // Gain EXP and level up (you can customize this logic)
          setPlayerStats((prevStats) => ({
            ...prevStats,
            experience: (prevStats.experience || 0) + 10,
          }));

          // Navigate to the next scenario or handle leveling up
          navigation.navigate('NextScenario');
        }

        if (playerStats.health === 0) {
          // Navigate to the HomeScreen if player health reaches 0
          navigation.navigate('HomeScreen');
        }
        // Goblin's turn
        handleGoblinAttack();
        }, [goblinHealth, playerStats, navigation]);

    return (
        <View>
            <Text>Player Health: {playerStats.health}</Text>
            <Text>Player Mana: {playerStats.mana}</Text>
            <Text>Goblin Health: {goblinHealth}</Text>
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

export default CombatScreen;
