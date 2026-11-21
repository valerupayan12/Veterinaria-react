import { useState } from 'react'
import Boton from '../atoms/Boton'
import EnlaceBoton from '../atoms/EnlaceBoton'
import Precio from '../atoms/Precio'
import ModalConfirmacion from '../molecules/ModalConfirmacion'

// Organismo: tabla de productos del Panel de Control con acciones para editar y eliminar.
// El contenedor con scroll horizontal la hace usable en celulares.
function TablaProductosAdmin({ productos, onEliminar, tema = 'claro' }) {
  const [productoEliminar, setProductoEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [error, setError] = useState('')

  const confirmarEliminar = async () => {
    if (!productoEliminar || eliminando) return
    setEliminando(true)
    const resultado = await onEliminar(productoEliminar.id)
    setEliminando(false)
    setProductoEliminar(null)
    setError(resultado?.ok === false ? resultado.mensaje : '')
  }

  return (
    <>
      {error && (
        <div className="aviso-crud aviso-error" role="alert">
          <span>{error}</span>
          <button type="button" className="aviso-cerrar" onClick={() => setError('')} aria-label="Cerrar aviso">
            ×
          </button>
        </div>
      )}

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
                  <EnlaceBoton variante="secundario" to={`/admin/productos/editar/${p.id}`} aria-label={`Editar ${p.nombre}`}>
                    Editar
                  </EnlaceBoton>{' '}
                  <Boton variante="peligro" onClick={() => setProductoEliminar(p)} aria-label={`Eliminar ${p.nombre}`}>
                    Eliminar
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalConfirmacion
        abierto={Boolean(productoEliminar)}
        tema={tema}
        titulo="Eliminar producto"
        mensaje={
          productoEliminar
            ? `¿Seguro que quieres eliminar «${productoEliminar.nombre}»? Esta acción borra el producto de la base de datos y no se puede deshacer.`
            : ''
        }
        procesando={eliminando}
        onConfirmar={confirmarEliminar}
        onCerrar={() => setProductoEliminar(null)}
      />
    </>
  )
}

export default TablaProductosAdmin
