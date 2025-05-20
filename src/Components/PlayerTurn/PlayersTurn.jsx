import './PlayersTurn.css'

export default function PlayersTurn({ winner, turn, playersInfo }) {
  
  const { name, symbol } = playersInfo[turn]
  
  return (
    <>
      <section id="playersTurn" className={winner ? "hide" : ''}>
        <span>Turno de {name} {symbol}</span>
      </section>
    </>
  )
}