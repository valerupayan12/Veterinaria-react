import Topbar from '../organisms/Topbar'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import { construirMenu } from '../../data/menu'

// Plantilla: esqueleto común de todas las páginas (Topbar + Header + contenido + Footer).
// Las páginas le entregan el contenido como "children" y los datos de sesión/tema/carrito en "layout".
function PlantillaPagina({ layout, topbar, titulo, subtitulo, imagen, altImagen, imagenGrande, children }) {
  const { usuario, carritoCantidad, tema, onAlternarTema, onCerrarSesion } = layout

  return (
    <>
      <Topbar mensaje={topbar} usuario={usuario} tema={tema} onAlternarTema={onAlternarTema} />
      <Header
        titulo={titulo}
        subtitulo={subtitulo}
        imagen={imagen}
        altImagen={altImagen}
        imagenGrande={imagenGrande}
        items={construirMenu(usuario, carritoCantidad)}
        onCerrarSesion={onCerrarSesion}
      />
      <main id="contenido">{children}</main>
      <Footer anio={2026} nombreTienda="Veterinaria San Marcos" />
    </>
  )
}

export default PlantillaPagina
