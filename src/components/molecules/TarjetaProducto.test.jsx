import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import TarjetaProducto from './TarjetaProducto'

const productoMock = {
  id: 7,
  nombre: 'Alimento Especializado para Conejos',
  descripcion: 'Mix de heno y pellets.',
  precio: 12990,
  imagen: '/img/conejo.jpg',
  stock: 5,
}

function dibujar(props) {
  return render(
    <MemoryRouter>
      <TarjetaProducto producto={productoMock} esFavorito={false} onFavorito={() => {}} onAgregar={() => {}} {...props} />
    </MemoryRouter>,
  )
}

describe('TarjetaProducto', () => {
  // PU-025
  it('muestra nombre, precio formateado y enlace al detalle', () => {
    dibujar()

    expect(screen.getByText('Alimento Especializado para Conejos')).toBeInTheDocument()
    expect(screen.getByText('$12.990')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver Detalle' })).toHaveAttribute('href', '/producto/7')
  })

  // PU-026
  it('al presionar "Agregar al carrito" llama a onAgregar con el producto', () => {
    const onAgregar = vi.fn()
    dibujar({ onAgregar })

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    expect(onAgregar).toHaveBeenCalledWith(productoMock)
  })

  // PU-027
  it('al presionar el corazón llama a onFavorito con el id del producto', () => {
    const onFavorito = vi.fn()
    dibujar({ onFavorito })

    fireEvent.click(screen.getByRole('button', { name: /Agregar a favoritos/ }))

    expect(onFavorito).toHaveBeenCalledWith(7)
  })

  // PU-028
  it('cuando no hay stock el botón de carrito queda deshabilitado', () => {
    dibujar({ producto: { ...productoMock, stock: 0 } })

    const boton = screen.getByRole('button', { name: 'Sin stock' })

    expect(boton).toBeDisabled()
  })
})
