import SelectorTema from '../molecules/SelectorTema'

// Organismo: barra superior con el aviso (centro), el saludo al usuario (izquierda)
// y el botón de tema claro/oscuro (derecha).
function Topbar({ mensaje, usuario, tema, onAlternarTema }) {
  return (
    <div className="topbar">
      <div>
        <div className="woostify-container">
          <div className="topbar-item topbar-left">{usuario ? `Hola, ${usuario.nombre.split(' ')[0]}` : ''}</div>
          <div className="topbar-item topbar-center">{mensaje}</div>
          <div className="topbar-item topbar-right">
            <SelectorTema tema={tema} onAlternar={onAlternarTema} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
