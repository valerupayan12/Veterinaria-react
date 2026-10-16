import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import EnlaceBoton from '../components/atoms/EnlaceBoton'
import { SITIO } from '../data/sitio'

// Página 404: se muestra cuando la ruta no existe.
function Error404({ layout }) {
  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoUrgencias}
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion titulo="Error 404 - Página no encontrada">
        <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
        <EnlaceBoton to="/">Volver al inicio</EnlaceBoton>
      </Seccion>
    </PlantillaPagina>
  )
}

export default Error404
