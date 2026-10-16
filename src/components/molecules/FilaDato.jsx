// Molécula: par "etiqueta: valor" para mostrar datos del perfil.
function FilaDato({ etiqueta, valor }) {
  return (
    <div className="fila-dato">
      <dt>{etiqueta}</dt>
      <dd>{valor || '—'}</dd>
    </div>
  )
}

export default FilaDato
