import React from 'react';
import './App.css';
import homeImage from './assets/img/logo_text.png';

function App() {
    return(
        <div className="Home">
            <header className="App-header">
                <img src={homeImage} alt="Home" style={{width: "80%", height: "auto"}} />
            </header>
            <div className="Options-home">
                <h1>New Game</h1>
                <h1>Load Game</h1>
            </div>
        </div>
    )
}