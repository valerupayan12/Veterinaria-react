import { useState } from 'react'
import imgDashboardadmin from '../assets/img/dashboardadmin.jpg'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductosAdmin from '../components/organisms/TablaProductosAdmin'
import BarraAdminProductos from '../components/organisms/BarraAdminProductos'

// Panel de Control (migrado desde admin.html). Ruta protegida: solo administrador.
// Aquí se crean, editan y eliminan productos usando el estado de App (backend + respaldo local).
function Admin({
  layout,
  productos,
  conexion = {},
  onCrearProducto,
  onEliminarProducto,
  onRecargarProductos,
}) {
  const [recargando, setRecargando] = useState(false)
  const [aviso, setAviso] = useState(null)

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
      topbar="BIENVENIDO ADMINISTRADOR"
      titulo="Dashboard Administración"
      subtitulo="Bienvenido al área de administración"
      imagen={imgDashboardadmin}
      altImagen="Logo Veterinaria San Marcos"
    >
      <Seccion id="estado-backend" titulo="Conexión con el backend">
        <BarraAdminProductos
          conexion={conexion}
          total={productos.length}
          mostrarNuevo={false}
          recargando={recargando}
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

      <Seccion id="nuevo-producto" titulo="Registrar nuevo producto">
        <FormularioProducto onCrear={onCrearProducto} />
      </Seccion>

      <Seccion id="catalogo-admin" titulo={`Productos del catálogo (${productos.length})`}>
        <TablaProductosAdmin
          productos={productos}
          tema={layout?.tema}
          onEliminar={onEliminarProducto}
        />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Admin
