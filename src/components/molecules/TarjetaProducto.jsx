import Boton from '../atoms/Boton'
import EnlaceBoton from '../atoms/EnlaceBoton'
import BotonFavorito from '../atoms/BotonFavorito'
import Precio from '../atoms/Precio'

// Molécula: tarjeta de un producto del catálogo.
// Recibe el producto y funciones (onAgregar, onFavorito); no guarda estado propio.
function TarjetaProducto({ producto, esFavorito, onFavorito, onAgregar, esAdmin = false, onEditar = null, onEliminar = null }) {
  const sinStock = producto.stock < 1

  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <h3>{producto.nombre}</h3>
      <p>
        {producto.descripcion} <Precio valor={producto.precio} />
      </p>

      <div className="acciones-tarjeta">
        <EnlaceBoton to={`/producto/${producto.id}`}>Ver Detalle</EnlaceBoton>
        <Boton onClick={() => onAgregar(producto)} disabled={sinStock}>
          {sinStock ? 'Sin stock' : 'Agregar al carrito'}
        </Boton>
      </div>

      {esAdmin && (
        <div className="acciones-admin-tarjeta">
          <Boton
            variante="secundario"
            onClick={() => onEditar?.(producto)}
            aria-label={`Editar ${producto.nombre}`}
          >
            Editar
          </Boton>
          <Boton
            variante="peligro"
            onClick={() => onEliminar?.(producto)}
            aria-label={`Eliminar ${producto.nombre}`}
          >
            Eliminar
          </Boton>
        </div>
      )}

      <BotonFavorito activo={esFavorito} onAlternar={() => onFavorito(producto.id)} />
    </article>
  )
}

export default TarjetaProducto
