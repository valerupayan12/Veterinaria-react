import { describe, it, expect } from 'vitest'
import { filtrarProductos, crearProducto, siguienteId } from './productos'
import { productos as productosIniciales, IMAGEN_POR_DEFECTO } from '../data/productos'

describe('Filtrado y creación de productos', () => {
  // PU-018
  it('filtra el catálogo por tipo de mascota y categoría a la vez', () => {
    const filtros = { texto: '', categoria: 'alimento', mascota: 'conejo' }

    const resultado = filtrarProductos(productosIniciales, filtros)

    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.every((p) => p.categoria === 'alimento' && p.mascotas.includes('conejo'))).toBe(true)
  })

  // PU-019
  it('la búsqueda por texto ignora mayúsculas y minúsculas', () => {
    const filtros = { texto: 'JAULA' }

    const resultado = filtrarProductos(productosIniciales, filtros)

    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.every((p) => p.nombre.toLowerCase().includes('jaula') || p.descripcion.toLowerCase().includes('jaula'))).toBe(true)
  })

  // PU-020
  it('crearProducto asigna un id nuevo y la imagen genérica por defecto', () => {
    const datos = {
      nombre: ' Collar para perro ', descripcion: 'Collar resistente', precio: '9990', stock: '10',
      categoria: 'accesorios', mascotas: ['perro'], requiereReceta: false,
    }

    const producto = crearProducto(datos, productosIniciales)

    expect(producto.id).toBe(siguienteId(productosIniciales))
    expect(producto.id).toBe(24)
    expect(producto.imagen).toBe(IMAGEN_POR_DEFECTO)
    expect(producto.precio).toBe(9990)
    expect(producto.nombre).toBe('Collar para perro')
  })
})
