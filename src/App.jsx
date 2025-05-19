import "./App.css";
import Player from "./Components/Player/Player.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import { useState } from "react";
import Button from "./Components/Button/Button.jsx";

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
    <main>
      <div id="game-container">
        {gameStep === "start" && (
          <Button
            id="game-start"
            className={gameStep === "start" ? "fade-in" : "fade-out"}
            onClick={goToNextStep}
          >
            Empezar a jugar
          </Button>
        )}

        <div
          className={`game-content ${
            gameStep === "modeSelection" ? "show" : "hidden"
          }`}
        >
          {gameStep === "modeSelection" && (
            <>
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
            </>
          )}
        </div>

        <div
          className={`game-content ${
            gameStep === "playerSetup" ? "show" : "hidden"
          }`}
        >
          {gameStep === "playerSetup" && (
            // <PlayerSetUp />
            <>
              <ol id="playersContainer">
                <Player name="Player 1" playerSymbol="✖️" />
                <Player name="Player 2" playerSymbol="⭕" />
              </ol>
              <button
                className={`game_button ${
                  gameStep === "playerSetup" ? "fade-in" : "fade-out"
                }`}
                onClick={goToNextStep}
              >
                Empezar a jugar
              </button>
            </>
          )}
        </div>

        {gameStep === "gameBoard" && (
          <div
            className={`game-content ${
              gameStep === "gameBoard" ? "show" : "hidden"
            }`}
          >
            <GameBoard />
          </div>
        )}
      </div>
    </main>
  );
}

// <ol id="playersContainer">
//  <Player name="Player 1" playerSymbol="✖️" />
//  <Player name="Player 2" playerSymbol="⭕" />
// </ol>
// <GameBoard />

export default App;
