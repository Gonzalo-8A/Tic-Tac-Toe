import './Button.css'

export default function Button({ styles = '', onClick, children, ...props }) {
  return (
    <button
      {...props}
      className={`game-button ${styles}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
