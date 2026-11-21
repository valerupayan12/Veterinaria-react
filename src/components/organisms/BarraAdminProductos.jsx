import Boton from '../atoms/Boton'
import EstadoBackend from '../atoms/EstadoBackend'

// Organismo: barra de administración del catálogo.
// Agrupa el estado de conexión y las acciones que se guardan en la base de datos.
function BarraAdminProductos({
  conexion = {},
  total = 0,
  mostrarNuevo = true,
  recargando = false,
  onNuevo = null,
  onRecargar = null,
}) {
  return (
    <section className="barra-admin" aria-label="Acciones de administrador">
      <div className="barra-admin-info">
        <span className="etiqueta-admin">Modo administrador</span>
        <p>
          {total > 0
            ? `${total} productos en el catálogo. Los cambios se guardan en la base de datos del backend.`
            : 'Los cambios se guardan en la base de datos del backend.'}
        </p>
        <EstadoBackend {...conexion} onReintentar={conexion.verificar} />
      </div>

      <div className="barra-admin-acciones">
        {mostrarNuevo && onNuevo && (
          <Boton onClick={onNuevo} aria-label="Crear producto">
            Nuevo producto
          </Boton>
        )}
        {onRecargar && (
          <Boton variante="secundario" onClick={onRecargar} disabled={recargando}>
            {recargando ? 'Recargando...' : 'Recargar desde BD'}
          </Boton>
        )}
      </div>
    </section>
  )
}

export default BarraAdminProductos
