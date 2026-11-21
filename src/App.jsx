import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './views/Home'
import Productos from './views/Productos'
import Producto from './views/Producto'
import Servicio from './views/Servicio'
import AgendarCita from './views/AgendarCita'
import Login from './views/Login'
import Registro from './views/Registro'
import Admin from './views/Admin'
import EditarProducto from './views/EditarProducto'
import Carrito from './views/Carrito'
import Perfil from './views/Perfil'
import Error404 from './views/Error404'
import RutaPrivada from './routes/RutaPrivada'

import { productos as productosIniciales, IMAGEN_POR_DEFECTO } from './data/productos'
import { agregarAlCarrito, cambiarCantidad, quitarDelCarrito, contarUnidades } from './utils/carrito'
import { leerSesion, guardarSesion, cerrarSesion, leerTema, guardarTema } from './utils/sesion'
import { productoDesdeApi, productoParaApi, mensajeDeError } from './utils/mapeo'
import ProductoService from './services/ProductoService'
import { useConexionBackend } from './hooks/useConexionBackend'

// App concentra el estado compartido entre páginas (useState) y lo reparte por props.
function App() {
  const [productos, setProductos] = useState(productosIniciales) // catálogo (local + backend)
  const [carrito, setCarrito] = useState([]) // [{ id, cantidad }]
  const [favoritos, setFavoritos] = useState([]) // ids de productos favoritos
  const [tema, setTema] = useState(leerTema) // 'claro' | 'oscuro'
  const [usuario, setUsuario] = useState(leerSesion) // usuario con sesión iniciada (o null)
  const conexion = useConexionBackend() // estado visible de la conexión con el backend

  // ----- Catálogo: carga los productos del backend cuando hay sesión -----
  // Si el backend no está disponible se conserva el catálogo local de respaldo.
  useEffect(() => {
    // En las pruebas unitarias no se llama al backend para mantenerlas deterministas.
    if (import.meta.env.MODE === 'test') return undefined

    let vigente = true
    ProductoService.getAllProductos()
      .then(({ data }) => {
        if (!vigente || !Array.isArray(data)) return
        const locales = new Map(productosIniciales.map((p) => [p.id, p]))
        setProductos(data.map((p) => productoDesdeApi(p, locales.get(p.id))))
      })
      .catch(() => {
        // Backend apagado: se mantiene el catálogo local.
      })

    return () => {
      vigente = false
    }
  }, [])

  // ----- Carrito -----
  const agregarProducto = (producto) => setCarrito(agregarAlCarrito(carrito, producto))
  const cambiarCantidadProducto = (producto, delta) => setCarrito(cambiarCantidad(carrito, producto, delta))
  const quitarProducto = (id) => setCarrito(quitarDelCarrito(carrito, id))
  const vaciarCarrito = () => setCarrito([])

  // ----- Favoritos: si el id ya está lo quita, si no lo agrega -----
  const alternarFavorito = (id) =>
    setFavoritos(favoritos.includes(id) ? favoritos.filter((f) => f !== id) : [...favoritos, id])

  // ----- Tema claro / oscuro -----
  const alternarTema = () => {
    const nuevo = tema === 'claro' ? 'oscuro' : 'claro'
    setTema(nuevo)
    guardarTema(nuevo)
  }

  // ----- Sesión -----
  const iniciarSesion = (usuarioNuevo) => setUsuario(guardarSesion(usuarioNuevo))
  const cerrarSesionActual = () => {
    cerrarSesion()
    setUsuario(null)
  }

  // ----- Catálogo desde la base de datos -----
  // Se usa al cargar la página y cuando el administrador pide "Recargar desde BD".
  const recargarProductos = async () => {
    try {
      const { data } = await ProductoService.getAllProductos()
      if (!Array.isArray(data)) throw new Error('Respuesta inválida del backend')

      const locales = new Map(productosIniciales.map((p) => [p.id, p]))
      setProductos(data.map((p) => productoDesdeApi(p, locales.get(p.id))))
      conexion.verificar()
      return { ok: true }
    } catch (error) {
      conexion.verificar()
      return {
        ok: false,
        mensaje: mensajeDeError(error, 'No se pudo cargar el catálogo desde el backend.'),
      }
    }
  }

  // ----- Panel de control: crear / editar / eliminar productos en el backend -----
  // Si la petición falla, el estado local no se modifica: así la pantalla nunca
  // muestra como guardado algo que no llegó a la base de datos.
  const agregarProductoCatalogo = async (datos) => {
    const datosLocales = {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: IMAGEN_POR_DEFECTO,
    }

    try {
      const { data } = await ProductoService.createProducto(productoParaApi(datosLocales))
      const creado = productoDesdeApi(data, datosLocales)
      setProductos((actuales) => [...actuales, creado])
      conexion.verificar()
      return { ok: true, producto: creado }
    } catch (error) {
      conexion.verificar()
      return {
        ok: false,
        mensaje: mensajeDeError(error, 'No se pudo crear el producto en el backend.'),
      }
    }
  }

  const eliminarProductoCatalogo = async (id) => {
    try {
      await ProductoService.deleteProducto(id)
    } catch (error) {
      conexion.verificar()
      return {
        ok: false,
        mensaje: mensajeDeError(error, 'No se pudo eliminar el producto del backend.'),
      }
    }

    setProductos((actuales) => actuales.filter((p) => p.id !== id))
    setCarrito((actual) => quitarDelCarrito(actual, id))
    setFavoritos((actual) => actual.filter((f) => f !== id))
    conexion.verificar()
    return { ok: true }
  }

  const editarProductoCatalogo = async (id, datos) => {
    const actual = productos.find((p) => p.id === id) || {}
    const datosLocales = {
      ...actual,
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: actual.imagen || IMAGEN_POR_DEFECTO,
    }

    try {
      const { data } = await ProductoService.updateProducto(id, productoParaApi(datosLocales))
      const actualizado = productoDesdeApi(data, datosLocales)
      setProductos((actuales) => actuales.map((p) => (p.id === id ? actualizado : p)))
      conexion.verificar()
      return { ok: true, producto: actualizado }
    } catch (error) {
      conexion.verificar()
      return {
        ok: false,
        mensaje: mensajeDeError(error, 'No se pudo actualizar el producto en el backend.'),
      }
    }
  }

  // Datos que necesita la plantilla de todas las páginas (menú, saludo, tema).
  const layout = {
    usuario,
    carritoCantidad: contarUnidades(carrito),
    tema,
    conexion,
    onAlternarTema: alternarTema,
    onCerrarSesion: cerrarSesionActual,
  }

  const propsCatalogo = { layout, productos, favoritos, onFavorito: alternarFavorito, onAgregar: agregarProducto }

  return (
    <div className="app" data-tema={tema}>
      <Routes>
        <Route path="/" element={<Home layout={layout} />} />
        <Route
          path="/productos"
          element={
            <Productos
              {...propsCatalogo}
              conexion={conexion}
              onCrearProducto={agregarProductoCatalogo}
              onEditarProducto={editarProductoCatalogo}
              onEliminarProducto={eliminarProductoCatalogo}
              onRecargarProductos={recargarProductos}
            />
          }
        />
        <Route path="/producto/:id" element={<Producto {...propsCatalogo} />} />
        <Route path="/servicio/:id" element={<Servicio layout={layout} />} />
        <Route path="/agendar-cita" element={<AgendarCita layout={layout} />} />
        <Route path="/login" element={<Login onLogin={iniciarSesion} />} />
        <Route path="/registro" element={<Registro layout={layout} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              layout={layout}
              carrito={carrito}
              productos={productos}
              onCambiarCantidad={cambiarCantidadProducto}
              onQuitar={quitarProducto}
              onVaciar={vaciarCarrito}
            />
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <Perfil layout={layout} productos={productos} favoritos={favoritos} onFavorito={alternarFavorito} />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin"
          element={
            <RutaPrivada soloAdmin>
              <Admin
                layout={layout}
                productos={productos}
                conexion={conexion}
                onCrearProducto={agregarProductoCatalogo}
                onEliminarProducto={eliminarProductoCatalogo}
                onRecargarProductos={recargarProductos}
              />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin/productos/editar/:id"
          element={
            <RutaPrivada soloAdmin>
              <EditarProducto
                layout={layout}
                productos={productos}
                onEditarProducto={editarProductoCatalogo}
              />
            </RutaPrivada>
          }
        />
        <Route path="*" element={<Error404 layout={layout} />} />
      </Routes>
    </div>
  )
}

export default App
