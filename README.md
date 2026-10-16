# Veterinaria San Marcos – React

Migración del sitio HTML + CSS + JS de la Veterinaria San Marcos a **React** (Vite), manteniendo el diseño original.

## Ejecutar
```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm test         # pruebas con Vitest
npm run build    # versión de producción
```

## Credenciales de prueba
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@duocuc.cl | Admin.123 |

Los clientes se crean desde la página **Registro** y quedan guardados en `localStorage`.

## Páginas (react-router-dom)
Están en `src/views/` (igual que el proyecto base): `Home` (ruta `/`, página Index), `Productos`, `Producto` (`/producto/:id`), `Login`, `Registro`, `Admin` (solo administrador), `Carrito`, `Perfil` (requiere sesión) y `Error404`.
Extras migradas del sitio original: `Servicio` (`/servicio/:id`) y `AgendarCita` (`/agendar-cita`).

## Estructura (misma base del proyecto del profesor + Atomic Design)
```
src/
  App.jsx, App.css, main.jsx, setupTests.js
  assets/img, assets/video        imágenes y videos (se importan en data/, como en el proyecto base)
  data/        productos.js (export productos), menu.js (export itemsMenu), servicios.js, sitio.js, credenciales.js
  views/       Home, Productos, Producto, Servicio, AgendarCita, Login, Registro, Admin, Carrito, Perfil, Error404
  components/
    atoms/       Boton, EnlaceBoton, Insignia, Precio, ImagenHeader, EnlaceMenu, BotonFavorito
    molecules/   Seccion, Menu, TarjetaProducto, TarjetaInicio, CampoFormulario, GrupoOpciones, InfoCard,
                 MetodosPago, SelectorTema, FiltrosProductos, ItemCarrito, ResumenCompra, FilaDato
    organisms/   Topbar, Header, Footer, GaleriaProductos, GaleriaInicio, VideoPromocional, DetalleItem,
                 FormularioLogin, FormularioRegistro, FormularioCita, FormularioProducto, TablaProductosAdmin,
                 ListaCarrito, FormularioCheckout, DatosPerfil, ListaFavoritos
    templates/   PlantillaPagina
  routes/        RutaPrivada
  utils/         validaciones, carrito, productos, sesion, formato
  *.test.js(x)   pruebas Vitest junto a cada archivo probado (como TarjetaProducto.test.jsx del proyecto base)
```

## Funcionalidades con estado (useState)
1. Tema claro/oscuro · 2. Carrito de compras · 3. Favoritos · 4. Filtrado dinámico (texto, categoría, mascota)
5. CRUD en memoria (crear y eliminar productos en el Panel) · 6. Menú hamburguesa responsivo · 7. Formularios con validación

## Elementos responsivos
Menú hamburguesa, galería en cuadrícula, detalle de producto en una columna, formularios con Row/Col, tabla del panel con scroll, carrito en columna.

## Documentación de pruebas
Ver `plan_de_pruebas.md` (42 pruebas unitarias con patrón AAA).
