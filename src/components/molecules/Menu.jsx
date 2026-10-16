import EnlaceMenu from '../atoms/EnlaceMenu'

// Molécula: lista de enlaces del menú. Cada item puede ser un enlace ({ruta, etiqueta})
// o una acción ({accion: 'cerrar-sesion', etiqueta}).
function Menu({ items, abierto, onNavegar, onCerrarSesion }) {
  return (
    <nav id="menu-principal" className={abierto ? 'menu-abierto' : ''}>
      <ul>
        {items.map((item) => (
          <li key={item.etiqueta}>
            {item.ruta ? (
              <EnlaceMenu to={item.ruta} onClick={onNavegar}>
                {item.etiqueta}
              </EnlaceMenu>
            ) : (
              <button type="button" onClick={onCerrarSesion}>
                {item.etiqueta}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
