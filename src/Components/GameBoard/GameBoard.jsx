import { useState, useEffect, useCallback } from 'react';
import PlayersTurn from '../PlayerTurn/PlayersTurn.jsx';
import GameResult from '../GameResult/GameResult.jsx';
import { checkWinner, getAIMove } from '../../../gameLogic.js';

import './GameBoard.css';

export default function GameBoard({ goToStart, playersInfo, isSinglePlayer }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  const handleBoardChange = useCallback(
    (index) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = playersInfo[turn].symbol;
      setBoard(newBoard);

      checkWinner(index, newBoard, setWinner);

      const newTurn = turn === 1 ? 2 : 1;
      setTurn(newTurn);
    },
    [board, winner, playersInfo, turn]
  );

  useEffect(() => {
    const randomTurn = Math.random() < 0.5 ? 1 : 2;
    setTurn(randomTurn);
  }, []);

  useEffect(() => {
    if (isSinglePlayer && turn === 2 && !winner) {
      const timeoutId = setTimeout(() => {
        const aiMoveIndex = getAIMove(board, playersInfo[2].symbol);
        handleBoardChange(aiMoveIndex);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [turn, isSinglePlayer, winner, board, handleBoardChange, playersInfo]);

  function resetGame() {
    setBoard(Array(9).fill(null));
    const randomTurn = Math.random() < 0.5 ? 1 : 2
    setTurn(randomTurn);
    setWinner(null);
  }

  return (
    <>
      <PlayersTurn winner={winner} turn={turn} playersInfo={playersInfo} />
      <section id="game-board" className={`game-board ${winner !== null ? 'blur' : ''}`}>
        {board.map((cell, index) => (
          <div
            className={`game_cell ${cell ? 'filled' : ''} ${winner ? 'no-hover' : ''}`}
            onClick={() => handleBoardChange(index)}
            key={`cell ${index}`}
          >
            <span className="cell_content">{cell}</span>
          </div>
        ))}
      </section>
      {winner !== null && (
        <GameResult
          turn={turn}
          winner={winner}
          playersInfo={playersInfo}
          goToStart={goToStart}
          resetGame={resetGame}
        />
      )}
    </>
  );
}
