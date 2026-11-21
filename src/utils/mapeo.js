// Traducción entre el JSON del backend y el modelo que usan las vistas.
// El backend expone Producto como { id, nombre, precio, descripcion, ... },
// mientras que el frontend trabaja con { id, nombre, precio, ... }.
import { IMAGEN_POR_DEFECTO } from '../data/productos'

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
    imagen: producto.imagen ?? datosLocales.imagen ?? IMAGEN_POR_DEFECTO,
    requiereReceta: Boolean(producto.requiereReceta ?? datosLocales.requiereReceta ?? false),
    destacado: producto.destacado ?? datosLocales.destacado,
    detalle: producto.detalle ?? datosLocales.detalle,
    beneficios: producto.beneficios ?? datosLocales.beneficios,
    video: producto.video ?? datosLocales.video,
  }
}

// Datos que entiende la entidad Producto.
// La entidad guarda todos los campos del catálogo; "imagen" queda como la ruta
// del bundle que use el frontend (o null para usar la imagen por defecto).
export function productoParaApi(datos) {
  return {
    nombre: datos.nombre.trim(),
    precio: Number(datos.precio),
    descripcion: datos.descripcion?.trim() ?? '',
    categoria: datos.categoria ?? '',
    mascotas: datos.mascotas ?? [],
    stock: Number(datos.stock),
    requiereReceta: Boolean(datos.requiereReceta),
    imagen: datos.imagen,
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
export function mensajeDeError(error, porDefecto) {
  return error?.response?.data?.message || error?.response?.data?.error || porDefecto
}
