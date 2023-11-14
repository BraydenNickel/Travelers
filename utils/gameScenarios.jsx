/* eslint-disable prettier/prettier */
import hallwayImage from '../img/hallway.jpeg';
export default function gameScenarios() {
  return {
    id: 1,
    image: require('../img/hallway.jpeg'),
    question: 'What do you do next?',
    choices: [
      {id: 'A', text: 'Explore the dark cave'},
      {id: 'B', text: 'Head towards the village'},
      // Add more choices as needed
    ],
    // Add more scenarios as needed
  };
}
