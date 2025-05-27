import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Player from './Components/Player/Player.jsx';
import GameBoard from './Components/GameBoard/GameBoard.jsx';
import Button from './Components/Button/Button.jsx';
import Header from './Components/Header/Header.jsx';
import './App.css';
import StepContainer from './Components/StepContainer/StepContainer.jsx';

const steps = [
  'start',
  'modeSelection',
  'difficultySelection',
  'playerSetup',
  'gameBoard',
];

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
  const [difficulty, setDifficulty] = useState('easy');

  const gameStep = steps[stepIndex];

  function goToNextStep(param) {
    setStepIndex((prev) => Math.min(prev + param, steps.length - 1));
  }

  function goToPrevStep() {
    setStepIndex((prev) => Math.max(prev - (isSinglePlayer ? 1 : 2), 0));

    if (gameStep === 'difficultySelection') {
      setPlayersInfo(initialPlayersInfo);
    }
  }

  function goToStart() {
    setStepIndex(0);
    setIsSinglePlayer(false);
    setPlayersInfo(initialPlayersInfo);
    setDifficulty('easy');
  }

  function setGameMode(param) {
    setIsSinglePlayer(param);
    if (param) {
      setPlayersInfo((prev) => ({
        ...prev,
        2: {
          ...prev[2],
          name: 'X-O-Tron',
        },
      }));
    }
  }

  function changeDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  return (
    <>
      <Header goToStart={goToStart} />
      <main>
        <AnimatePresence exitBeforeEnter>
          <div id="game-container" className="game-container">
            {gameStep === 'start' && (
              <StepContainer id="startContainer">
                <Button
                  id="game-start"
                  onClick={() => {
                    goToNextStep(1);
                  }}
                >
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}

            {gameStep === 'modeSelection' && (
              <StepContainer id="modeSelectionContainer">
                <h2 className="modeSelection-title">Elige un modo de juego</h2>
                <div className="buttons-container">
                  <Button
                    id="1-player-game"
                    onClick={() => {
                      setGameMode(true);
                      goToNextStep(1);
                    }}
                  >
                    1 jugador
                  </Button>
                  <Button
                    id="2-players-game"
                    onClick={() => {
                      setGameMode(false);
                      goToNextStep(2);
                    }}
                  >
                    2 jugadores
                  </Button>
                </div>
              </StepContainer>
            )}

            {gameStep === 'difficultySelection' && isSinglePlayer && (
              <StepContainer id="difficultySelectionContainer">
                <h2 className="difficultySelection-title">
                  Elige una dificultad
                </h2>
                <div className="buttons-container">
                  <Button
                    id="easy-mode"
                    onClick={() => {
                      changeDifficulty('easy');
                      goToNextStep(1);
                    }}
                  >
                    Fácil
                  </Button>
                  <Button
                    id="normal-mode"
                    onClick={() => {
                      changeDifficulty('normal');
                      goToNextStep(1);
                    }}
                  >
                    Normal
                  </Button>
                  <Button
                    id="hard-mode"
                    onClick={() => {
                      changeDifficulty('hard');
                      goToNextStep(1);
                    }}
                  >
                    Difícil
                  </Button>
                </div>
              </StepContainer>
            )}

            {gameStep === 'playerSetup' && (
              <StepContainer id="playerSetupContainer">
                <h2 className="playerSetup-title">Elige un nombre</h2>
                <ol id="playersContainer">
                  <Player
                    player={1}
                    playersInfo={playersInfo}
                    setPlayersInfo={setPlayersInfo}
                  />
                  <Player
                    player={2}
                    playersInfo={playersInfo}
                    setPlayersInfo={setPlayersInfo}
                    isSinglePlayer={isSinglePlayer}
                  />
                </ol>
                <Button
                  id="game-start-btn"
                  onClick={() => {
                    goToNextStep(1);
                  }}
                >
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}

            {(gameStep === 'playerSetup' ||
              gameStep === 'difficultySelection') && (
              <Button styles={'back'} onClick={() => {goToPrevStep()}}>
                Atrás
              </Button>
            )}

            {gameStep === 'gameBoard' && (
              <StepContainer id="gameBoardContainer">
                <GameBoard
                  goToStart={goToStart}
                  playersInfo={playersInfo}
                  isSinglePlayer={isSinglePlayer}
                  difficulty={difficulty}
                />
              </StepContainer>
            )}
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
