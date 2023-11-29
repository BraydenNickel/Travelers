/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';
const PlayerStats = ({ updateStats, stats }) => {
  // State to manage progress bar
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(0);

  useEffect(() => {
    // Check if stats is defined before accessing its properties
    if (stats) {
      setExperienceToNextLevel((stats.experience / (stats.level * 100)) * 100);
    }
  }, [stats]);
  return (
    <View>
      {/* Additional checks for stats object */}
      {stats && typeof stats === 'object' ? (
        <>
          <Text>Health: {stats.health}</Text>
          <Text>Mana: {stats.mana}</Text>
          <Text>Strength: {stats.strength}</Text>
          <Text>Intelligence: {stats.intelligence}</Text>
          <Text>Level: {stats.level}</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={experienceToNextLevel / 100}
          />
          <Text>Experience: {stats.experience}</Text>
        </>
      ) : (
        <Text>Stats are undefined or not an object</Text>
      )}
    </View>
  );
};
/*
PlayerStats.defaultProps = {
    playerStats: {
      health: 100,
      mana: 50,
      strength: 5,
      intelligence: 5,
      experience: 0,
      level: 1,
    },
  };
*/
export default PlayerStats;
