import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RutaPrivada from './RutaPrivada'

function dibujar(soloAdmin = false) {
  return render(
    <MemoryRouter initialEntries={['/protegida']}>
      <Routes>
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route path="/perfil" element={<p>Pantalla de perfil</p>} />
        <Route
          path="/protegida"
          element={
            <RutaPrivada soloAdmin={soloAdmin}>
              <p>Contenido protegido</p>
            </RutaPrivada>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RutaPrivada', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // PU-033
  it('sin sesión en localStorage redirige al login', () => {
    dibujar()

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })

  // PU-034
  it('con sesión iniciada muestra el contenido protegido', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Ana', rol: 'cliente' }))

    dibujar()

    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  // PU-035
  it('un cliente no puede entrar a una ruta solo para administrador', () => {
    localStorage.setItem('sesion', JSON.stringify({ nombre: 'Ana', rol: 'cliente' }))

    dibujar(true)

    expect(screen.getByText('Pantalla de perfil')).toBeInTheDocument()
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument()
  })
})
