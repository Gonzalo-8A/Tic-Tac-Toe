import { useState, useCallback } from 'react';
import { checkWinner } from '../../gameLogic';

const steps = [
  'start',
  'modeSelection',
  'difficultySelection',
  'playerSetup',
  'gameBoard',
];

const initialPlayersInfo = {
  1: {
    name: 'Jugador 1',
    symbol: '✖️',
  },
  2: {
    name: 'Jugador 2',
    symbol: '⭕',
  },
};

export function useGameLogic() {
  // Estados del flujo del juego
  const [stepIndex, setStepIndex] = useState(0);
  const [playersInfo, setPlayersInfo] = useState(initialPlayersInfo);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const [difficulty, setDifficulty] = useState('default');
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winningLine, setWinningLine] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const gameStep = steps[stepIndex];

  // Navegación de pasos
  function goToNextStep(param = 1) {
    setStepIndex((prev) => Math.min(prev + param, steps.length - 1));
  }

  function goToPrevStep() {
    if (gameStep === 'gameBoard') {
      setStepIndex(2);
      return;
    }

    setStepIndex((prev) => Math.max(prev - (isSinglePlayer ? 1 : 2), 0));

    if (gameStep === 'difficultySelection') {
      setPlayersInfo(initialPlayersInfo);
    }
  }

  function goToStart() {
    setStepIndex(0);
    setIsSinglePlayer(false);
    setPlayersInfo(initialPlayersInfo);
    setDifficulty('default');
  }

  function setGameMode(param) {
    setIsSinglePlayer(param);
    if (param) {
      setPlayersInfo((prev) => ({
        ...prev,
        2: {
          ...prev[2],
          name: 'X-O-Tron',
        },
      }));
    }
  }

  function changeDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  // Juego
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

  function handleClick(index) {
    if (isSinglePlayer && turn === 2) return;
    handleBoardChange(index);
  }

  function resetGame() {
    setShowResult(false);
    setBoard(Array(9).fill(null));
    const randomTurn = Math.random() < 0.5 ? 1 : 2;
    setTurn(randomTurn);
    setWinner(null);
    setWinningLine(null);
  }

  return {
    // Navegación
    gameStep,
    goToNextStep,
    goToPrevStep,
    goToStart,
    setGameMode,
    changeDifficulty,
    stepIndex,

    // Estado del juego
    playersInfo,
    setPlayersInfo,
    isSinglePlayer,
    difficulty,
    winner,
    setWinner,

    // Tablero
    board,
    setBoard,
    turn,
    setTurn,
    handleBoardChange,
    handleClick,
    resetGame,
    winningLine,
    setWinningLine,
    showResult,
    setShowResult,
  };
}
