// Molécula: botón para alternar entre tema claro y oscuro.
function SelectorTema({ tema, onAlternar }) {
  const esOscuro = tema === 'oscuro'
  return (
    <button type="button" className="boton-tema" onClick={onAlternar} aria-label="Cambiar tema claro/oscuro">
      {esOscuro ? '☀️ Tema claro' : '🌙 Tema oscuro'}
    </button>
  )
}

export default SelectorTema
