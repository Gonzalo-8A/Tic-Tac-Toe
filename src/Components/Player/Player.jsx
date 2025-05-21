import { useState, useRef, useEffect } from 'react';
import './Player.css';

export default function Player({ player, playersInfo, setPlayersInfo, isSinglePlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function savePlayersName(e) {
    const { value } = e.target;
    setPlayersInfo((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        name: value.toUpperCase(),
      },
    }));
  }

  function handleNameChange() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleNameChange();
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            ref={inputRef}
            required
            defaultValue=""
            onChange={(event) => savePlayersName(event)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="player-name">{playersInfo[player].name || player}</span>
        )}
        <span className="player-symbol">{playersInfo[player].symbol}</span>
      </span>
      {(player === 1 || (player === 2 && !isSinglePlayer)) && (
        <button onClick={handleNameChange}>{isEditing ? 'Guardar' : 'Cambiar'}</button>
      )}
    </li>
  );
}
