/* eslint-disable prettier/prettier */
// PlayerStatsContext.js
import React, {createContext, useContext, useState} from 'react';

const PlayerStatsContext = createContext();

const PlayerStatsProvider = ({children}) => {
  const [initialState, setInitalState] = useState({
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    strength: 10,
    intelligence: 5,
  });

  return (
    <PlayerStatsContext.Provider value={initialState}>
      {children}
    </PlayerStatsContext.Provider>
  );
};

const usePlayerStats = () => {
  const context = useContext(PlayerStatsContext);
  if (!context) {
    throw new Error('usePlayerStats must be used within a PlayerStatsProvider');
  }
  return context;
};

export {PlayerStatsProvider, usePlayerStats};
