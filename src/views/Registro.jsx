import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import { registrarUsuario } from '../utils/sesion'
import { SITIO } from '../data/sitio'

// Registro de usuario y mascota (migrado desde registro.html).
function Registro({ layout }) {
  // Devuelve '' si se registró bien, o el mensaje de error.
  const registrar = (datos) => {
    const guardado = registrarUsuario(datos)
    return guardado ? '' : 'Ese correo ya está registrado. Intenta iniciar sesión.'
  }

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoUrgencias}
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <Seccion id="registro" titulo="Registro de Mascota">
        <p>
          Completa el formulario con los datos de tu mascota y la información de contacto. Esto nos ayudará a
          brindar mejor atención personalizada.
        </p>
        <FormularioRegistro onRegistrar={registrar} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Registro
