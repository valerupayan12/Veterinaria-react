import { useParams } from 'react-router-dom'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import DetalleItem from '../components/organisms/DetalleItem'
import EnlaceBoton from '../components/atoms/EnlaceBoton'
import Error404 from './Error404'
import { servicios } from '../data/servicios'
import { SITIO } from '../data/sitio'

// Detalle de un servicio (ruta /servicio/:id). Migrado desde consultaMedicoGeneral.html y vacunacion.html.
function Servicio({ layout }) {
  const { id } = useParams()
  const servicio = servicios.find((s) => s.id === id)

  if (!servicio) return <Error404 layout={layout} />

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoDespacho}
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <DetalleItem
        nombre={servicio.nombre}
        imagen={servicio.imagen}
        precio={servicio.precio}
        insignia={servicio.insignia}
        detalle={servicio.detalle}
        beneficios={servicio.beneficios}
        info={servicio.info}
      >
        <EnlaceBoton to="/agendar-cita" variante="primario">
          Reservar cita
        </EnlaceBoton>
      </DetalleItem>
    </PlantillaPagina>
  )
}

export default Servicio
