/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import IntroPage from './screens/IntroPage';
import GameScreen from './screens/GameScreen';
import GoblinScreen from './components/GoblinScreen';
import MinotaurScreen from './components/MinotaurScreen';
import VictoryScreen from './screens/VictoryScreen';
import GameOverScreen from './screens/GameOverScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="IntroPage" component={IntroPage} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="GoblinScreen" component={GoblinScreen} />
        <Stack.Screen name="MinotaurScreen" component={MinotaurScreen} />
        <Stack.Screen name="VictoryScreen" component={VictoryScreen} />
        <Stack.Screen name="GameOverScreen" component={GameOverScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
