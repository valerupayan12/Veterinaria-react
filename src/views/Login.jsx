import { useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'
import AuthService from '../services/AuthService'
import UsuarioService from '../services/UsuarioService'
import { ADMIN_USER } from '../data/credenciales'
import { guardarToken, leerPerfilLocal } from '../utils/sesion'
import { usuarioDesdeApi } from '../utils/mapeo'

// Inicio de sesión contra el backend (JWT). El administrador del sitio sigue
// siendo estático, pero se asegura en el backend para obtener un token válido.
function Login({ onLogin }) {
  const navigate = useNavigate()

  const iniciar = (usuario) => {
    onLogin(usuario)
    navigate(usuario.rol === 'admin' ? '/admin' : '/perfil')
  }

  async function cargarPerfil(correo) {
    const local = leerPerfilLocal(correo) || {}
    try {
      const { data } = await UsuarioService.getPerfil()
      if (data) return usuarioDesdeApi(data, local)
    } catch {
      // Si /api/usuarios/perfil falla se usa el perfil guardado en localStorage.
    }
    return usuarioDesdeApi({ email: correo }, local)
  }

  async function ingresarAdmin(password) {
    try {
      const { data } = await AuthService.login({ email: ADMIN_USER.email, password })
      guardarToken(data.token)
      iniciar(ADMIN_USER)
      return true
    } catch (error) {
      // Credenciales rechazadas por el backend: no se permite el acceso local.
      if (error?.response) return false

      // Backend apagado: se permite entrar al panel en modo local, pero sin token.
      // Las acciones del CRUD mostrarán un error claro porque no llegan a la BD.
      iniciar(ADMIN_USER)
      return true
    }
  }

  const ingresar = async ({ email, password }) => {
    const correo = email.trim().toLowerCase()

    if (correo === ADMIN_USER.email && password === ADMIN_USER.password) {
      return ingresarAdmin(password)
    }

    try {
      const { data } = await AuthService.login({ email: correo, password })
      guardarToken(data.token)
      iniciar(await cargarPerfil(correo))
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="pagina-login">
      <FormularioLogin onIngresar={ingresar} />
    </div>
  )
}

export default Login
