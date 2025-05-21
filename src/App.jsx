import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Player from './Components/Player/Player.jsx';
import GameBoard from './Components/GameBoard/GameBoard.jsx';
import Button from './Components/Button/Button.jsx';
import Header from './Components/Header/Header.jsx';
import './App.css';
import StepContainer from './Components/StepContainer/StepContainer.jsx';

const steps = ['start', 'modeSelection', 'playerSetup', 'gameBoard'];

function App() {
  const initialPlayersInfo = {
    1: {
      name: 'Jugador 1',
      symbol: '✖️',
    },
    2: {
      name: 'Jugador 2',
      symbol: '⭕',
    },
  };

  const [stepIndex, setStepIndex] = useState(0);
  const [playersInfo, setPlayersInfo] = useState(initialPlayersInfo);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);

  const gameStep = steps[stepIndex];

  function goToNextStep() {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }

  function goToPrevStep() {
    setStepIndex((prev) => Math.max(prev - 1, 0));
    setIsSinglePlayer(false);
    setPlayersInfo(initialPlayersInfo)
  }

  function goToStart() {
    setStepIndex(0);
    setIsSinglePlayer(false);
    setPlayersInfo(initialPlayersInfo)
  }

  function setGameMode() {
    setIsSinglePlayer(true);
    setPlayersInfo((prev) => ({
      ...prev,
      2: {
        ...prev[2],
        name: 'X-O-Tron',
      },
    }));
  }

  return (
    <>
      <Header goToStart={goToStart} />
      <main>
        <AnimatePresence exitBeforeEnter>
          <div id="game-container" className="game-container">
            {gameStep === 'start' && (
              <StepContainer id="startContainer">
                <Button id="game-start" onClick={goToNextStep}>
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}

            {gameStep === 'modeSelection' && (
              <StepContainer id="modeSelectionContainer">
                <h2 className="modeSelection-title">Elige un modo de juego</h2>
                <div className="buttons-container">
                  <Button id="1-player-game" onClick={goToNextStep} setGameMode={setGameMode}>
                    1 jugador
                  </Button>
                  <Button id="2-players-game" onClick={goToNextStep}>
                    2 jugadores
                  </Button>
                </div>
              </StepContainer>
            )}

            {gameStep === 'playerSetup' && (
              <StepContainer id="playerSetupContainer">
                <h2 className="playerSetup-title">Elige un nombre</h2>
                <ol id="playersContainer">
                  <Player player={1} playersInfo={playersInfo} setPlayersInfo={setPlayersInfo} />
                  <Player
                    player={2}
                    playersInfo={playersInfo}
                    setPlayersInfo={setPlayersInfo}
                    isSinglePlayer={isSinglePlayer}
                  />
                </ol>
                <Button id="game-start-btn" onClick={goToNextStep}>
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}

            {gameStep === 'gameBoard' && (
              <StepContainer id="gameBoardContainer">
                <GameBoard
                  goToStart={goToStart}
                  playersInfo={playersInfo}
                  isSinglePlayer={isSinglePlayer}
                />
              </StepContainer>
            )}
            {gameStep === 'playerSetup' && (
              <Button styles={'back'} onClick={goToPrevStep}>
                Atrás
              </Button>
            )}
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
