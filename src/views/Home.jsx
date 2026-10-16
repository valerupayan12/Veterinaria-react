import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import VideoPromocional from '../components/organisms/VideoPromocional'
import GaleriaInicio from '../components/organisms/GaleriaInicio'
import { tarjetasInicio } from '../data/servicios'
import { SITIO } from '../data/sitio'

// Página de inicio (migrada desde index.html).
function Home({ layout }) {
  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoUrgencias}
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion id="inicio" titulo="Bienvenidos a Veterinaria San Marcos">
        <p>Ofrecemos la mejor atención médica, vacunas y estética para tus mascotas en San Marcos.</p>
        <p>¡Tu tranquilidad y la salud de tu compañero son nuestra prioridad!</p>
        <VideoPromocional />
      </Seccion>

      <Seccion id="album" titulo="¡Revisa Nuestros Servicios Destacados!">
        <h3>Conoce lo mejor para el bienestar de tu mascota</h3>
        <GaleriaInicio tarjetas={tarjetasInicio} />
      </Seccion>

      <Seccion titulo="Sobre nuestra clínica">
        <p>Atendemos principalmente perros y gatos, además de conejos y aves.</p>
        <p>
          Ofrecemos consulta general, vacunación, cirugía menor, desparasitación, control de peso, peluquería,
          urgencias y una variedad de productos para el cuidado de tus mascotas.
        </p>
      </Seccion>
    </PlantillaPagina>
  )
}

export default Home
