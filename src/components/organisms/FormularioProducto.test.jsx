import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormularioProducto from './FormularioProducto'

describe('FormularioProducto (Panel de Control)', () => {
  // PU-031
  it('no crea el producto si faltan datos y muestra los errores', () => {
    const onCrear = vi.fn()
    render(<FormularioProducto onCrear={onCrear} />)

    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(onCrear).not.toHaveBeenCalled()
    expect(screen.getByText('Selecciona una categoría.')).toBeInTheDocument()
    expect(screen.getByText('Selecciona al menos un tipo de mascota.')).toBeInTheDocument()
  })

  // PU-032
  it('con datos válidos llama a onCrear y muestra la confirmación', () => {
    const onCrear = vi.fn()
    render(<FormularioProducto onCrear={onCrear} />)

    fireEvent.change(screen.getByLabelText('Nombre del producto'), { target: { value: 'Collar antipulgas perro' } })
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'farmacia' } })
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '9990' } })
    fireEvent.change(screen.getByLabelText('Stock disponible'), { target: { value: '20' } })
    fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Protección por 8 meses' } })
    fireEvent.click(screen.getByLabelText('Perro'))
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }))

    expect(onCrear).toHaveBeenCalledTimes(1)
    expect(onCrear.mock.calls[0][0].nombre).toBe('Collar antipulgas perro')
    expect(onCrear.mock.calls[0][0].mascotas).toEqual(['perro'])
    expect(screen.getByRole('status')).toHaveTextContent('Collar antipulgas perro')
  })
})
