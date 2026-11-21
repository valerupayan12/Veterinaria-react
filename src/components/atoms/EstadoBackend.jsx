import Boton from './Boton'

const ETIQUETAS = {
  verificando: 'Verificando conexión',
  conectado: 'Backend conectado',
  desconectado: 'Sin conexión con el backend',
  'sin-verificar': 'Conexión sin verificar',
}

function hora(fecha) {
  if (!fecha) return ''
  return new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit' }).format(fecha)
}

// Átomo: indicador del estado de conexión con el backend.
// "compacto" se usa en la barra superior; la versión completa muestra la URL y la última revisión.
function EstadoBackend({
  estado = 'sin-verificar',
  ultimaRevision = null,
  error = '',
  url = '',
  onReintentar = null,
  compacto = false,
}) {
  const etiqueta = ETIQUETAS[estado] || ETIQUETAS['sin-verificar']
  const clase = `estado-backend estado-${estado}`
  const revision = hora(ultimaRevision)

  if (compacto) {
    const detalle = [etiqueta, url, revision ? `Última revisión: ${revision}` : ''].filter(Boolean).join(' · ')
    return (
      <span className={`${clase} estado-compacto`} role="status" title={detalle} aria-label={detalle}>
        <span className="estado-punto" aria-hidden="true" />
      </span>
    )
  }

  return (
    <div className={clase} role="status" aria-live="polite">
      <span className="estado-punto" aria-hidden="true" />
      <span className="estado-texto">
        <strong>{etiqueta}</strong>
        {url && <small>{url}</small>}
        {revision && <small>Última revisión: {revision}</small>}
        {estado === 'desconectado' && error && <small>{error}</small>}
      </span>
      {onReintentar && (
        <Boton variante="secundario" className="btn-reintentar" onClick={onReintentar}>
          Reintentar
        </Boton>
      )}
    </div>
  )
}

export default EstadoBackend
