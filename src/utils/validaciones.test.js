import { describe, it, expect } from 'vitest'
import {
  validarNombreCompleto,
  validarRut,
  validarCorreo,
  validarPassword,
  validarTelefono,
  validarMicrochip,
  validarRegistro,
  validarProducto,
  validarCita,
} from './validaciones'

describe('Validaciones de formularios', () => {
  // PU-001
  it('rechaza un nombre de menos de 10 caracteres', () => {
    // Arrange
    const nombre = 'Juan'
    // Act
    const error = validarNombreCompleto(nombre)
    // Assert
    expect(error).not.toBe('')
  })

  // PU-002
  it('acepta un nombre completo válido con tildes', () => {
    const nombre = 'María González Pérez'
    const error = validarNombreCompleto(nombre)
    expect(error).toBe('')
  })

  // PU-003
  it('valida el formato del RUT (12345678-9) y rechaza otros', () => {
    const rutValido = '12345678-9'
    const rutInvalido = '12.345.678-9'

    const errorValido = validarRut(rutValido)
    const errorInvalido = validarRut(rutInvalido)

    expect(errorValido).toBe('')
    expect(errorInvalido).not.toBe('')
  })

  // PU-004
  it('solo acepta correos de gmail.com, outlook.com o duocuc.cl', () => {
    const permitido = 'ana@duocuc.cl'
    const noPermitido = 'ana@yahoo.com'

    const errorPermitido = validarCorreo(permitido)
    const errorNoPermitido = validarCorreo(noPermitido)

    expect(errorPermitido).toBe('')
    expect(errorNoPermitido).not.toBe('')
  })

  // PU-005
  it('exige contraseña con 8 caracteres, mayúscula, número y símbolo', () => {
    const debil = 'abc12345'
    const fuerte = 'Clave.1234'

    const errorDebil = validarPassword(debil)
    const errorFuerte = validarPassword(fuerte)

    expect(errorDebil).not.toBe('')
    expect(errorFuerte).toBe('')
  })

  // PU-006
  it('valida el teléfono con formato chileno +56 9 1234 5678', () => {
    const valido = '+56 9 1234 5678'
    const invalido = '12345'

    expect(validarTelefono(valido)).toBe('')
    expect(validarTelefono(invalido)).not.toBe('')
  })

  // PU-007
  it('el microchip es opcional, pero si se escribe debe tener 5 o más números', () => {
    const vacio = ''
    const conLetras = '12ab5'
    const correcto = '123456'

    expect(validarMicrochip(vacio)).toBe('')
    expect(validarMicrochip(conLetras)).not.toBe('')
    expect(validarMicrochip(correcto)).toBe('')
  })

  // PU-008
  it('validarRegistro devuelve un error por cada campo obligatorio vacío', () => {
    const datosVacios = {
      nombre: '', rut: '', email: '', password: '', telefono: '', nombreMascota: '',
      tipoMascota: '', raza: '', edad: '', peso: '', microchip: '', visitaAnterior: '',
    }

    const errores = validarRegistro(datosVacios)

    expect(Object.keys(errores)).toEqual(
      expect.arrayContaining(['nombre', 'rut', 'email', 'password', 'telefono', 'nombreMascota', 'tipoMascota', 'visitaAnterior']),
    )
    expect(errores.raza).toBeUndefined() // los campos opcionales vacíos no dan error
  })

  // PU-009
  it('validarProducto exige precio mayor a 0 y al menos una mascota', () => {
    const datos = { nombre: 'Collar para perro', descripcion: 'Collar resistente', precio: '0', stock: '5', categoria: 'accesorios', mascotas: [] }

    const errores = validarProducto(datos)

    expect(errores.precio).toBeDefined()
    expect(errores.mascotas).toBeDefined()
    expect(errores.nombre).toBeUndefined()
  })

  // PU-010
  it('validarCita rechaza una fecha anterior a hoy', () => {
    const hoy = new Date(2026, 9, 15)
    const datos = {
      nombre: 'María González Pérez', email: 'maria@gmail.com', telefono: '+56 9 1234 5678',
      nombreMascota: 'Rocky Boy', tipoMascota: 'perro', fecha: '2026-10-01',
    }

    const errores = validarCita(datos, hoy)

    expect(errores.fecha).toMatch(/anterior a hoy/)
  })
})
