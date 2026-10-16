import { Navigate } from 'react-router-dom'
import { leerSesion } from '../utils/sesion'

// Protege una página: si no hay sesión guardada en localStorage, redirige al login.
// Con "soloAdmin" además exige que el usuario tenga rol de administrador.
function RutaPrivada({ soloAdmin = false, children }) {
  const sesion = leerSesion()

  if (!sesion) return <Navigate to="/login" replace />
  if (soloAdmin && sesion.rol !== 'admin') return <Navigate to="/perfil" replace />

  return children
}

export default RutaPrivada
