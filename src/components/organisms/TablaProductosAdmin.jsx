import Boton from '../atoms/Boton'
import Precio from '../atoms/Precio'

// Organismo: tabla de productos del Panel de Control con botón para eliminar.
// El contenedor con scroll horizontal la hace usable en celulares.
function TablaProductosAdmin({ productos, onEliminar }) {
  return (
    <div className="tabla-responsive">
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td><img src={p.imagen} alt={p.nombre} /></td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td><Precio valor={p.precio} /></td>
              <td>{p.stock}</td>
              <td>
                <Boton variante="secundario" onClick={() => onEliminar(p.id)} aria-label={`Eliminar ${p.nombre}`}>
                  Eliminar
                </Boton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaProductosAdmin
