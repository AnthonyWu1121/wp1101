import {Fragment, useState} from 'react'
import './App.css';

import {guess, startGame, restart} from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const startMenu = 
    <div>
      <button onClick={async () => {await startGame()}}>
        start game
      </button>
    </div>

  const gameMode =
    <>
      <p>Guess a nnumber between 1 to 100</p>
      <input onChange={e => setNumber(e.target.value)}></input>
      <button /*onClick={handleGuess}*/ disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
  
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick>restart</button>
    </>
  )

  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  // const handleGuess = async () => {
  //   const response = await processGuessByBackend(number);

  //   if (response === 'Equal') {
  //     setHasWon(true);
  //   }else{
  //     setStatus(response);
  //     setNumber('');
  //   }
  // }

  // const processGuessByBackend = () => {

  // }

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
