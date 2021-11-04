/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Some functions may be added here! */}
    const diffOnclick = () => {
      if(showPanel === false){
        setShowPanel(true);
      }else{
        setShowPanel(false);
      }
    }

    const errorControl = () => {
      if(mineNum > (boardSize * boardSize)){
        return(
          <div className='error' style={{visibility: 'visible', color: '#880000'}}>ERROR: Mines number and board size are invalid</div>
        );
      }else{
        return(
          <div className='error' style={{visibility: 'hidden', color: '#880000'}}>ERROR: Mines number and board size are invalid</div>
        );
      }
    }

    const mineNumError = () => {
      if(mineNum > (boardSize * boardSize)){
        return(
          <p className='controlNum' style={{color: '#880000'}}>{mineNum}</p>
        );
      }else{
        return(
          <p className='controlNum' style={{color: '#0f0f4b'}}>{mineNum}</p>
        );
      }
    }

    const boardNumError = () => {
      if(mineNum > (boardSize * boardSize)){
        return(
          <p className='controlNum' style={{color: '#880000'}}>{boardSize}</p>
        );
      }else{
        return(
          <p className='controlNum' style={{color: '#0f0f4b'}}>{boardSize}</p>
        );
      }
    }

    const visibleControlWrapper = () => {
      if(showPanel){
        return(
          <div className='controlWrapper'>
            {errorControl()}
            <div className='controlPanel'>
              <div className='controlCol'>
                <p className='controlTitle'>Mines Number</p>
                <input type='range' step='1' min='1' max='50' defaultValue='10' onChange={mineNumOnChange}/>
                {mineNumError()}
              </div>
              <div className='controlCol'>
                <p className='controlTitle'>Board Size (n×n)</p>
                <input type='range' step='1' min='1' max='20' defaultValue='8' onChange={boardSizeOnChange}/>
                {boardNumError()}
              </div>
            </div>
          </div>
        );
      }else{
        return(
          <></>
        );
      }
    }

    return(
        <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
            {/* -- TODO 1-1 -- */}
            <button className='btn' onClick={startGameOnClick}>Start Game</button>
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            <div className='controlContainer'>
              <button className='btn' onClick={diffOnclick}>Difficulty Adjustment</button>
              {visibleControlWrapper()}
            </div>
        </div>
    );

}
export default HomePage;   