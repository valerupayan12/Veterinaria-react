import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Boton from '../atoms/Boton'
import CampoFormulario from '../molecules/CampoFormulario'
import GrupoOpciones from '../molecules/GrupoOpciones'
import { categorias, tiposMascota } from '../../data/productos'
import { validarProducto } from '../../utils/validaciones'

const DATOS_VACIOS = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
  mascotas: [],
  requiereReceta: false,
}

// Organismo: formulario del Panel de Control para crear un producto (solo en memoria).
// "onCrear" recibe los datos validados; la imagen siempre es la genérica por defecto.
function FormularioProducto({ onCrear }) {
  const [datos, setDatos] = useState(DATOS_VACIOS)
  const [errores, setErrores] = useState({})
  const [creado, setCreado] = useState('')

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const manejarMascota = (e) => {
    const { value, checked } = e.target
    const mascotas = checked ? [...datos.mascotas, value] : datos.mascotas.filter((m) => m !== value)
    setDatos({ ...datos, mascotas })
    setErrores({ ...errores, mascotas: '' })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = validarProducto(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    onCrear(datos)
    setCreado(datos.nombre.trim())
    setDatos(DATOS_VACIOS)
  }

  return (
    <Form id="form-producto" onSubmit={manejarEnvio} noValidate>
      <Row>
        <Col md={6}>
          <CampoFormulario id="nombre" etiqueta="Nombre del producto" placeholder="Ej: Collar antipulgas para perro" valor={datos.nombre} onCambio={manejarCambio} error={errores.nombre} />
        </Col>
        <Col md={6}>
          <CampoFormulario id="categoria" etiqueta="Categoría" opciones={categorias} textoOpcionVacia="-- Seleccione categoría --" valor={datos.categoria} onCambio={manejarCambio} error={errores.categoria} />
        </Col>
        <Col md={6}>
          <CampoFormulario id="precio" etiqueta="Precio (CLP)" tipo="number" min="0" placeholder="Ej: 9990" valor={datos.precio} onCambio={manejarCambio} error={errores.precio} />
        </Col>
        <Col md={6}>
          <CampoFormulario id="stock" etiqueta="Stock disponible" tipo="number" min="0" placeholder="Ej: 20" valor={datos.stock} onCambio={manejarCambio} error={errores.stock} />
        </Col>
      </Row>

      <CampoFormulario id="descripcion" etiqueta="Descripción" filas={3} placeholder="Describe el producto..." valor={datos.descripcion} onCambio={manejarCambio} error={errores.descripcion} />

      <GrupoOpciones nombre="mascotas" etiqueta="Mascotas a las que va dirigido" tipo="checkbox" opciones={tiposMascota} seleccion={datos.mascotas} onCambio={manejarMascota} error={errores.mascotas} />

      <Form.Check
        className="mb-3"
        type="checkbox"
        id="requiereReceta"
        label="Requiere receta veterinaria"
        checked={datos.requiereReceta}
        onChange={(e) => setDatos({ ...datos, requiereReceta: e.target.checked })}
      />

      <p className="nota-imagen">La imagen del producto será una imagen genérica por defecto.</p>

      {creado && (
        <div className="alert alert-success" role="status">
          Producto «{creado}» agregado al catálogo (se guarda solo en memoria).
        </div>
      )}

      <Boton tipo="submit">Crear producto</Boton>
    </Form>
  )
}

export default FormularioProducto
