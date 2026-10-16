import { useState } from 'react'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import ListaCarrito from '../components/organisms/ListaCarrito'
import ResumenCompra from '../components/molecules/ResumenCompra'
import FormularioCheckout from '../components/organisms/FormularioCheckout'
import EnlaceBoton from '../components/atoms/EnlaceBoton'
import { detalleCarrito, calcularSubtotal, calcularDespacho } from '../utils/carrito'
import { formatearPrecio } from '../utils/formato'
import { SITIO } from '../data/sitio'

// Carrito de compras / resumen de pago (checkout).
function Carrito({ layout, carrito, productos, onCambiarCantidad, onQuitar, onVaciar }) {
  const [entrega, setEntrega] = useState('despacho')
  const [pedido, setPedido] = useState(null)

  const items = detalleCarrito(carrito, productos)
  const subtotal = calcularSubtotal(items)
  const despacho = calcularDespacho(subtotal, entrega)
  const total = subtotal + despacho
  const exigirReceta = items.some((item) => item.requiereReceta)

  const confirmar = (datos) => {
    setPedido({ numero: `VSM-${Date.now().toString().slice(-6)}`, total, entrega: datos.entrega })
    onVaciar()
  }

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoDespacho}
      titulo="Carrito de Compras"
      subtitulo="Revisa tu pedido y completa el pago"
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      {pedido && (
        <div className="alert alert-success" role="status">
          <strong>¡Compra realizada!</strong> Tu pedido {pedido.numero} por {formatearPrecio(pedido.total)} fue
          registrado ({pedido.entrega === 'retiro' ? 'retiro en la veterinaria' : 'despacho a domicilio'}).{' '}
          <EnlaceBoton to="/productos">Seguir comprando</EnlaceBoton>
        </div>
      )}

      <Seccion id="carrito" titulo="Tu carrito">
        <div className="carrito-layout">
          <div>
            <ListaCarrito items={items} onCambiarCantidad={onCambiarCantidad} onQuitar={onQuitar} />
          </div>

          {items.length > 0 && (
            <aside className="carrito-pago">
              <ResumenCompra subtotal={subtotal} despacho={despacho} total={total} />
              <FormularioCheckout
                usuario={layout.usuario}
                entrega={entrega}
                onEntregaCambio={setEntrega}
                exigirReceta={exigirReceta}
                onConfirmar={confirmar}
              />
            </aside>
          )}
        </div>
      </Seccion>
    </PlantillaPagina>
  )
}

export default Carrito
