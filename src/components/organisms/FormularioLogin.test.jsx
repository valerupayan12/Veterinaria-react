import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import FormularioLogin from './FormularioLogin'

function dibujar(onIngresar) {
  return render(
    <MemoryRouter>
      <FormularioLogin onIngresar={onIngresar} />
    </MemoryRouter>,
  )
}

describe('FormularioLogin', () => {
  // PU-029
  it('con los campos vacíos muestra errores y no intenta ingresar', () => {
    const onIngresar = vi.fn()
    dibujar(onIngresar)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(screen.getByText('Ingresa tu correo.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument()
    expect(onIngresar).not.toHaveBeenCalled()
  })

  // PU-030
  it('con credenciales incorrectas muestra el mensaje de error', () => {
    const onIngresar = vi.fn().mockReturnValue(false)
    dibujar(onIngresar)

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'otro@gmail.com' } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'mala' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(onIngresar).toHaveBeenCalledWith({ email: 'otro@gmail.com', password: 'mala' })
    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos')
  })
})
