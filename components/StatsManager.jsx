/* eslint-disable prettier/prettier */
// StatsManager.js
import React, { useEffect, useState } from 'react';

const StatsManager = () => {
  const initialStats = {
    health: 100,
    mana: 50,
    strength: 5,
    intelligence: 5,
    experience: 0,
    level: 1,
  };

  const [stats, setStats] = useState(initialStats);

  const updateStats = (newStats) => {
    setStats((prevStats) => ({
      ...prevStats,
      ...newStats,
    }));
  };

  useEffect(() => {
    console.log('playerStats', stats);
  }, [stats]);

  return { stats, updateStats };
};

export default StatsManager;
