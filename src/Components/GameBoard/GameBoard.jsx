import { useState } from "react";
import PlayersTurn from "../PlayerTurn/PlayersTurn.jsx";
import GameResult from "../GameResult/GameResult.jsx";
import { getWinningLines } from "../../../data.js";
import confetti from "canvas-confetti";
import "./GameBoard.css";
  
const winningLines = getWinningLines(Array(9).fill(null));

export default function GameBoard({ goToStart, playersInfo }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  function checkWinner(index, newBoard) {
    const possibleWinningLines = winningLines.filter((line) =>
      line.includes(index)
    );
    for (const line of possibleWinningLines) {
      const [a, b, c] = line;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        confetti()
        setWinner(newBoard[a]);
        return newBoard[a];
      }
    }

    if(!newBoard.includes(null)){
      setWinner(false)
      return false
    }

    return null;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(1);
    setWinner(null);
  }

  function handleBoardChange(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = playersInfo[turn].symbol;
    setBoard(newBoard);

    checkWinner(index, newBoard);

    const newTurn = turn === 1 ? 2 : 1;
    setTurn(newTurn);
  }

  return (
    <>
      <PlayersTurn winner={winner} turn={turn} playersInfo={playersInfo}/>
      <section
        id="game-board"
        className={`game-board ${winner !== null ? "blur" : ""}`}
      >
        {board.map((cell, index) => (
          <div
            className={`game_cell ${cell ? "filled" : ""} ${
              winner ? "no-hover" : ""
            }`}
            onClick={() => handleBoardChange(index)}
            key={`cell ${index}`}
          >
            <span className="cell_content">{cell}</span>
          </div>
        ))}
      </section>
      {winner !== null && <GameResult turn={turn} winner={winner} playersInfo={playersInfo} goToStart={goToStart} resetGame={resetGame} />}
    </>
  );
}
