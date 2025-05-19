export default function Button({ className, onClick, children, ...props }) {
  return (
    <button
      {...props}
      className={`game_button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
