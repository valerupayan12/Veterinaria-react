import ItemCarrito from '../molecules/ItemCarrito'
import EnlaceBoton from '../atoms/EnlaceBoton'

// Organismo: lista de productos del carrito (o mensaje si está vacío).
function ListaCarrito({ items, onCambiarCantidad, onQuitar }) {
  if (items.length === 0) {
    return (
      <div>
        <p className="mensaje-vacio">Tu carrito está vacío.</p>
        <EnlaceBoton to="/productos">Ir al catálogo</EnlaceBoton>
      </div>
    )
  }

  return (
    <ul className="lista-carrito">
      {items.map((item) => (
        <ItemCarrito key={item.id} item={item} onCambiarCantidad={onCambiarCantidad} onQuitar={onQuitar} />
      ))}
    </ul>
  )
}

export default ListaCarrito
