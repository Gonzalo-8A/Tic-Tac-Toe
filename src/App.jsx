import "./App.css";
import Player from "./Components/Player/Player.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import { useState } from "react";

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
      <main>
        <div id="game-container">
          {gameStep === "start" && (
            <button
              id="start_game"
              className={`game_button ${gameStep === "start" ? "fade-in" : "fade-out"}`}
              onClick={goToNextStep}
            >
              Empezar a jugar
            </button>
          )}

          <div
            className={`game-content ${
              gameStep === "modeSelection" ? "show" : "hidden"
            }`}
          >
            {gameStep === "modeSelection" && 
              // <ModeSelection />
              <>
                <h2 className="modeSelection-title">Elige un modo de juego</h2>
                <div className="buttons-container">
                  <button className="game_button">
                    1 jugador
                  </button>
                  <button className="game_button">
                    2 jugadores
                  </button>
                </div>
              </>
            }
          </div>

          <div
            className={`game-content ${
              gameStep === "playerSetup" ? "show" : "hidden"
            }`}
          >
            {gameStep === "playerSetup" && <PlayerSetUp />}
          </div>

          <div
            className={`game-content ${
              gameStep === "gameBoard" ? "show" : "hidden"
            }`}
          >
            {gameStep === "gameBoard" && <GameBoard />}
          </div>
        </div>
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
