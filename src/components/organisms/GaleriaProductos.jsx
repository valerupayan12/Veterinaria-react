import TarjetaProducto from '../molecules/TarjetaProducto'

// Organismo: cuadrícula con las tarjetas de producto.
function GaleriaProductos({ productos, favoritos, onFavorito, onAgregar, esAdmin = false, onEditar = null, onEliminar = null }) {
  if (productos.length === 0) {
    return <p className="mensaje-vacio">No encontramos productos con esos filtros. Prueba con otra búsqueda.</p>
  }

  return (
    <div className="galeria galeria-productos">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          esFavorito={favoritos.includes(producto.id)}
          onFavorito={onFavorito}
          onAgregar={onAgregar}
          esAdmin={esAdmin}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}

export default GaleriaProductos
