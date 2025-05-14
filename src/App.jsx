import "./App.css";
import Player from "./Components/Player.jsx";

function App() {
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer">
            <Player name="Gonzalo" playerSymbol="✖️" />
            <Player name="Anaís" playerSymbol="⭕" />
          </ol>
        </div>
      </main>
    </>
  );
}

export default App;
