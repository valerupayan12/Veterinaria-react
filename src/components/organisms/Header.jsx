import { useState } from 'react'
import ImagenHeader from '../atoms/ImagenHeader'
import Menu from '../molecules/Menu'

// Organismo: encabezado con título, imagen y menú principal.
// En pantallas pequeñas el menú se oculta y se abre con el botón "Menú" (estado: menuAbierto).
function Header({ titulo, subtitulo, imagen, altImagen, imagenGrande, items, onCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header id="encabezado">
      <h1>{titulo}</h1>
      <p>{subtitulo}</p>
      {imagen && <ImagenHeader src={imagen} alt={altImagen} grande={imagenGrande} />}

      <button
        type="button"
        className="boton-menu"
        aria-expanded={menuAbierto}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        ☰ Menú
      </button>

      <Menu
        items={items}
        abierto={menuAbierto}
        onNavegar={() => setMenuAbierto(false)}
        onCerrarSesion={() => {
          setMenuAbierto(false)
          onCerrarSesion()
        }}
      />
    </header>
  )
}

export default Header
