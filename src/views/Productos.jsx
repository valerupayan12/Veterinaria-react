import imgTarjetaImagenProductos from '../assets/img/tarjeta-imagenProductos.jpg'
import { useState } from 'react'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FiltrosProductos from '../components/molecules/FiltrosProductos'
import GaleriaProductos from '../components/organisms/GaleriaProductos'
import { filtrarProductos } from '../utils/productos'
import { SITIO } from '../data/sitio'

const FILTROS_VACIOS = { texto: '', categoria: '', mascota: '' }

// Catálogo de productos (migrado desde productos.html) con filtrado dinámico.
function Productos({ layout, productos, favoritos, onFavorito, onAgregar }) {
  const [filtros, setFiltros] = useState(FILTROS_VACIOS)

  const manejarCambio = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value })
  const visibles = filtrarProductos(productos, filtros)

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoDespacho}
      titulo="Catálogo de Productos"
      subtitulo="Alimentos, farmacia y accesorios para el cuidado de tu mascota"
      imagen={imgTarjetaImagenProductos}
      altImagen="Productos Veterinaria San Marcos"
      imagenGrande
    >
      <Seccion id="inicio" titulo="Categorías Principales">
        <p>Encuentra los mejores insumos de nutrición, medicamentos y accesorios seleccionados por nuestros veterinarios.</p>
        <p>¡Todo lo que tu perro o gato necesita en un solo lugar!</p>
      </Seccion>

      <Seccion id="album" titulo="Nuestros Productos Destacados">
        <h3>Selecciona un producto para ver más detalles</h3>
        <FiltrosProductos filtros={filtros} onCambio={manejarCambio} onLimpiar={() => setFiltros(FILTROS_VACIOS)} />
        <p className="contador-resultados">
          Mostrando {visibles.length} de {productos.length} productos
        </p>
        <GaleriaProductos productos={visibles} favoritos={favoritos} onFavorito={onFavorito} onAgregar={onAgregar} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Productos
