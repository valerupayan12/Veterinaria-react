// Átomo: botón básico. "variante" elige el estilo original del CSS:
//   'base' (botón verde pill), 'primario' y 'secundario' (botones de la página de detalle),
//   'peligro' (acción destructiva, mismo lenguaje visual con rojo suave).
function Boton({ variante = 'base', tipo = 'button', onClick, disabled = false, className = '', children, ...resto }) {
  const clase =
    variante === 'base'
      ? ''
      : variante === 'peligro'
        ? 'btn-peligro'
        : `btn-${variante === 'primario' ? 'primary' : 'secondary'}`
  return (
    <button type={tipo} className={`${clase} ${className}`.trim()} onClick={onClick} disabled={disabled} {...resto}>
      {children}
    </button>
  )
}

export default Boton
