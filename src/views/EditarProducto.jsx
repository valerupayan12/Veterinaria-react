import { useNavigate, useParams } from 'react-router-dom'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import EnlaceBoton from '../components/atoms/EnlaceBoton'
import FormularioProducto from '../components/organisms/FormularioProducto'
import Error404 from './Error404'
import { SITIO } from '../data/sitio'

// Edición de un producto del catálogo (ruta protegida: solo administrador).
// Usa el mismo formulario del panel, pero con los datos del producto cargados.
function EditarProducto({ layout, productos, onEditarProducto }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = productos.find((p) => String(p.id) === String(id))

  if (!producto) return <Error404 layout={layout} />

  const guardar = async (datos) => {
    const resultado = await onEditarProducto(producto.id, datos)
    if (resultado?.ok !== false) navigate('/admin')
    return resultado
  }

  return (
    <PlantillaPagina
      layout={layout}
      topbar="BIENVENIDO ADMINISTRADOR"
      titulo="Editar producto"
      subtitulo={producto.nombre}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion id="editar-producto" titulo={`Datos de «${producto.nombre}»`}>
        <FormularioProducto key={producto.id} valorInicial={producto} onCrear={guardar} />
        <p className="mt-3">
          <EnlaceBoton to="/admin">Volver al panel</EnlaceBoton>
        </p>
      </Seccion>
    </PlantillaPagina>
  )
}

export default EditarProducto
