// ============================================================
// Manejo de sesión y usuarios con localStorage.
//   "sesion"   -> usuario que inició sesión (sin contraseña)
//   "usuarios" -> usuarios registrados desde la página Registro
// ============================================================
import { ADMIN_USER } from '../data/credenciales'

const CLAVE_SESION = 'sesion'
const CLAVE_USUARIOS = 'usuarios'

export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function guardarSesion(usuario) {
  // nunca se guarda la contraseña dentro de la sesión
  const { password, ...sinPassword } = usuario // eslint-disable-line no-unused-vars
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sinPassword))
  return sinPassword
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}

export function leerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || []
  } catch {
    return []
  }
}

// Registra un usuario nuevo con rol "cliente". Devuelve false si el correo ya existe.
export function registrarUsuario(datos) {
  const usuarios = leerUsuarios()
  const correo = datos.email.trim().toLowerCase()
  if (correo === ADMIN_USER.email || usuarios.some((u) => u.email === correo)) return false
  usuarios.push({ ...datos, email: correo, rol: 'cliente' })
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  return true
}

// Valida credenciales: primero el admin estático y luego los usuarios registrados.
// Devuelve el usuario (con su rol) o null si las credenciales no coinciden.
export function autenticar(email, password) {
  const correo = email.trim().toLowerCase()
  const clave = password.trim()
  if (correo === ADMIN_USER.email && clave === ADMIN_USER.password) return ADMIN_USER
  return leerUsuarios().find((u) => u.email === correo && u.password === clave) || null
}

export function leerTema() {
  return localStorage.getItem('tema') === 'oscuro' ? 'oscuro' : 'claro'
}

export function guardarTema(tema) {
  localStorage.setItem('tema', tema)
}
