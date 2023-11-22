import React from 'react';
import './App.css';
import homeImage from './assets/img/logo_text.png';

 // Function to start a new game
 const startNewGame = () => {
    // Reset the current scenario to the first scenario
    setCurrentScenario(gameScenarios()[0]);
  };

  // Function to load a saved game (You can implement this based on your needs)
  const loadSavedGame = () => {
    // Add logic to load a saved game state
    console.log('Loading saved game...');
  };


function App() {
    return(
        <div className="Home">
            <header className="App-header">
                <img src={homeImage} alt="Home" style={{width: "80%", height: "auto"}} />
            </header>
            <div className="Options-home">
                <h1 onPress={startNewGame}>New Game</h1>
                <h1 onPress={loadSavedGame}>Load Game</h1>
            </div>
        </div>
    )
}