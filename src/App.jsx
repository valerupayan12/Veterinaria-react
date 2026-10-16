import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './views/Home'
import Productos from './views/Productos'
import Producto from './views/Producto'
import Servicio from './views/Servicio'
import AgendarCita from './views/AgendarCita'
import Login from './views/Login'
import Registro from './views/Registro'
import Admin from './views/Admin'
import Carrito from './views/Carrito'
import Perfil from './views/Perfil'
import Error404 from './views/Error404'
import RutaPrivada from './routes/RutaPrivada'

import { productos as productosIniciales } from './data/productos'
import { agregarAlCarrito, cambiarCantidad, quitarDelCarrito, contarUnidades } from './utils/carrito'
import { crearProducto } from './utils/productos'
import { leerSesion, guardarSesion, cerrarSesion, leerTema, guardarTema } from './utils/sesion'

// App concentra el estado compartido entre páginas (useState) y lo reparte por props.
function App() {
  const [productos, setProductos] = useState(productosIniciales) // catálogo (CRUD en memoria)
  const [carrito, setCarrito] = useState([]) // [{ id, cantidad }]
  const [favoritos, setFavoritos] = useState([]) // ids de productos favoritos
  const [tema, setTema] = useState(leerTema) // 'claro' | 'oscuro'
  const [usuario, setUsuario] = useState(leerSesion) // usuario con sesión iniciada (o null)

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

  // ----- Panel de control: crear / eliminar productos en memoria -----
  const agregarProductoCatalogo = (datos) => setProductos([...productos, crearProducto(datos, productos)])
  const eliminarProductoCatalogo = (id) => {
    setProductos(productos.filter((p) => p.id !== id))
    setCarrito(quitarDelCarrito(carrito, id))
    setFavoritos(favoritos.filter((f) => f !== id))
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
        <Route path="*" element={<Error404 layout={layout} />} />
      </Routes>
    </div>
  )
}

export default App
