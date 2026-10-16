// Molécula: tarjeta pequeña de información (Envío, Garantía, Stock, Horarios...).
function InfoCard({ titulo, texto }) {
  return (
    <div className="info-card">
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  )
}

export default InfoCard
