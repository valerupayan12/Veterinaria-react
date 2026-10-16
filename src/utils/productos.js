// Funciones para filtrar y crear productos (usadas por la página Productos y el Panel de Control).
import { IMAGEN_POR_DEFECTO } from '../data/productos'

// Filtra por texto (nombre o descripción), categoría y tipo de mascota.
// Un filtro con valor '' significa "todos".
export function filtrarProductos(productos, { texto = '', categoria = '', mascota = '' }) {
  const busqueda = texto.trim().toLowerCase()
  return productos.filter((p) => {
    const coincideTexto =
      busqueda === '' ||
      p.nombre.toLowerCase().includes(busqueda) ||
      p.descripcion.toLowerCase().includes(busqueda)
    const coincideCategoria = categoria === '' || p.categoria === categoria
    const coincideMascota = mascota === '' || p.mascotas.includes(mascota)
    return coincideTexto && coincideCategoria && coincideMascota
  })
}

// Siguiente id disponible (máximo + 1).
export function siguienteId(productos) {
  return productos.reduce((mayor, p) => Math.max(mayor, p.id), 0) + 1
}

// Crea un producto nuevo a partir de los datos del formulario.
// Siempre usa la imagen genérica: no se cargan archivos reales.
export function crearProducto(datos, productos) {
  return {
    id: siguienteId(productos),
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion.trim(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    categoria: datos.categoria,
    mascotas: datos.mascotas,
    requiereReceta: datos.requiereReceta,
    imagen: IMAGEN_POR_DEFECTO,
  }
}

// Beneficios que se muestran en el detalle. Si el producto no trae los suyos, se usan unos según su categoría.
const BENEFICIOS_POR_CATEGORIA = {
  alimento: ['Nutrición recomendada por médicos veterinarios', 'Ingredientes de calidad y fácil digestión', 'Aporta vitaminas y minerales esenciales'],
  farmacia: ['Producto de uso veterinario', 'Protección y cuidado preventivo', 'Asesoría de nuestros veterinarios incluida'],
  accesorios: ['Materiales resistentes y seguros', 'Pensado para el bienestar de tu mascota', 'Fácil de limpiar y mantener'],
}

export function beneficiosProducto(producto) {
  return producto.beneficios || BENEFICIOS_POR_CATEGORIA[producto.categoria] || BENEFICIOS_POR_CATEGORIA.accesorios
}
