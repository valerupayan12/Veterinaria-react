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

// Organismo: formulario del Panel de Control para crear o editar un producto.
// "onCrear" recibe los datos validados y devuelve el resultado de guardarlos (backend o memoria).
// Con "valorInicial" el mismo formulario se usa para editar. La imagen es la genérica por defecto.
function datosDeProducto(producto) {
  if (!producto) return DATOS_VACIOS
  return {
    ...DATOS_VACIOS,
    nombre: producto.nombre ?? '',
    descripcion: producto.descripcion ?? '',
    precio: String(producto.precio ?? ''),
    stock: String(producto.stock ?? ''),
    categoria: producto.categoria ?? '',
    mascotas: producto.mascotas ?? [],
    requiereReceta: Boolean(producto.requiereReceta),
  }
}

function FormularioProducto({ onCrear, valorInicial = null, onCancelar = null, onExito = null }) {
  const editando = Boolean(valorInicial)
  const [datos, setDatos] = useState(() => datosDeProducto(valorInicial))
  const [errores, setErrores] = useState({})
  const [creado, setCreado] = useState('')
  const [aviso, setAviso] = useState('')
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

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

  const manejarEnvio = async (e) => {
    e.preventDefault()
    if (enviando) return

    const nuevosErrores = validarProducto(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    try {
      const resultado = await onCrear(datos)
      if (resultado?.ok === false) {
        setErrorGeneral(resultado.mensaje || 'No se pudo guardar el producto.')
        return
      }
      setErrorGeneral('')
      setCreado(datos.nombre.trim())
      setAviso(resultado?.mensaje || '')
      if (!editando) setDatos(DATOS_VACIOS)
      onExito?.(resultado)
    } catch {
      setErrorGeneral('No se pudo guardar el producto. Intenta nuevamente.')
    } finally {
      setEnviando(false)
    }
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

      <p className="nota-imagen">
        {editando
          ? 'La imagen actual del producto se conserva.'
          : 'La imagen del producto será una imagen genérica por defecto.'}
      </p>

      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}

      {creado && (
        <div className="alert alert-success" role="status">
          {editando
            ? `Producto «${creado}» actualizado.`
            : `Producto «${creado}» agregado al catálogo.`}
          {aviso ? ` ${aviso}` : ''}
        </div>
      )}

      <div className="acciones-formulario">
        <Boton tipo="submit" disabled={enviando}>
          {enviando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear producto'}
        </Boton>
        {onCancelar && (
          <Boton variante="secundario" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </Boton>
        )}
      </div>
    </Form>
  )
}

export default FormularioProducto
