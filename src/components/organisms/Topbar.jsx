import SelectorTema from '../molecules/SelectorTema'
import EstadoBackend from '../atoms/EstadoBackend'

// Organismo: barra superior con el aviso (centro), el saludo al usuario (izquierda)
// y el botón de tema claro/oscuro (derecha). El administrador ve además un punto
// que indica si el backend está conectado.
function Topbar({ mensaje, usuario, tema, conexion, onAlternarTema }) {
  return (
    <div className="topbar">
      <div>
        <div className="woostify-container">
          <div className="topbar-item topbar-left">{usuario ? `Hola, ${usuario.nombre.split(' ')[0]}` : ''}</div>
          <div className="topbar-item topbar-center">{mensaje}</div>
          <div className="topbar-item topbar-right">
            {usuario?.rol === 'admin' && conexion && <EstadoBackend compacto {...conexion} />}
            <SelectorTema tema={tema} onAlternar={onAlternarTema} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
