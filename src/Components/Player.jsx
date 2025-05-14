import { useState, useRef, useEffect } from "react";
import "./Player.css";

export default function Player({ name, playerSymbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playersName, setPlayersName] = useState(name);
  const inputRef = useRef(null);

  function savePlayersName(event) {
    setPlayersName(event.target.value);
  }

  function handleChangeName() {
    if (isEditing) {
      const trimmed = playersName?.trim();

      if (!trimmed) {
        alert("El nombre no puede estar vacío o solo con espacios.");
        return;
      }
    }

    setIsEditing(!isEditing);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleChangeName();
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
            onChange={savePlayersName}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="player-name">{playersName || name}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={handleChangeName}>
        {isEditing ? "Guardar" : "Cambiar"}
      </button>
    </li>
  );
}
