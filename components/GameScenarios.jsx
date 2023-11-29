/* eslint-disable prettier/prettier */
<<<<<<< Updated upstream
//import hallwayImage from '../assets/img/hallway.jpeg';
export default function gameScenarios() {
  return {
    id: 1,
    image: require('../assets/img/hallway.jpeg'),
    question: 'What do you do next?',
    choices: [
      {id: 'A', text: 'Explore the dark cave'},
      {id: 'B', text: 'Head towards the village'},
      // Add more choices as needed
=======
import React from 'react';
import hallwayImage from '../assets/img/hallway.jpeg';
import goblinImage from '../assets/img/enemy_encounter.jpeg';
import forestImage from '../assets/img/forest.jpeg';
import bullImage from '../assets/img/boss_encounter.jpeg';
import { Image } from '@rneui/base';

export default function gameScenarios() {
  const getRandomInt = ( min, max ) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateEncounter = ( chance ) => {
    return getRandomInt(1, 100) <= chance;
  };

  const generateEncounterBoss = () => {
    return getRandomInt(1, 100) <= 10;
  };

  const generateEncounterTreasure = () => {
    return getRandomInt(1, 100) <= 5;
  }

  const scenarios = [{
    id: 'EncounterGoblin', // goblin fight
    image: Image.resolveAssetSource(goblinImage).uri,
    question: 'As you walk along, you notice that you start seeing a lot of broken objects. You suddenly hear maniacal laughter approach you. Out of the dim hallway, a goblin appears.',
    choices: [
      {id: 'A', text: 'Attack', nextScenario: 'CombatGoblin'},
      {id: 'B', text: 'Run', nextScenario: 1},
      {id: 'C', text: 'Test3', nextScenario: 8},
      {id: 'D', text: 'Turn Back', nextScenario: 'MainHallway'},
    ],
  }, {
    id: 'BeginGame', //First Scene
    image: Image.resolveAssetSource(forestImage).uri,
    question: 'You are a lone traveler. Upon hearing tales about a dungeon hidden deep in a forest, you decide to head out and look at it yourself. With nothing more than your trusty sword and and your courage with you, you set out and prepare to enter the dungeon.',
    choices: [
      {id: 'A', text: 'Enter the dungeon', nextScenario: 'MainHallway'},
    ],
  }, {
  id: 'MainHallway', 
  image: Image.resolveAssetSource(hallwayImage).uri,
  question: 'You find yourself in a well lit hallway with many branching paths. Looks like you have to pick a path to start exploring the dungeon.' ,
  choices: [
    {id: 'A', text: 'Go deeper', nextScenario: generateEncounter(30) ? 'EncounterGoblin' : generateEncounter(99) ? 'BossEncounter' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway'},
    {id: 'B', text: 'Go left', nextScenario: generateEncounter(30) ? 'EncounterGoblin' : generateEncounter(99) ? 'BossEncounter' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway'},
    {id: 'C', text: 'Go right', nextScenario: generateEncounter(30) ? 'EncounterGoblin' : generateEncounter(99) ? 'BossEncounter' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway'},
  ],

  // Add more scenarios as needed
}, {
  id: 'TreasureRoom', //Stat Increase
  image: Image.resolveAssetSource(forestImage).uri,
  question: 'You enter a room full of treasure. You only have enough to grab one.',
  choices: [
    {id: 'A', text: 'Enter the dungeon', nextScenario: 'MainHallway'},
  ],
}, {
  id: 'BossEncounter', //First Scene
  image: Image.resolveAssetSource(bullImage).uri,
  question: 'You enter a well lit hallway. You feel a heavy pressure in the air. A loud roar suddenly assaults your hearing. A Minotaur appears and blocks your path.',
  choices: [
    {id: 'A', text: 'Attack', nextScenario: 'CombatGoblin'},
    {id: 'B', text: 'Run', nextScenario: 1},
    {id: 'C', text: 'Test3', nextScenario: 8},
    {id: 'D', text: 'Turn Back', nextScenario: 1},
  ],
},

];
  return scenarios;
  }
 /* return {
    id: 1,
    image: Image.resolveAssetSource(hallwayImage).uri,
    question: 'What do you do next?',
    choices: [
      {id: 'A', text: 'Explore the dark cave', nextScenario: 2},
      {id: 'B', text: 'Head towards the village', nextScenario: 3},
      {id: 'C', text: 'Go back to the ship', nextScenario: 4},
      {id: 'D', text: 'Go back to the ship', nextScenario: 5},
>>>>>>> Stashed changes
    ],
    // Add more scenarios as needed
  };
}
