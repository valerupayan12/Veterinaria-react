import imgTarjetaImagenProductos from '../assets/img/tarjeta-imagenProductos.jpg'
import { useState } from 'react'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FiltrosProductos from '../components/molecules/FiltrosProductos'
import GaleriaProductos from '../components/organisms/GaleriaProductos'
import BarraAdminProductos from '../components/organisms/BarraAdminProductos'
import ModalProducto from '../components/organisms/ModalProducto'
import ModalConfirmacion from '../components/molecules/ModalConfirmacion'
import { filtrarProductos } from '../utils/productos'
import { SITIO } from '../data/sitio'

const FILTROS_VACIOS = { texto: '', categoria: '', mascota: '' }

// Catálogo de productos (migrado desde productos.html) con filtrado dinámico.
// Si la sesión es de administrador, además muestra las acciones del CRUD
// conectadas al backend (crear, editar y eliminar en la base de datos).
function Productos({
  layout,
  productos,
  favoritos,
  onFavorito,
  onAgregar,
  conexion = {},
  onCrearProducto,
  onEditarProducto,
  onEliminarProducto,
  onRecargarProductos,
}) {
  const [filtros, setFiltros] = useState(FILTROS_VACIOS)
  const [modalFormulario, setModalFormulario] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)
  const [productoEliminar, setProductoEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [recargando, setRecargando] = useState(false)
  const [aviso, setAviso] = useState(null)

  const esAdmin = layout?.usuario?.rol === 'admin'
  const tema = layout?.tema || 'claro'

  const manejarCambio = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value })
  const visibles = filtrarProductos(productos, filtros)

  const abrirCrear = () => {
    setProductoEditando(null)
    setModalFormulario(true)
  }

  const abrirEditar = (producto) => {
    setProductoEditando(producto)
    setModalFormulario(true)
  }

  const cerrarFormulario = () => {
    setModalFormulario(false)
    setProductoEditando(null)
  }

  const guardarProducto = async (datos) => {
    const editando = Boolean(productoEditando)
    const resultado = editando
      ? await onEditarProducto(productoEditando.id, datos)
      : await onCrearProducto(datos)

    if (resultado?.ok !== false) {
      setAviso({
        tipo: 'exito',
        texto: editando
          ? `Producto «${datos.nombre.trim()}» actualizado en la base de datos.`
          : `Producto «${datos.nombre.trim()}» creado en la base de datos.`,
      })
    }
    return resultado
  }

  const confirmarEliminar = async () => {
    if (!productoEliminar || eliminando) return
    setEliminando(true)
    const resultado = await onEliminarProducto(productoEliminar.id)
    setEliminando(false)
    setProductoEliminar(null)

    if (resultado?.ok === false) {
      setAviso({ tipo: 'error', texto: resultado.mensaje })
      return
    }
    setAviso({
      tipo: 'exito',
      texto: `Producto «${productoEliminar.nombre}» eliminado de la base de datos.`,
    })
  }

  const recargar = async () => {
    if (recargando) return
    setRecargando(true)
    const resultado = await onRecargarProductos()
    setRecargando(false)
    setAviso(
      resultado?.ok === false
        ? { tipo: 'error', texto: resultado.mensaje }
        : { tipo: 'exito', texto: 'Catálogo actualizado desde la base de datos.' },
    )
  }

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoDespacho}
      titulo="Catálogo de Productos"
      subtitulo="Alimentos, farmacia y accesorios para el cuidado de tu mascota"
      imagen={imgTarjetaImagenProductos}
      altImagen="Productos Veterinaria San Marcos"
      imagenGrande
    >
      <Seccion id="inicio" titulo="Categorías Principales">
        <p>Encuentra los mejores insumos de nutrición, medicamentos y accesorios seleccionados por nuestros veterinarios.</p>
        <p>¡Todo lo que tu perro o gato necesita en un solo lugar!</p>
      </Seccion>

      {esAdmin && (
        <Seccion id="admin-productos" titulo="Administración del catálogo">
          <BarraAdminProductos
            conexion={conexion}
            total={productos.length}
            recargando={recargando}
            onNuevo={abrirCrear}
            onRecargar={recargar}
          />
          {aviso && (
            <div
              className={`aviso-crud aviso-${aviso.tipo}`}
              role={aviso.tipo === 'error' ? 'alert' : 'status'}
            >
              <span>{aviso.texto}</span>
              <button type="button" className="aviso-cerrar" onClick={() => setAviso(null)} aria-label="Cerrar aviso">
                ×
              </button>
            </div>
          )}
        </Seccion>
      )}

      <Seccion id="album" titulo="Nuestros Productos Destacados">
        <h3>Selecciona un producto para ver más detalles</h3>
        <FiltrosProductos filtros={filtros} onCambio={manejarCambio} onLimpiar={() => setFiltros(FILTROS_VACIOS)} />
        <p className="contador-resultados">
          Mostrando {visibles.length} de {productos.length} productos
        </p>
        <GaleriaProductos
          productos={visibles}
          favoritos={favoritos}
          onFavorito={onFavorito}
          onAgregar={onAgregar}
          esAdmin={esAdmin}
          onEditar={abrirEditar}
          onEliminar={setProductoEliminar}
        />
      </Seccion>

      {esAdmin && (
        <>
          <ModalProducto
            abierto={modalFormulario}
            producto={productoEditando}
            tema={tema}
            onGuardar={guardarProducto}
            onCerrar={cerrarFormulario}
          />
          <ModalConfirmacion
            abierto={Boolean(productoEliminar)}
            tema={tema}
            titulo="Eliminar producto"
            mensaje={
              productoEliminar
                ? `¿Seguro que quieres eliminar «${productoEliminar.nombre}»? Esta acción borra el producto de la base de datos y no se puede deshacer.`
                : ''
            }
            procesando={eliminando}
            onConfirmar={confirmarEliminar}
            onCerrar={() => setProductoEliminar(null)}
          />
        </>
      )}
    </PlantillaPagina>
  )
}

export default Productos
