import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioCita from '../components/organisms/FormularioCita'
import { SITIO } from '../data/sitio'

// Agendar cita médica (migrado desde agendarCitaMedico.html).
function AgendarCita({ layout }) {
  return (
    <PlantillaPagina
      layout={layout}
      topbar="Agenda tu atención veterinaria"
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion titulo="Agendar cita médica">
        <p>Completa los datos para solicitar una hora de atención para tu mascota.</p>
        <FormularioCita />
      </Seccion>
    </PlantillaPagina>
  )
}

export default AgendarCita
