/* eslint-disable prettier/prettier */
import React from 'react';
import hallwayImage from '../assets/img/hallway.jpeg';
import { Image } from '@rneui/base';
export default function gameScenarios() {
  const scenarios = [{
    id: 1,
    image: Image.resolveAssetSource(hallwayImage).uri,
    question: 'What do you do next?',
    choices: [
      {id: 'A', text: 'Explore the dark cave', nextScenario: 2},
      {id: 'B', text: 'Head towards the village', nextScenario: 3},
      {id: 'C', text: 'Go back to the ship', nextScenario: 4},
      {id: 'D', text: 'Go back to the ship', nextScenario: 5},
    ],
  }, {
    id: 2,
    image: Image.resolveAssetSource(hallwayImage).uri,
    question: 'What do you do next?',
    choices: [
      {id: 'A', text: 'Test', nextScenario: 6},
      {id: 'B', text: 'Test2', nextScenario: 7},
      {id: 'C', text: 'Test3', nextScenario: 8},
      {id: 'D', text: 'Test4', nextScenario: 9},
    ],

    // Add more scenarios as needed
  }];
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
    ],
    // Add more scenarios as needed
  };
} */

