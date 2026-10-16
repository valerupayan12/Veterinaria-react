// Átomo: botón de corazón para agregar/quitar de favoritos.
// El estado (si es favorito o no) vive en App; el botón solo recibe "activo" y avisa con "onAlternar".
function BotonFavorito({ activo, onAlternar }) {
  return (
    <button
      type="button"
      className={activo ? 'boton-favorito activo' : 'boton-favorito'}
      onClick={onAlternar}
      aria-pressed={activo}
    >
      {activo ? '❤️ Guardado en favoritos' : '🤍 Agregar a favoritos'}
    </button>
  )
}

export default BotonFavorito
