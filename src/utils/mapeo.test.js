import { describe, it, expect } from 'vitest'
import { productoDesdeApi, productoParaApi, usuarioDesdeApi, mensajeDeError } from './mapeo'

describe('mapeo entre el backend y el frontend', () => {
  it('convierte un producto del backend al catálogo del frontend', () => {
    const producto = productoDesdeApi(
      {
        id: 4,
        nombre: 'Collar antipulgas',
        precio: 9990,
        descripcion: 'Protección mensual',
        categoria: 'farmacia',
        mascotas: ['perro'],
        stock: 20,
        requiereReceta: true,
      },
      { imagen: 'imagen-local.jpg' },
    )

    expect(producto).toMatchObject({
      id: 4,
      nombre: 'Collar antipulgas',
      precio: 9990,
      categoria: 'farmacia',
      mascotas: ['perro'],
      stock: 20,
      requiereReceta: true,
      imagen: 'imagen-local.jpg',
    })
  })

  it('acepta también el JSON antiguo con name y price', () => {
    const producto = productoDesdeApi({ id: 1, name: 'Alimento', price: 1000 })

    expect(producto.nombre).toBe('Alimento')
    expect(producto.precio).toBe(1000)
  })

  it('prepara los datos del formulario para la entidad Producto', () => {
    const datos = productoParaApi({
      nombre: '  Collar antipulgas  ',
      precio: '9990',
      descripcion: 'Protección mensual',
      categoria: 'farmacia',
      mascotas: ['perro'],
      stock: '20',
      requiereReceta: true,
    })

    expect(datos).toMatchObject({
      nombre: 'Collar antipulgas',
      precio: 9990,
      descripcion: 'Protección mensual',
      categoria: 'farmacia',
      mascotas: ['perro'],
      stock: 20,
      requiereReceta: true,
    })
  })

  it('no guarda en la BD las rutas del bundle de Vite y conserva las URLs estables', () => {
    const conBundle = productoParaApi({
      nombre: 'Producto',
      precio: 1000,
      descripcion: 'Descripción válida',
      categoria: 'alimento',
      mascotas: ['perro'],
      stock: 2,
      imagen: '/src/assets/img/producto.jpg',
    })
    const conUrl = productoParaApi({
      nombre: 'Producto',
      precio: 1000,
      descripcion: 'Descripción válida',
      categoria: 'alimento',
      mascotas: ['perro'],
      stock: 2,
      imagen: 'https://cdn.ejemplo.cl/producto.jpg',
    })

    expect(conBundle.imagen).toBeNull()
    expect(conUrl.imagen).toBe('https://cdn.ejemplo.cl/producto.jpg')
  })

  it('usa la imagen local cuando el backend devuelve una imagen vacía', () => {
    const producto = productoDesdeApi({ id: 1, nombre: 'Producto', imagen: '' }, { imagen: 'local.jpg' })

    expect(producto.imagen).toBe('local.jpg')
  })

  it('traduce los errores de seguridad y de conexión', () => {
    expect(mensajeDeError({ response: { status: 401 } })).toMatch(/sesión expiró/i)
    expect(mensajeDeError({ response: { status: 403 } })).toMatch(/permisos de administrador/i)
    expect(mensajeDeError({})).toMatch(/No se pudo conectar con el backend/i)
    expect(mensajeDeError({ response: { status: 400, data: { message: 'Precio inválido' } } })).toBe('Precio inválido')
  })

  it('une el usuario del backend con los datos locales del perfil', () => {
    const usuario = usuarioDesdeApi(
      {
        id: 3,
        nombre: 'Ana Pérez',
        email: 'ana@gmail.com',
        telefono: '+56911111111',
        rol: 'cliente',
        mascota: { nombre: 'Firulais', especie: 'perro', raza: 'Labrador', edad: 3 },
      },
      { rut: '12345678-9', peso: '25.5' },
    )

    expect(usuario).toMatchObject({
      id: 3,
      nombre: 'Ana Pérez',
      rol: 'cliente',
      rut: '12345678-9',
      nombreMascota: 'Firulais',
      tipoMascota: 'perro',
      raza: 'Labrador',
      edad: 3,
      peso: '25.5',
    })
  })
})
