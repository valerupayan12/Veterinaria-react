// Átomo: imagen del encabezado (logo pequeño o imagen grande de la página Productos).
function ImagenHeader({ src, alt, grande = false }) {
  return <img src={src} alt={alt} className={grande ? 'imagen-header-grande' : 'logo-header'} />
}

export default ImagenHeader
