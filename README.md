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

## Estructura (misma base del proyecto + Atomic Design)
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
5. CRUD de productos conectado al backend (crear, editar y eliminar desde `/productos` y `/admin`) · 6. Menú hamburguesa responsivo · 7. Formularios con validación
8. Indicador visible de conexión con el backend (estado, URL y última revisión)

## CRUD de productos con el backend
El backend Spring Boot vive en `../VeterinariaSanMarcos-Backend` y expone `/api/productos`.
El catálogo se lee desde la base de datos al cargar la página. Si el backend no responde,
se mantiene el catálogo local de respaldo, pero las acciones de administrador se bloquean
con un mensaje claro para no simular cambios que no llegaron a la BD.

1. Inicia MySQL (XAMPP) y el backend en `http://localhost:8081`.
2. Inicia el frontend con `npm run dev`.
3. Entra con `admin@duocuc.cl` / `Admin.123`.
4. En **Productos** aparece la barra **Modo administrador** con:
   - **Nuevo producto**: abre el formulario en un modal.
   - **Editar** y **Eliminar** en cada tarjeta.
   - **Recargar desde BD**: vuelve a leer el catálogo desde MySQL.
   - Estado de conexión con la URL del backend y la última revisión.
5. Cada operación se envía por la API REST y se refleja en la tabla `producto` de MySQL.

> Si usas otro puerto o host, copia `.env.example` a `.env` y ajusta `VITE_API_URL`.
> El backend permite CORS desde `http://localhost:5173`.

## Elementos responsivos
Menú hamburguesa, galería en cuadrícula, detalle de producto en una columna, formularios con Row/Col, tabla del panel con scroll, carrito en columna.

## Documentación de pruebas
Ver `plan_de_pruebas.md` (54 pruebas unitarias con patrón AAA).
