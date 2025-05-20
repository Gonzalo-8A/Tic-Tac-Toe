import './PlayersTurn.css'

export default function PlayersTurn({ turn }) {
  return (
    <>
      <div id="playersTurn">
        <span>Turno de {turn}</span>
      </div>
    </>
  )
}