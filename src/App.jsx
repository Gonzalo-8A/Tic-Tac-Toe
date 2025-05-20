import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Player from "./Components/Player/Player.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Button from "./Components/Button/Button.jsx";
import Header from "./Components/Header/Header.jsx";
import "./App.css";
import StepContainer from "./Components/StepContainer/StepContainer.jsx";

const steps = ["start", "modeSelection", "playerSetup", "gameBoard"];

function App() {
  const [stepIndex, setStepIndex] = useState(0);

  const gameStep = steps[stepIndex];

  function goToNextStep() {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }

  // eslint-disable-next-line no-unused-vars
  function goToPrevStep() {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  return (
    <>
      <Header />
      <main>
        <AnimatePresence exitBeforeEnter>
          <div id="game-container">
            {gameStep === "start" && (
              <StepContainer key="start">
                <Button
                  id="game-start"
                  className={gameStep === "start" ? "fade-in" : "fade-out"}
                  onClick={goToNextStep}
                >
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}

            {gameStep === "modeSelection" && (
              <StepContainer key="modeSelection">
                <h2 className="modeSelection-title">Elige un modo de juego</h2>
                <div className="buttons-container">
                  <Button
                    id="1-player-game"
                    className={
                      gameStep === "modeSelection" ? "fade-in" : "fade-out"
                    }
                    onClick={goToNextStep}
                  >
                    1 jugador
                  </Button>
                  <Button
                    id="2-players-game"
                    className={
                      gameStep === "modeSelection" ? "fade-in" : "fade-out"
                    }
                    onClick={goToNextStep}
                  >
                    2 jugadores
                  </Button>
                </div>
              </StepContainer>
            )}

            {gameStep === "playerSetup" && (
              <StepContainer key="playerSetup">
                <h2 className="playerSetup-title">Elige un nombre</h2>
                <ol id="playersContainer">
                  <Player name="Player 1" playerSymbol="✖️" />
                  <Player name="Player 2" playerSymbol="⭕" />
                </ol>
                <Button
                  id="game-start-btn"
                  className={
                    gameStep === "playerSetup" ? "fade-in" : "fade-out"
                  }
                  onClick={goToNextStep}
                >
                  Empezar a jugar
                </Button>
              </StepContainer>
            )}
            
            {gameStep === "gameBoard" && (
              <StepContainer key="gameBoard">
                <GameBoard />
              </StepContainer>
            )}
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

// <ol id="playersContainer">
//  <Player name="Player 1" playerSymbol="✖️" />
//  <Player name="Player 2" playerSymbol="⭕" />
// </ol>
// <GameBoard />

export default App;
