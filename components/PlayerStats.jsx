/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';
const PlayerStats = ({ playerStats }) => {
    const {
      health = 100,
      mana = 50,
      strength = 5,
      intelligence = 5,
      experience = 0,
      level = 1,
    } = playerStats || {};

  // State to manage player stats
  // eslint-disable-next-line no-unused-vars
  const [stats, setStats] = useState(playerStats);

  // State to manage progress bar
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(0);

  useEffect(() => {
    // Calculate experience to next level whenever experience or level changes
    const nextLevelExperience = stats.level * 100;
    const currentExperience = stats.experience;
    const progress = (currentExperience / nextLevelExperience) * 100;
    setExperienceToNextLevel(progress);
  }, [stats.experience, stats.level]);

  return (
        <View>
            <Text>Health: {health}</Text>
            <Text>Mana: {mana}</Text>
            <Text>Strength: {strength}</Text>
            <Text>Intelligence: {intelligence}</Text>
            <Text>Level: {level}</Text>
            <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={experienceToNextLevel / 100}
            />
            <Text>Experience: {experience}</Text>
        </View>
    );
};

export default PlayerStats;
