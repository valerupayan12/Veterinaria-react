import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import { tiposMascota } from '../../data/productos'
import { serviciosCita } from '../../data/servicios'
import { validarCita } from '../../utils/validaciones'

const DATOS_VACIOS = {
  nombre: '',
  email: '',
  telefono: '',
  nombreMascota: '',
  tipoMascota: '',
  servicio: 'consulta-medica-general',
  fecha: '',
  motivo: '',
}

// Organismo: formulario "Agendar cita médica" (migrado desde agendarCitaMedico.html).
function FormularioCita() {
  const [datos, setDatos] = useState(DATOS_VACIOS)
  const [errores, setErrores] = useState({})
  const [confirmada, setConfirmada] = useState(false)

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
    setConfirmada(false)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = validarCita(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return
    setConfirmada(true)
    setDatos(DATOS_VACIOS)
  }

  return (
    <Form id="agenda-cita" onSubmit={manejarEnvio} noValidate>
      <fieldset>
        <legend>Datos del propietario</legend>
        <Row>
          <Col md={6}><CampoFormulario id="nombre" etiqueta="Nombre completo" valor={datos.nombre} onCambio={manejarCambio} error={errores.nombre} /></Col>
          <Col md={6}><CampoFormulario id="email" etiqueta="Correo electrónico" tipo="email" valor={datos.email} onCambio={manejarCambio} error={errores.email} /></Col>
          <Col md={6}><CampoFormulario id="telefono" etiqueta="Teléfono" tipo="tel" placeholder="+56 9 1234 5678" valor={datos.telefono} onCambio={manejarCambio} error={errores.telefono} /></Col>
        </Row>
      </fieldset>

      <fieldset>
        <legend>Datos de la mascota</legend>
        <Row>
          <Col md={6}><CampoFormulario id="nombreMascota" etiqueta="Nombre de la mascota" valor={datos.nombreMascota} onCambio={manejarCambio} error={errores.nombreMascota} /></Col>
          <Col md={6}><CampoFormulario id="tipoMascota" etiqueta="Tipo de mascota" opciones={tiposMascota} textoOpcionVacia="Seleccione una opción" valor={datos.tipoMascota} onCambio={manejarCambio} error={errores.tipoMascota} /></Col>
          <Col md={6}><CampoFormulario id="servicio" etiqueta="Servicio" opciones={serviciosCita} valor={datos.servicio} onCambio={manejarCambio} /></Col>
        </Row>
      </fieldset>

      <fieldset>
        <legend>Fecha y horario</legend>
        <Row>
          <Col md={6}><CampoFormulario id="fecha" etiqueta="Fecha" tipo="date" valor={datos.fecha} onCambio={manejarCambio} error={errores.fecha} /></Col>
        </Row>
        <CampoFormulario id="motivo" etiqueta="Motivo de la consulta" filas={4} placeholder="Describe brevemente el motivo de la consulta." valor={datos.motivo} onCambio={manejarCambio} />
      </fieldset>

      {confirmada && (
        <div className="alert alert-success" role="status">
          ¡Solicitud enviada! Te contactaremos para confirmar tu hora de atención.
        </div>
      )}

      <Boton tipo="submit">Confirmar solicitud</Boton>{' '}
      <Boton className="boton-limpiar" onClick={() => { setDatos(DATOS_VACIOS); setErrores({}) }}>
        Limpiar formulario
      </Boton>
    </Form>
  )
}

export default FormularioCita
