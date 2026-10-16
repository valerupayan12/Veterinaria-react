import { useNavigate } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'
import { autenticar } from '../utils/sesion'

// Inicio de sesión (migrado desde login.html). Valida credenciales estáticas y guarda la sesión en localStorage.
function Login({ onLogin }) {
  const navigate = useNavigate()

  const ingresar = ({ email, password }) => {
    const usuario = autenticar(email, password)
    if (!usuario) return false

    onLogin(usuario)
    navigate(usuario.rol === 'admin' ? '/admin' : '/perfil')
    return true
  }

  return (
    <div className="pagina-login">
      <FormularioLogin onIngresar={ingresar} />
    </div>
  )
}

export default Login
