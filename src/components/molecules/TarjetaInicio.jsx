import EnlaceBoton from '../atoms/EnlaceBoton'

// Molécula: tarjeta de la galería de la página de inicio (servicios y categorías destacadas).
function TarjetaInicio({ titulo, descripcion, imagen, ruta }) {
  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        <img src={imagen} alt={titulo} />
      </div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      {ruta && <EnlaceBoton to={ruta}>Ver Detalle</EnlaceBoton>}
    </article>
  )
}

export default TarjetaInicio
