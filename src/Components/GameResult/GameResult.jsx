import Button from "../Button/Button.jsx";
import StepContainer from "../StepContainer/StepContainer.jsx";
import "./GameResult.css";

export default function GameResult({ winner, playersInfo, resetGame, goToStart }) {
  const resultVariants = {
    hidden: { opacity: 0, transform: "translate(-50%, -40%) translateY(20px)" },
    visible: { opacity: 1, transform: "translate(-50%, -50%) translateY(0)" },
    exit: { opacity: 0, transform: "translate(-50%, -40%) translateY(20px)" },
  };

  const winnerPlayer = Object.values(playersInfo).find(
    (player) => player.symbol === winner
  );

  return (
    <StepContainer
      id="game-result"
      className="game-result"
      variants={resultVariants}
    >
      <h2 className="result-message">
        {winner !== false ? `El ganador es ${winnerPlayer?.name} ${winnerPlayer?.symbol}` : "¡ Empate !"}
      </h2>
      <div className="result-btn-container">
        <Button id="go-to-start-btn" onClick={goToStart}>
          Inicio
        </Button>
        <Button id="reset-btn" onClick={resetGame}>
          Reiniciar
        </Button>
      </div>
    </StepContainer>
  );
}
