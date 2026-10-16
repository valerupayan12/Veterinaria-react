// Convierte un número en precio chileno. Ej: 25990 -> "$25.990"
export function formatearPrecio(valor) {
  const numero = Math.round(Number(valor) || 0)
  return '$' + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
