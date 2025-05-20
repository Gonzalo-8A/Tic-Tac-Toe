import './Header.css'

export default function Header({ goToStart }) {
  return (
    <header>
      <a onClick={goToStart}><img src="logoTicTacToe.png" alt="Logo del juego Tic-Tac-Toe" /></a>
      <h1>Tic-Tac-Toe</h1>
    </header>
  );
}
