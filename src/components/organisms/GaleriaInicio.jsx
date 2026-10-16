import TarjetaInicio from '../molecules/TarjetaInicio'

// Organismo: cuadrícula de tarjetas de servicios/categorías de la página de inicio.
function GaleriaInicio({ tarjetas }) {
  return (
    <div className="galeria">
      {tarjetas.map((t) => (
        <TarjetaInicio key={t.id} titulo={t.titulo} descripcion={t.descripcion} imagen={t.imagen} ruta={t.ruta} />
      ))}
    </div>
  )
}

export default GaleriaInicio
