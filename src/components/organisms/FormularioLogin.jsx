import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { validarLogin } from '../../utils/validaciones'

// Organismo: formulario de inicio de sesión (mantiene el diseño del login original).
// "onIngresar" recibe {email, password} y devuelve true si las credenciales son correctas.
function FormularioLogin({ onIngresar }) {
  const [datos, setDatos] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
    setErrorGeneral('')
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const nuevosErrores = validarLogin(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const correcto = onIngresar(datos)
    if (!correcto) setErrorGeneral('Correo o contraseña incorrectos')
  }

  return (
    <Form name="formulario-login" id="login" onSubmit={manejarEnvio} noValidate>
      <div className="form-login">
        <h1>Inicio de sesión</h1>
        <p>Ingrese sus datos:</p>

        <Form.Group className="email-box" controlId="email">
          <Form.Label visuallyHidden>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
            value={datos.email}
            onChange={manejarCambio}
            isInvalid={Boolean(errores.email)}
          />
          <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="password-box" controlId="password">
          <Form.Label visuallyHidden>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={datos.password}
            onChange={manejarCambio}
            isInvalid={Boolean(errores.password)}
          />
          <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        {errorGeneral && (
          <p role="alert" className="error-login">
            {errorGeneral}
          </p>
        )}

        <button className="entrar-btn" type="submit">
          Entrar
        </button>
        <Link to="/registro" className="registrar-btn">
          Registrarse
        </Link>
        <Link to="/" className="volver-btn">
          Volver
        </Link>
      </div>
    </Form>
  )
}

export default FormularioLogin
