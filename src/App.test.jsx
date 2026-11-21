import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

function dibujar(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App (integración de estado y rutas)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // PU-036
  it('alterna el tema claro/oscuro al presionar el botón', () => {
    const { container } = dibujar('/')
    expect(container.querySelector('.app')).toHaveAttribute('data-tema', 'claro')

    fireEvent.click(screen.getByRole('button', { name: /Cambiar tema/ }))

    expect(container.querySelector('.app')).toHaveAttribute('data-tema', 'oscuro')
    expect(localStorage.getItem('tema')).toBe('oscuro')
  })

  // PU-037
  it('agregar productos al carrito actualiza el contador del menú', () => {
    dibujar('/productos')
    const menu = screen.getByRole('navigation')
    expect(within(menu).getByText('Carrito')).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Agregar al carrito' })[0])
    fireEvent.click(screen.getAllByRole('button', { name: 'Agregar al carrito' })[1])

    expect(within(menu).getByText('Carrito (2)')).toBeInTheDocument()
  })

  // PU-038
  it('el filtro de mascota reduce la cantidad de productos mostrados', () => {
    dibujar('/productos')
    expect(screen.getByText(/Mostrando 23 de 23/)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Mascota'), { target: { value: 'pajaro' } })

    expect(screen.getByText(/Mostrando 5 de 23/)).toBeInTheDocument()
  })

  // PU-039
  it('una ruta inexistente muestra la página de error 404', () => {
    dibujar('/esta-ruta-no-existe')

    expect(screen.getByText('Error 404 - Página no encontrada')).toBeInTheDocument()
  })

  // PU-040
  it('un producto inexistente en /producto/:id muestra el error 404', () => {
    dibujar('/producto/9999')

    expect(screen.getByText('Error 404 - Página no encontrada')).toBeInTheDocument()
  })

  // PU-041
  it('sin sesión, /admin redirige al login', () => {
    dibujar('/admin')

    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument()
  })

  // PU-042
  it('con sesión de administrador, /admin muestra el Panel de Control', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Administrador San Marcos', email: 'admin@duocuc.cl', rol: 'admin' }))

    dibujar('/admin')

    expect(screen.getByText('Registrar nuevo producto')).toBeInTheDocument()
  })

  it('sin sesión de administrador, /productos no muestra las acciones del CRUD', () => {
    dibujar('/productos')

    expect(screen.queryByRole('button', { name: 'Crear producto' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Editar / })).not.toBeInTheDocument()
  })

  it('con sesión de administrador, /productos muestra crear, editar y eliminar', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Administrador San Marcos', email: 'admin@duocuc.cl', rol: 'admin' }))

    dibujar('/productos')

    expect(screen.getByRole('button', { name: 'Crear producto' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Editar Alimento Premium Perro Adulto 15kg' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Eliminar Alimento Premium Perro Adulto 15kg' })).toBeInTheDocument()
  })
})
