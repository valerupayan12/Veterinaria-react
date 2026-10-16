import { describe, it, expect } from 'vitest'
import {
  agregarAlCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  detalleCarrito,
  calcularSubtotal,
  calcularDespacho,
  contarUnidades,
  ENVIO_GRATIS_DESDE,
  COSTO_DESPACHO,
} from './carrito'

const productoA = { id: 1, nombre: 'Alimento', precio: 10000, stock: 3 }
const productoB = { id: 2, nombre: 'Juguete', precio: 5000, stock: 10 }

describe('Lógica del carrito', () => {
  // PU-011
  it('agrega un producto nuevo con cantidad 1', () => {
    const carrito = []

    const resultado = agregarAlCarrito(carrito, productoA)

    expect(resultado).toEqual([{ id: 1, cantidad: 1 }])
  })

  // PU-012
  it('si el producto ya está en el carrito, suma una unidad', () => {
    const carrito = [{ id: 1, cantidad: 1 }]

    const resultado = agregarAlCarrito(carrito, productoA)

    expect(resultado[0].cantidad).toBe(2)
  })

  // PU-013
  it('no permite superar el stock disponible', () => {
    const carrito = [{ id: 1, cantidad: 3 }] // stock = 3

    const resultado = agregarAlCarrito(carrito, productoA)

    expect(resultado[0].cantidad).toBe(3)
  })

  // PU-014
  it('al bajar la cantidad a 0 el producto se elimina del carrito', () => {
    const carrito = [{ id: 1, cantidad: 1 }]

    const resultado = cambiarCantidad(carrito, productoA, -1)

    expect(resultado).toHaveLength(0)
  })

  // PU-015
  it('calcula el subtotal sumando precio x cantidad', () => {
    const carrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }]
    const items = detalleCarrito(carrito, [productoA, productoB])

    const subtotal = calcularSubtotal(items)

    expect(subtotal).toBe(25000) // 2 x 10.000 + 1 x 5.000
  })

  // PU-016
  it('el despacho es gratis desde $20.000 y tiene costo bajo ese monto', () => {
    const compraGrande = ENVIO_GRATIS_DESDE
    const compraChica = ENVIO_GRATIS_DESDE - 1

    expect(calcularDespacho(compraGrande)).toBe(0)
    expect(calcularDespacho(compraChica)).toBe(COSTO_DESPACHO)
    expect(calcularDespacho(compraChica, 'retiro')).toBe(0)
  })

  // PU-017
  it('quitarDelCarrito elimina solo el producto indicado y contarUnidades suma todo', () => {
    const carrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }]

    const resultado = quitarDelCarrito(carrito, 1)

    expect(resultado).toEqual([{ id: 2, cantidad: 3 }])
    expect(contarUnidades(carrito)).toBe(5)
  })
})
