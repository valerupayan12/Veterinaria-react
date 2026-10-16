import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import GrupoOpciones from '../molecules/GrupoOpciones'
import { tiposMascota } from '../../data/productos'
import { validarRegistro } from '../../utils/validaciones'

const DATOS_VACIOS = {
  nombre: '',
  rut: '',
  email: '',
  password: '',
  telefono: '',
  nombreMascota: '',
  tipoMascota: '',
  raza: '',
  edad: '',
  peso: '',
  microchip: '',
  visitaAnterior: '',
  servicios: [],
  observaciones: '',
}

const SERVICIOS = [
  { valor: 'consulta', etiqueta: 'Consulta General' },
  { valor: 'vacunacion', etiqueta: 'Vacunación' },
  { valor: 'desparasitante', etiqueta: 'Desparasitante' },
  { valor: 'peluqueria', etiqueta: 'Peluquería' },
  { valor: 'urgencia', etiqueta: 'Urgencia' },
  { valor: 'otro-servicio', etiqueta: 'Otro' },
]

// Organismo: formulario de registro de cuenta + datos de la mascota (campos de contexto de la veterinaria).
// "onRegistrar" recibe los datos validados y devuelve '' si todo salió bien o un mensaje de error.
function FormularioRegistro({ onRegistrar }) {
  const [datos, setDatos] = useState(DATOS_VACIOS)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [exito, setExito] = useState(false)

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  // checkboxes de servicios: agrega o quita el valor del arreglo
  const manejarServicio = (e) => {
    const { value, checked } = e.target
    const servicios = checked ? [...datos.servicios, value] : datos.servicios.filter((s) => s !== value)
    setDatos({ ...datos, servicios })
  }

  const limpiar = () => {
    setDatos(DATOS_VACIOS)
    setErrores({})
    setErrorGeneral('')
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    setExito(false)
    const nuevosErrores = validarRegistro(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const mensaje = onRegistrar(datos)
    if (mensaje) {
      setErrorGeneral(mensaje)
      return
    }
    setErrorGeneral('')
    setExito(true)
    setDatos(DATOS_VACIOS)
  }

  return (
    <Form name="registro-mascota" id="registro-mascota" onSubmit={manejarEnvio} noValidate>
      <fieldset>
        <legend>Información del Propietario</legend>
        <Row>
          <Col md={6}>
            <CampoFormulario id="nombre" etiqueta="Nombre Completo" placeholder="Ej: Juan García" valor={datos.nombre} onCambio={manejarCambio} error={errores.nombre} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="rut" etiqueta="RUT" placeholder="Formato: 12345678-9" valor={datos.rut} onCambio={manejarCambio} error={errores.rut} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="email" etiqueta="Correo Electrónico" tipo="email" placeholder="tu@correo.com" valor={datos.email} onCambio={manejarCambio} error={errores.email} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="password" etiqueta="Contraseña" tipo="password" placeholder="Contraseña" valor={datos.password} onCambio={manejarCambio} error={errores.password} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="telefono" etiqueta="Teléfono de Contacto" tipo="tel" placeholder="+56 9 1234 5678" valor={datos.telefono} onCambio={manejarCambio} error={errores.telefono} />
          </Col>
        </Row>
      </fieldset>

      <fieldset>
        <legend>Información de la Mascota</legend>
        <Row>
          <Col md={6}>
            <CampoFormulario id="nombreMascota" etiqueta="Nombre de la Mascota" placeholder="Ej: Rocky, Miau, etc." valor={datos.nombreMascota} onCambio={manejarCambio} error={errores.nombreMascota} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="tipoMascota" etiqueta="Tipo de Mascota" opciones={[...tiposMascota, { valor: 'otro', etiqueta: 'Otro' }]} textoOpcionVacia="--SELECCIONE TIPO DE MASCOTA--" valor={datos.tipoMascota} onCambio={manejarCambio} error={errores.tipoMascota} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="raza" etiqueta="Raza" placeholder="Ej: Golden Retriever, Persa, etc." valor={datos.raza} onCambio={manejarCambio} error={errores.raza} />
          </Col>
          <Col md={3}>
            <CampoFormulario id="edad" etiqueta="Edad de la Mascota" tipo="number" min="0" max="50" placeholder="En años" valor={datos.edad} onCambio={manejarCambio} error={errores.edad} />
          </Col>
          <Col md={3}>
            <CampoFormulario id="peso" etiqueta="Peso (kg)" tipo="number" min="0" step="0.1" placeholder="Ej: 25.5" valor={datos.peso} onCambio={manejarCambio} error={errores.peso} />
          </Col>
          <Col md={6}>
            <CampoFormulario id="microchip" etiqueta="Microchip" placeholder="Número de microchip (si tiene)" valor={datos.microchip} onCambio={manejarCambio} error={errores.microchip} />
          </Col>
        </Row>
      </fieldset>

      <fieldset>
        <legend>Información Médica y Servicios</legend>
        <GrupoOpciones
          nombre="visitaAnterior"
          etiqueta="¿Ha visitado antes Veterinaria San Marcos?"
          tipo="radio"
          opciones={[{ valor: 'si', etiqueta: 'Sí' }, { valor: 'no', etiqueta: 'No' }]}
          seleccion={datos.visitaAnterior}
          onCambio={manejarCambio}
          error={errores.visitaAnterior}
        />
        <GrupoOpciones
          nombre="servicios"
          etiqueta="Servicios Solicitados"
          tipo="checkbox"
          opciones={SERVICIOS}
          seleccion={datos.servicios}
          onCambio={manejarServicio}
        />
        <CampoFormulario id="observaciones" etiqueta="Observaciones o Alergias Conocidas" filas={4} placeholder="Cuéntanos sobre condiciones especiales, medicamentos actuales, alergias, comportamiento, etc." valor={datos.observaciones} onCambio={manejarCambio} />
      </fieldset>

      {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}
      {exito && (
        <div className="alert alert-success" role="status">
          ¡Registro correcto! Ya puedes iniciar sesión con tu correo y contraseña.
        </div>
      )}

      <Boton tipo="submit">Registrar Mascota</Boton>{' '}
      <Boton tipo="button" className="boton-limpiar" onClick={limpiar}>
        Limpiar Formulario
      </Boton>
    </Form>
  )
}

export default FormularioRegistro
