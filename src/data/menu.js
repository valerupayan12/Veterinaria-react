// Items del menú principal (visitante sin sesión). Igual que en el proyecto base: un arreglo en /data.
export const itemsMenu = [
  { ruta: '/', etiqueta: 'Inicio' },
  { ruta: '/productos', etiqueta: 'Productos' },
  { ruta: '/carrito', etiqueta: 'Carrito' },
  { ruta: '/registro', etiqueta: 'Registro' },
  { ruta: '/login', etiqueta: 'Login' },
]

// Adapta el menú según la sesión y muestra la cantidad de productos en el carrito.
export function construirMenu(usuario, cantidadCarrito = 0) {
  const carrito = { ruta: '/carrito', etiqueta: cantidadCarrito > 0 ? `Carrito (${cantidadCarrito})` : 'Carrito' }

  if (!usuario) {
    return itemsMenu.map((item) => (item.ruta === '/carrito' ? carrito : item))
  }

  const items = [
    { ruta: '/', etiqueta: 'Inicio' },
    { ruta: '/productos', etiqueta: 'Productos' },
    carrito,
    { ruta: '/perfil', etiqueta: 'Mi Perfil' },
  ]
  if (usuario.rol === 'admin') items.push({ ruta: '/admin', etiqueta: 'Panel de Control' })
  items.push({ accion: 'cerrar-sesion', etiqueta: 'Cerrar sesión' })
  return items
}
