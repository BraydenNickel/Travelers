/* eslint-disable prettier/prettier */
import React from 'react';
import { useCallback, useState } from 'react';
import hallwayImage from '../assets/img/hallway.jpeg';
import goblinImage from '../assets/img/enemy_encounter.jpeg';
import forestImage from '../assets/img/forest.jpeg';
import bullImage from '../assets/img/boss_encounter.jpeg';
import trinketRoom from '../assets/img/trinket-room.jpeg';
import { Image } from '@rneui/base';


export default function GameScenarios() {

  const [playerStats, setPlayerStats] = useState({
    health: 100,
    mana: 50,
    strength: 5,
    intelligence: 5,
    experience: 0,
    level: 1,
  });

  const updateStats = useCallback((action) => {
    setPlayerStats((prevStats) => {
      const updatedStats = {
        ...prevStats,
        ...action,
      };

      console.log('Updated Stats:', updatedStats);

      return updatedStats;
    });
  }, []);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateEncounter = (chance) => {
    return getRandomInt(1, 100) <= chance;
  };

  const scenarios = [
    {
      id: 'EncounterGoblin',
      image: Image.resolveAssetSource(goblinImage).uri,
      question: 'As you walk along, you notice that you start seeing a lot of broken objects. You suddenly hear maniacal laughter approach you. Out of the dim hallway, a goblin appears.',
      choices: [
        { id: 'A', text: 'Attack', nextScenario: 'CombatGoblin' },
        { id: 'B', text: 'Run', nextScenario: 1 },
        { id: 'C', text: 'Test3', nextScenario: 8 },
        { id: 'D', text: 'Turn Back', nextScenario: 'MainHallway' },
      ],
    }, {
      id: 'GameStart',
      image: Image.resolveAssetSource(forestImage).uri,
      question: 'You are a lone traveler. Upon hearing tales about a dungeon hidden deep in a forest, you decide to head out and look at it yourself. With nothing more than your trusty sword and and your courage with you, you set out and prepare to enter the dungeon.',
      choices: [
        { id: 'A', text: 'Enter the dungeon', nextScenario: 'MainHallwayStart' },
      ],
    }, {
      id: 'MainHallwayStart',
      image: Image.resolveAssetSource(hallwayImage).uri,
      question: 'You find yourself in a well lit hallway with many branching paths. Looks like you have to pick a path to start exploring the dungeon.',
      choices: [
        { id: 'A', text: 'Go deeper', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(10) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'B', text: 'Go left', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(10) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'C', text: 'Go right', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(99) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
      ],
      // Add more scenarios as needed
    }, {
      id: 'MainHallway',
      image: Image.resolveAssetSource(hallwayImage).uri,
      question: 'You go further inside the dungeon. You are alone with your thoughts. The path keeps going further.',
      choices: [
        { id: 'A', text: 'Go deeper', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(99) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'B', text: 'Go left', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(99) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'C', text: 'Go right', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(99) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
      ],
      // Add more scenarios as needed
    }, {
      id: 'TreasureRoom',
      image: Image.resolveAssetSource(forestImage).uri,
      question: 'After who knows how long, you finally reach the fabled treasure room. You enter and feel a burst of happiness. You finally reached the end of your journey.',
      choices: [
        { id: 'A', text: 'Continue', nextScenario: 'YouWin' },
      ],
    }, {
      id: 'BossEncounter',
      image: Image.resolveAssetSource(bullImage).uri,
      question: 'You enter a well lit hallway. You feel a heavy pressure in the air. A loud roar suddenly assaults your hearing. A Minotaur appears and blocks your path.',
      choices: [
        { id: 'A', text: 'Attack', nextScenario: 'CombatGoblin' },
        { id: 'B', text: 'Run', nextScenario: 1 },
        { id: 'C', text: 'Test3', nextScenario: 8 },
        { id: 'D', text: 'Turn Back', nextScenario: 1 },
      ],
    }, {
      id: 'TrinketRoom',
      image: Image.resolveAssetSource(trinketRoom).uri,
      question: 'You enter a room full of trinkets. You feel yourself grow stronger whenever you approach one of them. You can only carry one out with you.',
      choices: [
        { id: 'A', text: 'HP Ring', action: () => updateStats({ health: playerStats.health + 5}), nextScenario: 'MainHallway' },
        { id: 'B', text: 'Mana Necklace', action: () => updateStats({ mana: playerStats.mana + 5}), nextScenario: 'MainHallway' },
        { id: 'C', text: 'Crown of Intelligence', action: () => updateStats({ intelligence: playerStats.intelligence + 5 }), nextScenario: 'MainHallway' },
        { id: 'D', text: 'Armband of Strength', action: () => updateStats({ strength: playerStats.strength + 5}), nextScenario: 'MainHallway' },
      ],
    },
  ];
  return { scenarios, updateStats, playerStats };
}
