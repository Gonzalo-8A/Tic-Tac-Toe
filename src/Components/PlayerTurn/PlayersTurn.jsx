import './PlayersTurn.css'

export default function PlayersTurn({ turn, playersInfo }) {
  
  const { name, symbol } = playersInfo[turn]
  
  return (
    <>
      <section id="playersTurn">
        <span>Turno de {name} {symbol}</span>
      </section>
    </>
  )
}