// Traducción entre el JSON del backend y el modelo que usan las vistas.
// El backend expone Producto como { id, nombre, precio, descripcion, ... },
// mientras que el frontend trabaja con { id, nombre, precio, ... }.
import { IMAGEN_POR_DEFECTO } from '../data/productos'

// Texto no vacío o null. Evita que una cadena vacía del backend pise la imagen local.
function textoONulo(valor) {
  if (typeof valor !== 'string') return null
  const texto = valor.trim()
  return texto === '' ? null : texto
}

// Convierte un producto del backend al formato del catálogo.
// "datosLocales" permite conservar imagen, categoría y stock que el backend todavía no guarda.
export function productoDesdeApi(producto, datosLocales = {}) {
  return {
    id: producto.id ?? producto.id_producto,
    nombre: producto.nombre ?? producto.name ?? datosLocales.nombre ?? '',
    precio: Number(producto.precio ?? producto.price ?? datosLocales.precio ?? 0),
    descripcion: producto.descripcion ?? datosLocales.descripcion ?? '',
    categoria: producto.categoria ?? datosLocales.categoria ?? 'accesorios',
    mascotas: producto.mascotas ?? datosLocales.mascotas ?? [],
    stock: Number(producto.stock ?? datosLocales.stock ?? 0),
    imagen:
      textoONulo(producto.imagen) ?? textoONulo(datosLocales.imagen) ?? IMAGEN_POR_DEFECTO,
    requiereReceta: Boolean(producto.requiereReceta ?? datosLocales.requiereReceta ?? false),
    destacado: producto.destacado ?? datosLocales.destacado,
    detalle: producto.detalle ?? datosLocales.detalle,
    beneficios: producto.beneficios ?? datosLocales.beneficios,
    video: producto.video ?? datosLocales.video,
  }
}

// Las imágenes del catálogo son archivos del bundle de Vite (/src/assets/... en
// desarrollo o /assets/... en producción). Esas rutas cambian en cada build, así
// que no se guardan en la base de datos: el frontend las resuelve por id.
// Solo se persisten URLs absolutas o rutas estables de /public.
function imagenParaApi(imagen) {
  const texto = textoONulo(imagen)
  if (!texto) return null
  if (/^(https?:)?\/\//i.test(texto)) return texto
  if (texto.startsWith('/img/')) return texto
  return null
}

// Datos que entiende la entidad Producto.
// La entidad guarda todos los campos del catálogo; "imagen" queda null para
// que el frontend use la imagen local o la imagen genérica por defecto.
export function productoParaApi(datos) {
  return {
    nombre: datos.nombre.trim(),
    precio: Number(datos.precio),
    descripcion: datos.descripcion?.trim() ?? '',
    categoria: datos.categoria ?? '',
    mascotas: datos.mascotas ?? [],
    stock: Number(datos.stock),
    requiereReceta: Boolean(datos.requiereReceta),
    imagen: imagenParaApi(datos.imagen),
  }
}

// Convierte un usuario del backend al formato del perfil.
// Los campos que el backend aún no guarda (rut, peso, microchip) se recuperan del perfil local.
export function usuarioDesdeApi(usuario, datosLocales = {}) {
  return {
    id: usuario.id,
    nombre: usuario.nombre ?? datosLocales.nombre ?? '',
    email: usuario.email ?? datosLocales.email ?? '',
    telefono: usuario.telefono ?? datosLocales.telefono ?? '',
    rol: usuario.rol ?? datosLocales.rol ?? 'cliente',
    rut: datosLocales.rut,
    nombreMascota: usuario.mascota?.nombre ?? datosLocales.nombreMascota,
    tipoMascota: usuario.mascota?.especie ?? datosLocales.tipoMascota,
    raza: usuario.mascota?.raza ?? datosLocales.raza,
    edad: usuario.mascota?.edad ?? datosLocales.edad,
    peso: datosLocales.peso,
    microchip: datosLocales.microchip,
    visitaAnterior: datosLocales.visitaAnterior,
    observaciones: datosLocales.observaciones,
  }
}

// Mensaje legible a partir de un error de axios.
// Prioriza el mensaje del backend y traduce los casos más comunes de seguridad.
export function mensajeDeError(error, porDefecto = 'Ocurrió un error inesperado.') {
  const datos = error?.response?.data
  const mensajeBackend = datos?.message || datos?.error || datos?.detail
  if (mensajeBackend) return mensajeBackend

  const estado = error?.response?.status
  if (estado === 401) return 'Tu sesión expiró. Vuelve a iniciar sesión para continuar.'
  if (estado === 403) return 'No tienes permisos de administrador para realizar esta acción.'
  if (!error?.response) {
    return 'No se pudo conectar con el backend. Verifica que esté encendido y que la URL sea correcta.'
  }
  return porDefecto
}
