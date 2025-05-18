import { useState, useRef, useEffect } from "react";
import "./Player.css";

export default function Player({ name, playerSymbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playersName, setPlayersName] = useState(name);
  const inputRef = useRef(null);

  function savePlayersName(event) {
    setPlayersName(event.target.value);
  }

  function handleNameChange() {
    if (isEditing) {
      const trimmed = playersName?.trim();

      if (!trimmed) {
        alert("El nombre no puede estar vacío o solo con espacios.");
        return;
      }
    }

    setIsEditing((isEditing) => !isEditing);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
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
            defaultValue={playersName}
            onChange={(event) => savePlayersName(event)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="player-name">{playersName || name}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={() => {handleNameChange()}}>
        {isEditing ? "Guardar" : "Cambiar"}
      </button>
    </li>
  );
}
