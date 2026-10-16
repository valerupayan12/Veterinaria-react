import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import DatosPerfil from '../components/organisms/DatosPerfil'
import ListaFavoritos from '../components/organisms/ListaFavoritos'
import Boton from '../components/atoms/Boton'
import { SITIO } from '../data/sitio'

// Mi Perfil: datos del usuario con sesión iniciada y sus productos favoritos. Ruta protegida.
function Perfil({ layout, productos, favoritos, onFavorito }) {
  const productosFavoritos = productos.filter((p) => favoritos.includes(p.id))

  return (
    <PlantillaPagina
      layout={layout}
      topbar="Mi cuenta"
      titulo="Mi Perfil"
      subtitulo="Tus datos y productos favoritos"
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion id="datos" titulo="Datos del usuario">
        <DatosPerfil usuario={layout.usuario} />
        <Boton onClick={layout.onCerrarSesion}>Cerrar sesión</Boton>
      </Seccion>

      <Seccion id="favoritos" titulo={`Mis favoritos (${productosFavoritos.length})`}>
        <ListaFavoritos productos={productosFavoritos} onQuitar={onFavorito} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Perfil
