import { NavLink } from 'react-router-dom'

// Átomo: enlace del menú principal. NavLink agrega la clase "active" a la página actual.
function EnlaceMenu({ to, children, onClick }) {
  return (
    <NavLink to={to} end onClick={onClick}>
      {children}
    </NavLink>
  )
}

export default EnlaceMenu
