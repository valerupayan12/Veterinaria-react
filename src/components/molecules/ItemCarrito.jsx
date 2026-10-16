import Boton from '../atoms/Boton'
import Precio from '../atoms/Precio'

// Molécula: una fila del carrito (imagen, nombre, cantidad con +/-, subtotal y botón quitar).
function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
  return (
    <li className="item-carrito">
      <img src={item.imagen} alt={item.nombre} />
      <div className="item-carrito-datos">
        <h3>{item.nombre}</h3>
        <Precio valor={item.precio} />
      </div>
      <div className="control-cantidad">
        <Boton onClick={() => onCambiarCantidad(item, -1)} aria-label={`Quitar una unidad de ${item.nombre}`}>
          −
        </Boton>
        <span aria-label={`Cantidad de ${item.nombre}`}>{item.cantidad}</span>
        <Boton
          onClick={() => onCambiarCantidad(item, 1)}
          disabled={item.cantidad >= item.stock}
          aria-label={`Agregar una unidad de ${item.nombre}`}
        >
          +
        </Boton>
      </div>
      <div className="item-carrito-subtotal">
        <Precio valor={item.precio * item.cantidad} />
      </div>
      <Boton variante="secundario" onClick={() => onQuitar(item.id)}>
        Quitar
      </Boton>
    </li>
  )
}

export default ItemCarrito
