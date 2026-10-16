import { Link } from 'react-router-dom'
import Boton from '../atoms/Boton'
import Precio from '../atoms/Precio'

// Organismo: lista de productos marcados como favoritos (se muestra en Mi Perfil).
function ListaFavoritos({ productos, onQuitar }) {
  if (productos.length === 0) {
    return <p className="mensaje-vacio">Aún no tienes productos favoritos. Márcalos con 🤍 en el catálogo.</p>
  }

  return (
    <ul className="lista-favoritos">
      {productos.map((p) => (
        <li key={p.id}>
          <img src={p.imagen} alt={p.nombre} />
          <Link to={`/producto/${p.id}`}>{p.nombre}</Link>
          <Precio valor={p.precio} />
          <Boton variante="secundario" onClick={() => onQuitar(p.id)}>Quitar</Boton>
        </li>
      ))}
    </ul>
  )
}

export default ListaFavoritos
