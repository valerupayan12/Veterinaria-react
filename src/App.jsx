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
import { crearProducto } from './utils/productos'
import { leerSesion, guardarSesion, cerrarSesion, leerTema, guardarTema } from './utils/sesion'
import { productoDesdeApi, productoParaApi } from './utils/mapeo'
import ProductoService from './services/ProductoService'

// App concentra el estado compartido entre páginas (useState) y lo reparte por props.
function App() {
  const [productos, setProductos] = useState(productosIniciales) // catálogo (local + backend)
  const [carrito, setCarrito] = useState([]) // [{ id, cantidad }]
  const [favoritos, setFavoritos] = useState([]) // ids de productos favoritos
  const [tema, setTema] = useState(leerTema) // 'claro' | 'oscuro'
  const [usuario, setUsuario] = useState(leerSesion) // usuario con sesión iniciada (o null)

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

  // ----- Panel de control: crear / eliminar productos -----
  const agregarProductoCatalogo = async (datos) => {
    const datosLocales = {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagen: IMAGEN_POR_DEFECTO,
    }

    try {
      const { data } = await ProductoService.createProducto(productoParaApi(datosLocales))
      setProductos((actuales) => [...actuales, productoDesdeApi(data, datosLocales)])
      return { ok: true }
    } catch {
      // Sin backend o sin token el producto se agrega solo en memoria.
      setProductos((actuales) => [...actuales, crearProducto(datos, actuales)])
      return {
        ok: true,
        mensaje: 'Se guardó solo en memoria porque no se pudo conectar con el backend.',
      }
    }
  }

  const eliminarProductoCatalogo = async (id) => {
    try {
      await ProductoService.deleteProducto(id)
    } catch {
      // Si el producto solo existía en memoria, el borrado local es suficiente.
    }

    setProductos((actuales) => actuales.filter((p) => p.id !== id))
    setCarrito((actual) => quitarDelCarrito(actual, id))
    setFavoritos((actual) => actual.filter((f) => f !== id))
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
      setProductos((actuales) =>
        actuales.map((p) => (p.id === id ? productoDesdeApi(data, datosLocales) : p)),
      )
      return { ok: true }
    } catch {
      // Sin backend la edición queda solo en memoria, igual que la creación.
      setProductos((actuales) =>
        actuales.map((p) => (p.id === id ? { ...p, ...datosLocales, id } : p)),
      )
      return {
        ok: true,
        mensaje: 'Se actualizó solo en memoria porque no se pudo conectar con el backend.',
      }
    }
  }

  // Datos que necesita la plantilla de todas las páginas (menú, saludo, tema).
  const layout = {
    usuario,
    carritoCantidad: contarUnidades(carrito),
    tema,
    onAlternarTema: alternarTema,
    onCerrarSesion: cerrarSesionActual,
  }

  const propsCatalogo = { layout, productos, favoritos, onFavorito: alternarFavorito, onAgregar: agregarProducto }

  return (
    <div className="app" data-tema={tema}>
      <Routes>
        <Route path="/" element={<Home layout={layout} />} />
        <Route path="/productos" element={<Productos {...propsCatalogo} />} />
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
                onCrearProducto={agregarProductoCatalogo}
                onEliminarProducto={eliminarProductoCatalogo}
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
