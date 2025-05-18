import "./App.css";
import Player from "./Components/Player/Player.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";

function App() {
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer">
            <Player key={"player1"} name="Player 1" playerSymbol="✖️" />
            <Player key={"player2"} name="Player 2" playerSymbol="⭕" />
          </ol>
        <GameBoard />
        </div>
      </main>
    </>
  );
}

export default App;
