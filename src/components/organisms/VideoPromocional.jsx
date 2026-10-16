import videoPresentacion from '../../assets/video/presentacion.mp4'
// Organismo: video promocional de la página de inicio.
function VideoPromocional() {
  return (
    <div className="contenedor-video">
      <video autoPlay muted loop controls className="video-promocional">
        <source src={videoPresentacion} type="video/mp4" />
        Tu navegador no soporta la reproducción de video HTML5.
      </video>
    </div>
  )
}

export default VideoPromocional
