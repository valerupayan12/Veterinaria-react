import { formatearPrecio } from '../../utils/formato'

// Átomo: muestra un valor como precio chileno. "grande" se usa en la página de detalle.
function Precio({ valor, grande = false }) {
  return <span className={grande ? 'product-price' : 'precio'}>{formatearPrecio(valor)}</span>
}

export default Precio
