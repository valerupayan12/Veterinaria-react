import { useParams, useNavigate } from 'react-router-dom'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import DetalleItem from '../components/organisms/DetalleItem'
import Boton from '../components/atoms/Boton'
import BotonFavorito from '../components/atoms/BotonFavorito'
import Error404 from './Error404'
import { categorias } from '../data/productos'
import { SITIO } from '../data/sitio'
import { beneficiosProducto } from '../utils/productos'

// Detalle de un producto (ruta /producto/:id). Reemplaza a productoAlimentoFelino.html para TODOS los productos.
function Producto({ layout, productos, favoritos, onFavorito, onAgregar }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const producto = productos.find((p) => p.id === Number(id))

  if (!producto) return <Error404 layout={layout} />

  const categoria = categorias.find((c) => c.valor === producto.categoria)
  const insignia = producto.destacado || (producto.requiereReceta ? 'Requiere receta veterinaria' : categoria?.etiqueta)

  const info = [
    { titulo: 'Envío', texto: 'Despacho gratis en San Marcos por compras sobre $20.000.' },
    { titulo: 'Garantía', texto: 'Calidad certificada y asesoría veterinaria incluida.' },
    {
      titulo: 'Stock',
      texto: producto.stock > 0 ? `Disponible para entrega inmediata (${producto.stock} unidades).` : 'Sin stock por el momento.',
    },
  ]

  const comprarAhora = () => {
    onAgregar(producto)
    navigate('/carrito')
  }

  return (
    <PlantillaPagina
      layout={layout}
      topbar={SITIO.avisoDespacho}
      titulo={SITIO.nombre}
      subtitulo={SITIO.eslogan}
      imagen={SITIO.logo}
      altImagen={SITIO.altLogo}
    >
      <DetalleItem
        nombre={producto.nombre}
        imagen={producto.imagen}
        precio={producto.precio}
        insignia={insignia}
        detalle={producto.detalle || producto.descripcion}
        beneficios={beneficiosProducto(producto)}
        info={info}
        video={producto.video}
      >
        <Boton variante="primario" onClick={comprarAhora} disabled={producto.stock < 1}>
          Comprar ahora
        </Boton>
        <Boton variante="secundario" onClick={() => onAgregar(producto)} disabled={producto.stock < 1}>
          Agregar al carrito
        </Boton>
        <BotonFavorito activo={favoritos.includes(producto.id)} onAlternar={() => onFavorito(producto.id)} />
      </DetalleItem>
    </PlantillaPagina>
  )
}

export default Producto
