import { describe, it, expect, beforeEach } from 'vitest'
import { autenticar, registrarUsuario, guardarSesion, leerSesion, cerrarSesion } from './sesion'

describe('Sesión y autenticación (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // PU-021
  it('autentica al administrador con las credenciales estáticas', () => {
    const email = 'admin@duocuc.cl'
    const password = 'Admin.123'

    const usuario = autenticar(email, password)

    expect(usuario).not.toBeNull()
    expect(usuario.rol).toBe('admin')
  })

  // PU-022
  it('rechaza credenciales incorrectas', () => {
    const usuario = autenticar('admin@duocuc.cl', 'otraClave')

    expect(usuario).toBeNull()
  })

  // PU-023
  it('un usuario registrado puede iniciar sesión como cliente y no se duplican correos', () => {
    const datos = { nombre: 'María González Pérez', email: 'Maria@Gmail.com', password: 'Clave.1234' }

    const primerRegistro = registrarUsuario(datos)
    const segundoRegistro = registrarUsuario(datos)
    const usuario = autenticar('maria@gmail.com', 'Clave.1234')

    expect(primerRegistro).toBe(true)
    expect(segundoRegistro).toBe(false)
    expect(usuario.rol).toBe('cliente')
  })

  // PU-024
  it('guarda y borra la sesión en localStorage sin guardar la contraseña', () => {
    const usuario = { nombre: 'Ana', email: 'ana@gmail.com', password: 'Secreta.1', rol: 'cliente' }

    guardarSesion(usuario)
    const guardada = leerSesion()
    cerrarSesion()

    expect(guardada.email).toBe('ana@gmail.com')
    expect(guardada.password).toBeUndefined()
    expect(leerSesion()).toBeNull()
  })
})
