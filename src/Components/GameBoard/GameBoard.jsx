import { useState } from "react";
import PlayersTurn from "../PlayerTurn/PlayersTurn.jsx";
import { getWinningLines } from "../../../data.js";
import "./GameBoard.css";

const TURNS = {
  x: "✖️",
  o: "⭕",
};
const winningLines = getWinningLines(Array(9).fill(null));

export default function GameBoard() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  function checkWinner(index, currentBoard) {
    const possibleWinningLines = winningLines.filter((line) =>
      line.includes(index)
    );
    const values = possibleWinningLines.map((line) =>
      line.map((i) => currentBoard[i])
    );

    const winners = values.map((line) => {
      const first = line[0];
      if (!first) return false;

      return line.every((cell) => cell === first);
    });
    const hasWinner = winners.some(Boolean);
    if (hasWinner) {
      setWinner(true);
    }

    if (hasWinner) {
      alert(`${turn} Wins!`);
    }
  }

  function resetGame () {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  function handleBoardChange(index) {
    if (board[index]) return;
    if (winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    checkWinner(index, newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
  }

  return (
    <>
      <section id="gameBoard">
        {board.map((cell, index) => (
          <div
            className={`game_cell ${cell ? "filled" : ""}`}
            onClick={() => handleBoardChange(index)}
            key={`cell ${index}`}
          >
            <span className="cell_content">{cell}</span>
          </div>
        ))}
      </section>
      <PlayersTurn turn={turn} />
    </>
  );
}
