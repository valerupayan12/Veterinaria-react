import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import AuthService from '../services/AuthService'
import { guardarPerfilLocal } from '../utils/sesion'
import { mensajeDeError } from '../utils/mapeo'
import { SITIO } from '../data/sitio'

// Registro de usuario y mascota contra /auth/register.
function Registro({ layout }) {
  // Devuelve '' si se registró bien, o el mensaje de error.
  const registrar = async (datos) => {
    const correo = datos.email.trim().toLowerCase()

    try {
      await AuthService.register({
        nombre: datos.nombre.trim(),
        email: correo,
        password: datos.password,
        telefono: datos.telefono,
        mascota: {
          nombre: datos.nombreMascota.trim(),
          especie: datos.tipoMascota,
          raza: datos.raza.trim(),
          edad: Number(datos.edad) || 0,
        },
      })

      // El backend actual no modela rut, peso, microchip, servicios ni observaciones:
      // esos datos quedan en el perfil local para mostrarlos en "Mi Perfil".
      guardarPerfilLocal({ ...datos, email: correo, rol: 'cliente' })

      return ''
    } catch (error) {
      return mensajeDeError(
        error,
        'No se pudo conectar con el backend en http://localhost:8081. Verifica que esté en ejecución.',
      )
    }
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
