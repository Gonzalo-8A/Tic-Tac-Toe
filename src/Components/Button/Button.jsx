import './Button.css'

export default function Button({ styles = '', onClick, setGameMode, children, ...props }) {
  return (
    <button
      {...props}
      className={`game-button ${styles}`}
      onClick={() => {
        onClick?.();
        setGameMode?.();
      }}
    >
      {children}
    </button>
  );
}
