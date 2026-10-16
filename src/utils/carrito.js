// ============================================================
// Lógica del carrito de compras (funciones puras, sin React).
// El carrito es un arreglo de objetos { id, cantidad }.
// ============================================================

export const ENVIO_GRATIS_DESDE = 20000 // "Despacho gratis en San Marcos por compras sobre $20.000"
export const COSTO_DESPACHO = 2990 // costo cuando no se alcanza el mínimo

// Agrega una unidad del producto. Si ya existe, suma 1 sin superar el stock.
export function agregarAlCarrito(carrito, producto) {
  const existente = carrito.find((item) => item.id === producto.id)
  if (!existente) {
    if (producto.stock < 1) return carrito
    return [...carrito, { id: producto.id, cantidad: 1 }]
  }
  return carrito.map((item) =>
    item.id === producto.id ? { ...item, cantidad: Math.min(item.cantidad + 1, producto.stock) } : item,
  )
}

// Suma o resta unidades (delta = +1 / -1). Si llega a 0 se elimina del carrito.
export function cambiarCantidad(carrito, producto, delta) {
  return carrito
    .map((item) =>
      item.id === producto.id
        ? { ...item, cantidad: Math.min(item.cantidad + delta, producto.stock) }
        : item,
    )
    .filter((item) => item.cantidad > 0)
}

export function quitarDelCarrito(carrito, id) {
  return carrito.filter((item) => item.id !== id)
}

// Une el carrito con los datos del catálogo -> [{...producto, cantidad}]
// (si un producto fue eliminado del catálogo, se descarta)
export function detalleCarrito(carrito, productos) {
  return carrito
    .map((item) => {
      const producto = productos.find((p) => p.id === item.id)
      return producto ? { ...producto, cantidad: item.cantidad } : null
    })
    .filter((item) => item !== null)
}

export function calcularSubtotal(items) {
  return items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
}

export function calcularDespacho(subtotal, entrega = 'despacho') {
  if (entrega === 'retiro' || subtotal === 0) return 0
  return subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_DESPACHO
}

export function contarUnidades(carrito) {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0)
}
