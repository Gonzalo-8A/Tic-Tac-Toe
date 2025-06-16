import { useEffect } from 'react';
import PlayersTurn from '../PlayerTurn/PlayersTurn.jsx';
import GameResult from '../GameResult/GameResult.jsx';
import { getWinningLineStyle, getAIMove } from '../../data/gameLogic.js';

import './GameBoard.css';

export default function GameBoard({ game }) {
  //Bring all props from useGameLogic
  const {
    board,
    turn,
    setTurn,
    isSinglePlayer,
    playersInfo,
    difficulty,
    handleBoardChange,
    goToStart,
    goToPrevStep,
    handleClick,
    resetGame,
    winner,
    winningLine,
    setShowResult,
    showResult,
  } = game;

  useEffect(() => {
    const randomTurn = Math.random() < 0.5 ? 1 : 2;
    setTurn(randomTurn);
  }, [setTurn]);

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
  }, [
    turn,
    isSinglePlayer,
    winner,
    board,
    handleBoardChange,
    playersInfo,
    difficulty,
  ]);

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
  }, [winner, setShowResult]);

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
