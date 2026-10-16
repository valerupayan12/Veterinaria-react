import { Link } from 'react-router-dom'

// Átomo: enlace de react-router que se ve como botón.
// (Se usa <Link> y no <a href> para que la página no se recargue y no se pierda el estado.)
function EnlaceBoton({ to, variante = 'base', children, ...resto }) {
  const clase = variante === 'base' ? 'boton-enlace' : `btn-${variante}`
  return (
    <Link to={to} className={clase} {...resto}>
      {children}
    </Link>
  )
}

export default EnlaceBoton
