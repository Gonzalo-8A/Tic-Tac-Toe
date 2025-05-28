import { useEffect, useState } from 'react';
import Button from '../Button/Button.jsx';
import './GameCount.css';

export default function GameCount({ playersInfo, winner, difficulty }) {
  const createInitialCount = () => ({
    default: { 1: 0, 0: 0, 2: 0 },
    easy: { 1: 0, 0: 0, 2: 0 },
    normal: { 1: 0, 0: 0, 2: 0 },
    hard: { 1: 0, 0: 0, 2: 0 },
  });

  const [gameCount, setGameCount] = useState(() => {
    const saved = localStorage.getItem('gameCountByDifficulty');
    return saved
      ? JSON.parse(saved)
      : createInitialCount();
  });

  // Actualizar el conteo de la dificultad actual cuando hay un ganador
  useEffect(() => {
    if (!winner && winner !== false) return;

    setGameCount((prev) => {
      const updated = { ...prev };
      const current = { ...updated[difficulty] };

      if (winner === '✖️') current[1]++;
      else if (winner === '⭕') current[2]++;
      else if (winner === false) current[0]++;

      updated[difficulty] = current;
      return updated;
    });
  }, [winner, difficulty]);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('gameCountByDifficulty', JSON.stringify(gameCount));
  }, [gameCount]);

  function resetScore() {
    const reset = {
      ...gameCount,
      [difficulty]: { 1: 0, 0: 0, 2: 0 },
    };
    setGameCount(reset);
    localStorage.setItem('gameCountByDifficulty', JSON.stringify(reset));
  }

  const currentCount = gameCount[difficulty] || createInitialCount();
  const difficultyString = {
    easy: 'Fácil',
    normal: 'Normal',
    hard: 'Difícil',
  };

  return (
    <div className="result-count-container">
      {difficulty !== 'default' && (
        <h2>{`Dificultad: ${difficultyString[difficulty]}`}</h2>
      )}
      <div className="result-count">
        <p>{`${playersInfo[1].name} ${playersInfo[1].symbol}`}</p>
        <span>{currentCount[1]}</span>
      </div>
      <div className="result-count">
        <p>Empate</p>
        <span>{currentCount[0]}</span>
      </div>
      <div className="result-count">
        <p>{`${playersInfo[2].name} ${playersInfo[2].symbol}`}</p>
        <span>{currentCount[2]}</span>
      </div>
      <Button onClick={resetScore}>Reiniciar puntuación</Button>
    </div>
  );
}
