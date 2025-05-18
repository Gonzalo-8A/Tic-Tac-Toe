import './PlayersTurn.css'

export default function PlayersTurn({ turn }) {
  return (
    <>
      <section id="playersTurn">
        <span>Turno de {turn}</span>
      </section>
    </>
  )
}