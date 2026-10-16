import imgDashboardadmin from '../assets/img/dashboardadmin.jpg'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductosAdmin from '../components/organisms/TablaProductosAdmin'

// Panel de Control (migrado desde admin.html). Ruta protegida: solo administrador.
// Aquí se crean y eliminan productos "en memoria" usando el estado de App.
function Admin({ layout, productos, onCrearProducto, onEliminarProducto }) {
  return (
    <PlantillaPagina
      layout={layout}
      topbar="BIENVENIDO ADMINISTRADOR"
      titulo="Dashboard Administración"
      subtitulo="Bienvenido al área de administración"
      imagen={imgDashboardadmin}
      altImagen="Logo Veterinaria San Marcos"
    >
      <Seccion id="nuevo-producto" titulo="Registrar nuevo producto">
        <FormularioProducto onCrear={onCrearProducto} />
      </Seccion>

      <Seccion id="catalogo-admin" titulo={`Productos del catálogo (${productos.length})`}>
        <TablaProductosAdmin productos={productos} onEliminar={onEliminarProducto} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Admin
