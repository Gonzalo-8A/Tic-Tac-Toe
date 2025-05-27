import { useState, useEffect, useCallback } from 'react';
import PlayersTurn from '../PlayerTurn/PlayersTurn.jsx';
import GameResult from '../GameResult/GameResult.jsx';
import {
  checkWinner,
  getWinningLineStyle,
  getAIMove,
} from '../../../gameLogic.js';

import './GameBoard.css';

export default function GameBoard({ goToStart, goToPrevStep ,playersInfo, isSinglePlayer, difficulty, setDifficulty, winner, setWinner }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(1);
  
  const [winningLine, setWinningLine] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleBoardChange = useCallback(
    (index) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = playersInfo[turn].symbol;
      setBoard(newBoard);

      const result = checkWinner(index, newBoard, setWinner, setWinningLine);

      if (!result) {
        const newTurn = turn === 1 ? 2 : 1;
        setTurn(newTurn);
      }
    },
    [board, winner, playersInfo, turn, setWinner]
  );

  useEffect(() => {
    const randomTurn = Math.random() < 0.5 ? 1 : 2;
    setTurn(randomTurn);
  }, []);

  useEffect(() => {
    if (isSinglePlayer && turn === 2 && winner === null) {
      const timeoutId = setTimeout(() => {
        const aiMoveIndex = getAIMove(
          board,
          playersInfo[2].symbol,
          playersInfo[1].symbol,
          difficulty
        );
        handleBoardChange(aiMoveIndex);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [turn, isSinglePlayer, winner, board, handleBoardChange, playersInfo, difficulty]);

  useEffect(() => {
    if (winner && winner !== false) {
      const timeout = setTimeout(() => {
        setShowResult(true);
      }, 1300);

      return () => clearTimeout(timeout);
    } else if (winner === false) {
      const timeout = setTimeout(() => {
        setShowResult(true);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      setShowResult(false);
    }
  }, [winner]);

  function handleClick(index) {
    if(isSinglePlayer && turn === 2) return;
    handleBoardChange(index)
  }

  function resetGame() {
    setShowResult(false)
    setBoard(Array(9).fill(null));
    const randomTurn = Math.random() < 0.5 ? 1 : 2;
    setTurn(randomTurn);
    setWinner(null);
    setWinningLine(null);
    setDifficulty("default")
  }

  return (
    <>
      <PlayersTurn winner={winner} turn={turn} playersInfo={playersInfo} />
      <section
        id="game-board"
        className={`game-board ${showResult !== false ? 'blur' : ''}`}
      >
        {winner && winningLine && (
          <div
            className="winning-line"
            style={{
              backgroundColor: turn === 1 ? '#3949ab' : '#c2185b',
              ...getWinningLineStyle(winningLine),
            }}
          ></div>
        )}
        {board.map((cell, index) => (
          <div
            className={`game_cell ${cell ? 'filled' : ''} ${
              winner ? 'no-hover' : ''
            }`}
            onClick={() => handleClick(index)}
            key={`cell ${index}`}
          >
            <span className="cell-content">{cell}</span>
          </div>
        ))}
      </section>
      {showResult && (
        <GameResult
          turn={turn}
          winner={winner}
          playersInfo={playersInfo}
          isSinglePlayer={isSinglePlayer}
          goToStart={goToStart}
          resetGame={resetGame}
          goToPrevStep={goToPrevStep}
        />
      )}
    </>
  );
}
