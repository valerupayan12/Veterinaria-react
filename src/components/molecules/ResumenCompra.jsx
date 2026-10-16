import { formatearPrecio } from '../../utils/formato'

// Molécula: resumen de valores de la compra (subtotal, despacho y total).
function ResumenCompra({ subtotal, despacho, total }) {
  return (
    <dl className="resumen-compra">
      <div>
        <dt>Subtotal</dt>
        <dd>{formatearPrecio(subtotal)}</dd>
      </div>
      <div>
        <dt>Despacho</dt>
        <dd>{despacho === 0 ? 'Gratis' : formatearPrecio(despacho)}</dd>
      </div>
      <div className="resumen-total">
        <dt>Total</dt>
        <dd>{formatearPrecio(total)}</dd>
      </div>
    </dl>
  )
}

export default ResumenCompra
