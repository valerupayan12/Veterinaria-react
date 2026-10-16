# Plan de Pruebas Unitarias

**Proyecto:** Veterinaria San Marcos (migración a React)
<br />

**Herramientas:** Vitest + React Testing Library + jsdom
<br />

**Patrón:** AAA (Arrange, Act, Assert)
<br />

**Componentes / módulos críticos evaluados:** validaciones de formularios, lógica del carrito, filtrado y creación de productos, sesión con localStorage, rutas privadas, tarjeta de producto, formulario de login, formulario de producto (Panel de Control) y comportamiento de `App` (tema, carrito, filtro, 404).

**Cómo ejecutar:** `npm test` (modo interactivo) o `npx vitest run` (una sola vez).

| ID | Componente<br>*(describe)* | Caso de Prueba<br>*(it / test)* | Preparación<br>*(Arrange)* | Acción<br>*(Act)* | Resultado Esperado<br>*(Assert)* | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **PU-001** | `validaciones` | Rechaza un nombre de menos de 10 caracteres | Texto "Juan" | `validarNombreCompleto` | Devuelve un mensaje de error | Pasa |
| **PU-002** | `validaciones` | Acepta un nombre completo válido con tildes | "María González Pérez" | `validarNombreCompleto` | Devuelve `''` | Pasa |
| **PU-003** | `validaciones` | Valida el formato del RUT | RUT `12345678-9` y `12.345.678-9` | `validarRut` | El primero es válido, el segundo da error | Pasa |
| **PU-004** | `validaciones` | Solo acepta dominios gmail, outlook y duocuc | `ana@duocuc.cl` y `ana@yahoo.com` | `validarCorreo` | El primero es válido, el segundo da error | Pasa |
| **PU-005** | `validaciones` | Exige contraseña segura | `abc12345` y `Clave.1234` | `validarPassword` | La débil da error, la fuerte es válida | Pasa |
| **PU-006** | `validaciones` | Valida teléfono chileno | `+56 9 1234 5678` y `12345` | `validarTelefono` | El primero es válido, el segundo da error | Pasa |
| **PU-007** | `validaciones` | Microchip opcional, pero con 5+ números si se escribe | `''`, `12ab5`, `123456` | `validarMicrochip` | Vacío OK, con letras error, 6 números OK | Pasa |
| **PU-008** | `validaciones` | Registro con campos vacíos devuelve errores | Objeto con todos los campos vacíos | `validarRegistro` | Hay error en los obligatorios y no en `raza` (opcional) | Pasa |
| **PU-009** | `validaciones` | Producto exige precio > 0 y una mascota | Precio `0` y `mascotas: []` | `validarProducto` | Errores en `precio` y `mascotas`, no en `nombre` | Pasa |
| **PU-010** | `validaciones` | Cita no acepta fechas pasadas | Hoy = 15-10-2026, fecha 01-10-2026 | `validarCita` | Error "anterior a hoy" en `fecha` | Pasa |
| **PU-011** | `carrito` | Agrega un producto nuevo | Carrito vacío | `agregarAlCarrito` | `[{ id: 1, cantidad: 1 }]` | Pasa |
| **PU-012** | `carrito` | Producto repetido suma una unidad | Carrito con el producto (cant. 1) | `agregarAlCarrito` | Cantidad = 2 | Pasa |
| **PU-013** | `carrito` | No supera el stock | Cantidad 3, stock 3 | `agregarAlCarrito` | Cantidad sigue en 3 | Pasa |
| **PU-014** | `carrito` | Cantidad 0 elimina el producto | Cantidad 1 | `cambiarCantidad(-1)` | Carrito vacío | Pasa |
| **PU-015** | `carrito` | Calcula el subtotal | 2 x $10.000 + 1 x $5.000 | `calcularSubtotal` | 25000 | Pasa |
| **PU-016** | `carrito` | Despacho gratis desde $20.000 | Montos 20000, 19999 y retiro | `calcularDespacho` | 0 / costo de despacho / 0 | Pasa |
| **PU-017** | `carrito` | Quitar producto y contar unidades | Carrito con 2 productos (2 y 3 unid.) | `quitarDelCarrito`, `contarUnidades` | Queda 1 producto; total 5 unidades | Pasa |
| **PU-018** | `productos` | Filtra por mascota y categoría | Catálogo inicial, `alimento` + `conejo` | `filtrarProductos` | Todos los resultados cumplen ambos filtros | Pasa |
| **PU-019** | `productos` | Búsqueda por texto sin distinguir mayúsculas | Texto "JAULA" | `filtrarProductos` | Resultados con "jaula" en nombre/descripción | Pasa |
| **PU-020** | `productos` | Crear producto asigna id e imagen genérica | Datos de formulario + catálogo | `crearProducto` | id = 24, imagen por defecto, precio numérico | Pasa |
| **PU-021** | `sesion` | Autentica al administrador estático | `admin@duocuc.cl` / `Admin.123` | `autenticar` | Devuelve usuario con rol `admin` | Pasa |
| **PU-022** | `sesion` | Rechaza credenciales incorrectas | Clave errónea | `autenticar` | Devuelve `null` | Pasa |
| **PU-023** | `sesion` | Registro de cliente y correo duplicado | Mismo usuario registrado dos veces | `registrarUsuario`, `autenticar` | 1.º `true`, 2.º `false`; rol `cliente` | Pasa |
| **PU-024** | `sesion` | Guarda/borra sesión sin contraseña | Usuario con `password` | `guardarSesion`, `leerSesion`, `cerrarSesion` | Sesión sin `password`; tras cerrar es `null` | Pasa |
| **PU-025** | `TarjetaProducto` | Muestra nombre, precio y enlace al detalle | `productoMock` | `render` | Texto, `$12.990` y `href="/producto/7"` | Pasa |
| **PU-026** | `TarjetaProducto` | "Agregar al carrito" llama a `onAgregar` | `vi.fn()` como `onAgregar` | `fireEvent.click` | Se llamó con el producto | Pasa |
| **PU-027** | `TarjetaProducto` | El corazón llama a `onFavorito` | `vi.fn()` como `onFavorito` | `fireEvent.click` | Se llamó con el id 7 | Pasa |
| **PU-028** | `TarjetaProducto` | Sin stock el botón se deshabilita | Producto con `stock: 0` | `render` | Botón "Sin stock" deshabilitado | Pasa |
| **PU-029** | `FormularioLogin` | Campos vacíos muestran errores | `onIngresar` mock | Click en "Entrar" | Mensajes de error; no se llama a `onIngresar` | Pasa |
| **PU-030** | `FormularioLogin` | Credenciales incorrectas muestran alerta | `onIngresar` devuelve `false` | Escribir datos y enviar | Alerta "Correo o contraseña incorrectos" | Pasa |
| **PU-031** | `FormularioProducto` | No crea producto con datos faltantes | `onCrear` mock | Click en "Crear producto" | Errores de categoría y mascota; no se llama `onCrear` | Pasa |
| **PU-032** | `FormularioProducto` | Crea producto con datos válidos | `onCrear` mock | Completar campos y enviar | `onCrear` recibe los datos; aparece confirmación | Pasa |
| **PU-033** | `RutaPrivada` | Sin sesión redirige al login | `localStorage` vacío | Render en `/protegida` | Se ve "Pantalla de login" | Pasa |
| **PU-034** | `RutaPrivada` | Con sesión muestra el contenido | `sesion` guardada en `localStorage` | Render | Se ve el contenido protegido | Pasa |
| **PU-035** | `RutaPrivada` | Cliente no entra a ruta de administrador | Sesión con rol `cliente` | Render con `soloAdmin` | Redirige a `/perfil` | Pasa |
| **PU-036** | `App` | Alterna el tema claro/oscuro | Render en `/` | Click en el botón de tema | `data-tema="oscuro"` y se guarda en `localStorage` | Pasa |
| **PU-037** | `App` | El carrito actualiza el contador del menú | Render en `/productos` | Agregar 2 productos | Menú muestra "Carrito (2)" | Pasa |
| **PU-038** | `App` | El filtro reduce los productos | Render en `/productos` | Elegir mascota "pajaro" | "Mostrando 5 de 23" | Pasa |
| **PU-039** | `App` | Ruta inexistente muestra 404 | Ruta `/esta-ruta-no-existe` | Render | Se ve "Error 404" | Pasa |
| **PU-040** | `App` | Producto inexistente muestra 404 | Ruta `/producto/9999` | Render | Se ve "Error 404" | Pasa |
| **PU-041** | `App` | `/admin` sin sesión va al login | `localStorage` vacío | Render en `/admin` | Se ve el formulario de login | Pasa |
| **PU-042** | `App` | `/admin` con sesión admin muestra el panel | Sesión admin en `localStorage` | Render en `/admin` | Se ve "Registrar nuevo producto" | Pasa |
