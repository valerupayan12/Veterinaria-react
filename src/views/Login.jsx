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
    const datosAdmin = {
      nombre: ADMIN_USER.nombre,
      email: ADMIN_USER.email,
      password,
      telefono: ADMIN_USER.telefono,
    }

    try {
      const { data } = await AuthService.login({ email: ADMIN_USER.email, password })
      guardarToken(data.token)
    } catch {
      // Si el administrador aún no existe en la base de datos, se registra
      // y se vuelve a pedir el token. Sin backend, el panel sigue en modo local.
      try {
        const { data } = await AuthService.register(datosAdmin)
        guardarToken(data.token)
      } catch {
        // Modo local: el panel funciona con el estado en memoria.
      }
    }

    iniciar(ADMIN_USER)
    return true
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
