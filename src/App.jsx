import { AnimatePresence } from 'framer-motion';

import { useGameLogic } from './hooks/useGameLogic.js';
import Player from './Components/Player/Player.jsx';
import GameBoard from './Components/GameBoard/GameBoard.jsx';
import Button from './Components/Button/Button.jsx';
import Header from './Components/Header/Header.jsx';
import GameCount from './Components/GameCount/Gamecount.jsx';
import StepContainer from './Components/StepContainer/StepContainer.jsx';
import './App.css';

function App() {
  //Bring all the props from useGameLogic
  const gameLogic = useGameLogic();
  const {
    gameStep,
    goToNextStep,
    goToPrevStep,
    goToStart,
    setGameMode,
    changeDifficulty,
    playersInfo,
    setPlayersInfo,
    isSinglePlayer,
    difficulty,
    winner,
  } = gameLogic;

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
              <Button
                styles={'back'}
                onClick={() => {
                  goToPrevStep();
                }}
              >
                Atrás
              </Button>
            )}

            {gameStep === 'gameBoard' && (
              <StepContainer id="gameBoardContainer">
                <GameBoard
                  game={gameLogic}
                />
              </StepContainer>
            )}
          </div>
        </AnimatePresence>
        <AnimatePresence>
          {gameStep === 'gameBoard' && (
            <StepContainer id="gameCountContainer">
              <GameCount
                playersInfo={playersInfo}
                winner={winner}
                difficulty={difficulty}
              />
            </StepContainer>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
