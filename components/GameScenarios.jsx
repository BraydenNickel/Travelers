/* eslint-disable prettier/prettier */
import { useCallback, useState } from 'react';
import hallwayImage from '../assets/img/hallway.jpeg';
import goblinImage from '../assets/img/enemy_encounter.jpeg';
import forestImage from '../assets/img/forest.jpeg';
import bullImage from '../assets/img/boss_encounter.jpeg';
import trinketRoom from '../assets/img/trinket-room.jpeg';
import Campsite from '../assets/img/campsite.jpeg';
import TreasureRoom from '../assets/img/treasure_room.jpeg';
import MagicBook from '../assets/img/MagicalBook.jpeg';
import TreePath from '../assets/img/TreePath.jpeg';
import MagicalForestRest from '../assets/img/MagicalForestRest.jpeg';
import ChestForest from '../assets/img/ChestForest.jpeg';
import DruidForest from '../assets/img/DruidForest.jpeg';
import FairyPortal from '../assets/img/FairyPortal.jpeg';
import ForestAnimals from '../assets/img/ForestAnimals.jpeg';
import ForestDeath from '../assets/img/ForestDeath.jpeg';
import TreeSpiritForest from '../assets/img/TreeSpiritForest.jpeg';
import { Image } from '@rneui/base';

export default function GameScenarios( { } ) {

  const [playerStats, setPlayerStats] = useState({
    maxHealth: 100,
    health: 100,
    maxMana: 50,
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

  const calculateNextScenario = () => {
    const scenarioProbabilities = [
      { scenario: 'ChestForest', chance: 28 },
      { scenario: 'FairyPortal', chance: 1 },
      { scenario: 'ForestAnimals', chance: 28 },
      { scenario: 'DruidForest', chance: 22 },
      { scenario: 'TreeSpiritForest', chance: 10 },
      { scenario: 'TreeSpiritForestAngered', chance: 4 },
      { scenario: 'ForestDeath', chance: 7 },
    ];
    const totalChances = scenarioProbabilities.reduce((sum, { chance }) => sum + chance, 0);
    const randomNumber = getRandomInt(1, totalChances);
    let cumulativeProbability = 0;
    for (const { scenario, chance } of scenarioProbabilities) {
      cumulativeProbability += chance;
      if (randomNumber <= cumulativeProbability) {
        return scenario;
      }
    }
  };

  const scenarios = [
    {
      id: 'EncounterGoblin',
      image: Image.resolveAssetSource(goblinImage).uri,
      question: 'As you walk along, you notice that you start seeing a lot of broken objects. You suddenly hear maniacal laughter approach you. Out of the dim hallway, a goblin appears.',
      choices: [
        { id: 'A', text: 'Attack', nextScenario: 'CombatGoblin' },
        { id: 'B', text: 'Run', nextScenario: 'MainHallwayStart' },
      ],
    }, {
      id: 'GameStart',
      image: Image.resolveAssetSource(MagicBook).uri,
      question: 'You are a lone traveler. While exploring an ancient library, you stumble upon a dusty, forgotten book hidden amongst the shelves. Intrigued, you open the cover and find yourself face-to-face with a shimmering portal. The moment you step through, you are transported to a unknown realm.',
      choices: [
        { id: 'A', text: 'Continue', nextScenario: generateEncounter(51) ? 'MainHallwayStart' : 'MagicalForest' },
      ],
    }, {
      id: 'MainHallwayStart',
      image: Image.resolveAssetSource(hallwayImage).uri,
      question: 'You find yourself in a well lit hallway with many branching paths. Looks like you have to pick a path to start exploring the dungeon.',
      choices: [
        { id: 'A', text: 'Go deeper', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(10) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'B', text: 'Go left', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(10) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'C', text: 'Go right', nextScenario: generateEncounter(40) ? 'EncounterGoblin' : generateEncounter(15) ? 'BossEncounter' : generateEncounter(99) ? 'TrinketRoom' : generateEncounter(5) ? 'TreasureRoom' : 'MainHallway' },
        { id: 'D', text: 'Set up Camp', nextScenario: 'Campsite'},
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
        { id: 'D', text: 'Set up Camp', nextScenario: 'Campsite'},
      ],
      // Add more scenarios as needed
    }, {
      id: 'TreasureRoom',
      image: Image.resolveAssetSource(TreasureRoom).uri,
      question: 'After who knows how long, you finally reach the fabled treasure room. You enter and feel a burst of happiness. You finally reached the end of your journey.',
      choices: [
        { id: 'A', text: 'Continue', nextScenario: 'YouWin' },
      ],
    }, {
      id: 'BossEncounter',
      image: Image.resolveAssetSource(bullImage).uri,
      question: 'You enter a well lit hallway. You feel a heavy pressure in the air. A loud roar suddenly assaults your hearing. A Minotaur appears and blocks your path.',
      choices: [
        { id: 'A', text: 'Attack', nextScenario: 'CombatMinotaur' },
        { id: 'B', text: 'Run',  nextScenario: 'MainHallwayStart' },
      ],
    }, {
      id: 'TrinketRoom',
      image: Image.resolveAssetSource(trinketRoom).uri,
      question: 'You enter a room full of trinkets. You feel yourself grow stronger whenever you approach one of them. You can only carry one out with you.',
      choices: [
        { id: 'A', text: 'HP Ring (+10 HP)', action: () => updateStats({ health: playerStats.health + 10, maxHealth: playerStats.maxHealth + 5}), nextScenario: 'MainHallway' },
        { id: 'B', text: 'Mana Necklace (+10 Mana)', action: () => updateStats({ mana: playerStats.mana + 10,  maxMana: playerStats.maxMana + 5}), nextScenario: 'MainHallway' },
        { id: 'C', text: 'Crown of Intelligence (+5 INT)', action: () => updateStats({ intelligence: playerStats.intelligence + 5 }), nextScenario: 'MainHallway' },
        { id: 'D', text: 'Armband of Strength (+5 STR)', action: () => updateStats({ strength: playerStats.strength + 5}), nextScenario: 'MainHallway' },
      ],
    },
    {
      id: 'VictoryGoblin',
      image: Image.resolveAssetSource(forestImage).uri,
      question: 'You have defeated the Goblin! What do you do now?',
      choices: [
        { id: 'A', text: 'Continue', nextScenario: 'MainHallway' },
        { id: 'B', text: 'Run', nextScenario: 1 },
        { id: 'C', text: 'Test3', nextScenario: 8 },
        { id: 'D', text: 'Turn Back', nextScenario: 1 },
      ],
    },
    {
      id: 'VictoryMinotaur',
      image: Image.resolveAssetSource(forestImage).uri,
      question: 'You have defeated the Minotaur! What do you do now?',
      choices: [
        { id: 'A', text: 'Continue', nextScenario: 'MainHallway' },
        { id: 'B', text: 'Run', nextScenario: 1 },
        { id: 'C', text: 'Test3', nextScenario: 8 },
        { id: 'D', text: 'Turn Back', nextScenario: 1 },
      ],
    },
    {
      id: 'Campsite',
      image: Image.resolveAssetSource(Campsite).uri,
      question: 'You decide to set up camp in one of the abandoned rooms. You start a fire and sit near it.',
      choices: [
        {id: 'A', text: 'Restore Health and Mana', action: () => updateStats({ health: playerStats.maxHealth , mana: playerStats.maxMana}), nextScenario: 'CampsiteHealed'},
        {id: 'B', text: 'Return to Dungeon', nextScenario: 'MainHallwayStart'},
      ],
    },
    {
      id: 'CampsiteHealed',
      image: Image.resolveAssetSource(Campsite).uri,
      question: 'You take a quick nap and feel refreshed. Your health and mana have been restored.',
      choices: [
        {id: 'A', text: 'Return to Dungeon', nextScenario: 'MainHallwayStart'},
      ],
    },
    /*
    Magical Forest
    */
   {
    id: 'MagicalForest',
    image: Image.resolveAssetSource(forestImage).uri,
    question: 'You enter a forest. You feel a magical presence in the air.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'TreePath' },
    ],
   },
   {
    id: 'TreePath',
    image: Image.resolveAssetSource(TreePath).uri,
    question: 'You see a path that never ends. Do you continue forward or take an unknown path?',
    choices: [
      { id: 'A', text: 'Stay on the path', nextScenario: calculateNextScenario() },
      { id: 'B', text: 'Go left', nextScenario: calculateNextScenario() },
      { id: 'C', text: 'Go right', nextScenario: calculateNextScenario() },
      { id: 'D', text: 'Set up camp', nextScenario: 'MagicalForestRest' },
    ],
   },
   {
    id: 'MagicalForestRest',
    image: Image.resolveAssetSource(MagicalForestRest).uri,
    question: 'You stumble upon a campsite. You decide to rest for a bit.',
    choices: [
      { id: 'A', text: 'Restore Health and Mana', action: () => updateStats({ health: playerStats.maxHealth , mana: playerStats.maxMana}), nextScenario: 'MagicalForestRestHealed'},
      { id: 'B', text: 'Save Game'},
      { id: 'C', text: 'Return to Forest', nextScenario: 'TreePath'},
    ],
   },
   {
    id: 'ChestForest',
    image: Image.resolveAssetSource(ChestForest).uri,
    question: 'You see a chest in the distance. You decide to open it.',
    choices: [
      { id: 'A', text: 'HP Ring (+10 HP)', action: () => updateStats({ health: playerStats.health + 10, maxHealth: playerStats.maxHealth + 5}), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(7) ? 'ForestDeath' : 'TreePath' },
      { id: 'B', text: 'Mana Necklace (+10 Mana)', action: () => updateStats({ mana: playerStats.mana + 10,  maxMana: playerStats.maxMana + 5}), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(7) ? 'ForestDeath' : 'TreePath' },
      { id: 'C', text: 'Crown of Intelligence (+5 INT)', action: () => updateStats({ intelligence: playerStats.intelligence + 5 }), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(7) ? 'ForestDeath' : 'TreePath' },
      { id: 'D', text: 'Armband of Strength (+5 STR)', action: () => updateStats({ strength: playerStats.strength + 5}), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(7) ? 'ForestDeath' : 'TreePath' },
    ],
   },
   {
    id: 'FairyPortal',
    image: Image.resolveAssetSource(FairyPortal).uri,
    question: 'You found the a magical Fairy that offers to transport to you to safety. Do you accept?',
    choices: [
      { id: 'A', text: 'Accept the offer', nextScenario: 'YouWin' },
      { id: 'B', text: 'Continue exploring', nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath'},
    ],
   },
   {
    id: 'ForestAnimals',
    image: Image.resolveAssetSource(ForestAnimals).uri,
    question: 'You see a group of animals. What will you do next?',
    choices: [
      { id: 'A', text: 'Hunt', action: () => updateStats({ health: playerStats.health + 10, strength: playerStats.strength + 5 }), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(2) ? 'TreeSpiritForestAngered' : generateEncounter(15) ? 'ForestDeathAnimals' : 'TreePath' },
      { id: 'B', text: 'Pet the animals', action: () => updateStats({ intelligence: playerStats.intelligence + 10 }), nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(5) ? 'ForestDeathAnimals' : 'TreePath' },
      { id: 'C', text: 'Ignore the animals, continue past them', nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
      { id: 'D', text: 'Turn around', nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForest',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You see a druid. Unsure if he is friendly or not. What will you do next?',
    choices: [
      { id: 'A', text: 'Attack', nextScenario: 'CombatDruid' },
      { id: 'B', text: 'Talk', nextScenario: generateEncounter(19) ? 'DruidForestTalkHealth' : generateEncounter(19) ? 'DruidForestTalkMana' : generateEncounter(19) ? 'DruidForestTalkIntelligence' : generateEncounter(19) ? 'DruidForestTalkManaIncrease' : generateEncounter(10) ? 'DruidForestTalkFailed' : generateEncounter(10) ? 'DruidForestTalkAngered' : generateEncounter(4) ? 'DruidForestTalkDeath' : 'TreePath' },
      { id: 'C', text: 'Ignore the druid, continue past him', nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : generateEncounter(5) ? 'ForestDruidDeath' : 'TreePath' },
      { id: 'D', text: 'Turn around', nextScenario: generateEncounter(25) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForestTalkHealth',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You talk to the druid. He offers to heal you.',
    choices: [
      { id: 'A', text: 'Accept the offer (Heal 20HP)', action: () => updateStats({ health: playerStats.health + 20 }), nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath'},
      { id: 'B', text: 'Decline the offer', nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForestTalkMana',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You talk to the druid. He offers to restore your mana.',
    choices: [
      { id: 'A', text: 'Accept the offer (Mana restored to full)', action: () => updateStats({ mana: playerStats.maxMana }), nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
      { id: 'B', text: 'Decline the offer', nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath'},
    ],
   },
   {
    id: 'DruidForestTalkIntelligence',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You talk to the druid. He offers to teach you magic and increase your intelligence.',
    choices: [
      { id: 'A', text: 'Accept the offer (+20 INT)', action: () => updateStats({ intelligence: playerStats.intelligence + 20 }), nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
      { id: 'B', text: 'Decline the offer', nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForestTalkManaIncrease',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You talk to the druid. He offers to teach you how to use magic more efficiently, increase your mana.',
    choices: [
      { id: 'A', text: 'Accept the offer (+20 Mana)', action: () => updateStats({ maxMana: playerStats.maxMana + 20 }), nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
      { id: 'B', text: 'Decline the offer', nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(10) ? 'ForestAnimals' : generateEncounter(10) ? 'TreeSpiritForest' : generateEncounter(3) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForestTalkFailed',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You talk to the druid. He offers to teach you magic and increase your intelligence. You fail to learn anything.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: generateEncounter(35) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(7) ? 'TreeSpiritForest' : generateEncounter(2) ? 'TreeSpiritForestAngered' : 'TreePath' },
    ],
   },
   {
    id: 'DruidForestTalkAngered',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You approached the Druid to talk and you angered him and he attacks you.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'CombatDruid' },
    ],
   },
   {
    id: 'DruidForestTalkDeath',
    image: Image.resolveAssetSource(DruidForest).uri,
    question: 'You approached the Druid to talk and you angered and he casted a spell sucking away your life force, You died.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'ForestDeathDruid' },
    ],
   },
   {
    id: 'ForestDeathDruid',
    image: Image.resolveAssetSource(ForestDeath).uri,
    question: 'You were killed by the Druid.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'GameOver' },
    ],
   },
   {
    id: 'ForestDeath',
    image: Image.resolveAssetSource(ForestDeath).uri,
    question: 'You got lost in the forest and you died.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'GameOver' },
    ],
   },
   {
    id: 'ForestDeathAnimals',
    image: Image.resolveAssetSource(ForestDeath).uri,
    question: 'You got attacked by the animals and you died.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'GameOver' },
    ],
   },
   {
    id: 'TreeSpiritForest',
    image: Image.resolveAssetSource(TreeSpiritForest).uri,
    question: 'You see a tree spirit. What will you do next?',
    choices: [
      { id: 'A', text: 'Attack', nextScenario: 'CombatTreeSpirit' },
      { id: 'C', text: 'Ignore the tree spirit, continue past him', nextScenario: generateEncounter(30) ? 'TreePath' : generateEncounter(15) ? 'ChestForest' : generateEncounter(5) ? 'FairyPortal' : generateEncounter(15) ? 'ForestAnimals' : generateEncounter(15) ? 'DruidForest' : generateEncounter(10) ? 'TreeSpiritForestAngered' : 'TreePath' },
      { id: 'D', text: 'Turn around', nextScenario: 'MagicalForestRest' },
    ],
   },
   {
    id: 'TreeSpiritForestAngered',
    image: Image.resolveAssetSource(TreeSpiritForest).uri,
    question: 'You approached the tree spirit and you angered him and he attacks you.',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'CombatTreeSpirit' },
    ],
   },
   {
    id: 'VictoryTreeSpirit',
    image: Image.resolveAssetSource(forestImage).uri,
    question: 'You have defeated the Tree Spirit! What do you do now?',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'TreePath' },
    ],
   },
   {
    id: 'VictoryDruid',
    image: Image.resolveAssetSource(forestImage).uri,
    question: 'You have defeated the Druid! What do you do now?',
    choices: [
      { id: 'A', text: 'Continue', nextScenario: 'TreePath' },
    ],
   },
  ];
  return { scenarios, updateStats, playerStats };
}
