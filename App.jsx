/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import IntroPage from './screens/IntroPage';
import GameScreen from './screens/GameScreen';
import GameScenarios from './components/GameScenarios';
import {PlayerStatsProvider, usePlayerStats} from './components/PlayerStatsProvider';
import GoblinScreen from './components/GoblinScreen';
import MinotaurScreen from './components/MinotaurScreen';
import VictoryScreen from './screens/VictoryScreen';
import GameOverScreen from './screens/GameOverScreen';
import DruidScreen from './components/DruidScreen';
import TreeSpiritScreen from './components/TreeSpiritScreen';
import Character from './assets/img/charabg.jpeg';
import { Image } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, exitGame, route, updateStats}) => {
  const { playerStats: initialPlayerStats } = route.params || {};
  const [playerStats, setPlayerStats] = useState(initialPlayerStats);

  useEffect(() => {
    if (updateStats) {
      // Call the updateStats function to get the updated stats
      const updatedStats = updateStats();

      // Update the local state with the updated stats
      setPlayerStats(updatedStats);
    }
  }, [updateStats]);
  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity onPress={() => navigation.closeDrawer()}>
        <Image source={Character} style={styles.drawerImage} />
        <Text style={styles.drawerHeader}>Player Stats</Text>
        <Text style={styles.drawerText}>Health: {playerStats.health} / {playerStats.maxHealth}</Text>
        <Text style={styles.drawerText}>Mana: {playerStats.mana} / {playerStats.maxMana}</Text>
        <Text style={styles.drawerText}>Strength: {playerStats.strength}</Text>
        <Text style={styles.drawerText}>Intelligence: {playerStats.intelligence}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={exitGame}>
        <Text style={styles.exitButton}>Exit Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerNavigator = ({ isModalVisible, playerStats, exitGame, updateStats }) => (
  <Modal visible={isModalVisible} transparent={true}>
    <CustomDrawerContent navigation={updateStats} exitGame={exitGame} route={{ params: { playerStats, updateStats } }} />
  </Modal>
);


const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { playerStats: initialPlayerStats, updateStats } = GameScenarios({ playerStats, updateStats });
  const [playerStats, setPlayerStats] = useState(initialPlayerStats);

  // Handle scenario changes and update stats
  const handleScenarioChange = (newStats) => {
    setPlayerStats((prevStats) => ({ ...prevStats, ...newStats }));
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="IntroPage" component={IntroPage} />
          <Stack.Screen name="GameScreen" component={GameScreen}/>
          <Stack.Screen name="VictoryScreen" component={VictoryScreen} />
          <Stack.Screen name="GameOverScreen" component={GameOverScreen} />
          <Stack.Screen name="GoblinScreen" component={GoblinScreen} />
          <Stack.Screen name="MinotaurScreen" component={MinotaurScreen} />
          <Stack.Screen name="DruidScreen" component={DruidScreen} />
          <Stack.Screen name="TreeSpiritScreen" component={TreeSpiritScreen} />
        </Stack.Navigator>

        <TouchableOpacity onPress={toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>

        <CustomDrawerNavigator isModalVisible={isModalVisible} playerStats={playerStats} exitGame={() => setModalVisible(false)} updateStats={handleScenarioChange} />
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  drawerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  drawerHeader: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  exitButton: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default App;
