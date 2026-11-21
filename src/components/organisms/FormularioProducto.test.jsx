import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
  it('con datos válidos llama a onCrear y muestra la confirmación', async () => {
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
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Collar antipulgas perro')
    })
  })

  // PU-043
  it('en modo edición carga los datos y guarda los cambios', async () => {
    const onCrear = vi.fn().mockResolvedValue({ ok: true })
    render(
      <FormularioProducto
        onCrear={onCrear}
        valorInicial={{
          id: 7,
          nombre: 'Collar antipulgas perro',
          descripcion: 'Protección por 8 meses',
          precio: 9990,
          stock: 20,
          categoria: 'farmacia',
          mascotas: ['perro'],
          requiereReceta: false,
        }}
      />,
    )

    expect(screen.getByLabelText('Nombre del producto')).toHaveValue('Collar antipulgas perro')
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '10990' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => expect(onCrear).toHaveBeenCalledTimes(1))
    expect(onCrear.mock.calls[0][0].precio).toBe('10990')
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('actualizado')
    })
  })
})
