import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import GrupoOpciones from '../molecules/GrupoOpciones'
import { validarCheckout } from '../../utils/validaciones'

const METODOS_PAGO = [
  { valor: 'debito', etiqueta: 'Débito' },
  { valor: 'credito', etiqueta: 'Crédito' },
  { valor: 'transferencia', etiqueta: 'Transferencia' },
  { valor: 'paypal', etiqueta: 'PayPal' },
]

// Organismo: formulario de pago/despacho del carrito.
//  - "entrega" (despacho o retiro) se informa a la página con onEntregaCambio para recalcular el total.
//  - "exigirReceta" es true si el carrito tiene productos de farmacia (requieren receta veterinaria).
function FormularioCheckout({ usuario, entrega, onEntregaCambio, exigirReceta, onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: usuario ? usuario.nombre : '',
    telefono: usuario ? usuario.telefono || '' : '',
    direccion: '',
    metodoPago: '',
    notas: '',
    confirmaReceta: false,
  })
  const [errores, setErrores] = useState({})

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = validarCheckout({ ...datos, entrega, exigirReceta })
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return
    onConfirmar({ ...datos, entrega })
  }

  return (
    <Form id="form-checkout" onSubmit={manejarEnvio} noValidate>
      <h3>Datos de entrega y pago</h3>
      <CampoFormulario id="nombre" etiqueta="Nombre de quien recibe" valor={datos.nombre} onCambio={manejarCambio} error={errores.nombre} />
      <CampoFormulario id="telefono" etiqueta="Teléfono de contacto" tipo="tel" placeholder="+56 9 1234 5678" valor={datos.telefono} onCambio={manejarCambio} error={errores.telefono} />

      <GrupoOpciones
        nombre="entrega"
        etiqueta="Tipo de entrega"
        tipo="radio"
        opciones={[
          { valor: 'despacho', etiqueta: 'Despacho a domicilio' },
          { valor: 'retiro', etiqueta: 'Retiro en la veterinaria' },
        ]}
        seleccion={entrega}
        onCambio={(e) => onEntregaCambio(e.target.value)}
      />

      {entrega === 'despacho' && (
        <CampoFormulario id="direccion" etiqueta="Dirección de despacho (San Marcos)" placeholder="Calle y número" valor={datos.direccion} onCambio={manejarCambio} error={errores.direccion} />
      )}

      <CampoFormulario id="metodoPago" etiqueta="Método de pago" opciones={METODOS_PAGO} textoOpcionVacia="-- Seleccione método de pago --" valor={datos.metodoPago} onCambio={manejarCambio} error={errores.metodoPago} />
      <CampoFormulario id="notas" etiqueta="Indicaciones para el pedido (opcional)" filas={2} placeholder="Ej: mi mascota es alérgica al pollo..." valor={datos.notas} onCambio={manejarCambio} />

      {exigirReceta && (
        <Form.Group className="mb-3">
          <Form.Check
            id="confirmaReceta"
            type="checkbox"
            label="Confirmo que cuento con receta veterinaria para los productos de farmacia"
            checked={datos.confirmaReceta}
            onChange={(e) => setDatos({ ...datos, confirmaReceta: e.target.checked })}
            isInvalid={Boolean(errores.confirmaReceta)}
            feedback={errores.confirmaReceta}
            feedbackType="invalid"
          />
        </Form.Group>
      )}

      <Boton tipo="submit" className="w-100">Confirmar compra</Boton>
    </Form>
  )
}

export default FormularioCheckout
