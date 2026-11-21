// ============================================================
// Manejo de sesión y usuarios con localStorage.
//   "sesion"   -> usuario que inició sesión (sin contraseña)
//   "usuarios" -> usuarios registrados desde la página Registro (modo local histórico)
//   "token"    -> JWT devuelto por /auth/login (se envía en cada petición)
//   "perfiles" -> datos extra del perfil que el backend todavía no guarda
// ============================================================
import { ADMIN_USER } from '../data/credenciales'

const CLAVE_SESION = 'sesion'
const CLAVE_USUARIOS = 'usuarios'
const CLAVE_TOKEN = 'token'
const CLAVE_PERFILES = 'perfiles'

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
  localStorage.removeItem(CLAVE_TOKEN)
}

// ----- JWT -----
export function guardarToken(token) {
  localStorage.setItem(CLAVE_TOKEN, token)
  return token
}

export function leerToken() {
  return localStorage.getItem(CLAVE_TOKEN)
}

export function borrarToken() {
  localStorage.removeItem(CLAVE_TOKEN)
}

// ----- Perfil local (campos que el backend aún no modela) -----
function leerPerfiles() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PERFILES)) || []
  } catch {
    return []
  }
}

export function guardarPerfilLocal(datos) {
  const email = datos.email.trim().toLowerCase()
  const { password, ...sinPassword } = datos // eslint-disable-line no-unused-vars
  const perfil = { ...sinPassword, email }
  const perfiles = leerPerfiles().filter((p) => p.email !== email)
  localStorage.setItem(CLAVE_PERFILES, JSON.stringify([...perfiles, perfil]))
  return perfil
}

export function leerPerfilLocal(email) {
  return leerPerfiles().find((p) => p.email === email.trim().toLowerCase()) || null
}

// ----- Registro local histórico (se conserva para las pruebas unitarias) -----
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

// Valida credenciales locales: primero el admin estático y luego los usuarios registrados.
// El inicio de sesión real ahora lo hace AuthService contra /auth/login.
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
