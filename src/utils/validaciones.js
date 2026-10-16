// ============================================================
// Validaciones de formularios (migradas desde js/validaciones.js).
// Cada función recibe el valor y devuelve:
//   ''            -> el valor es válido
//   'mensaje...'  -> texto del error que se muestra bajo el campo
// Al ser funciones puras (sin DOM) son fáciles de probar con Vitest.
// ============================================================

const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s-]+$/

export function validarNombreCompleto(valor) {
  const texto = valor.trim()
  if (texto.length < 10 || !SOLO_LETRAS.test(texto)) {
    return 'El nombre completo debe tener al menos 10 caracteres y contener solo letras.'
  }
  return ''
}

// Formato: 7 u 8 dígitos, un guión y un dígito verificador (número o K)
export function validarRut(valor) {
  if (!/^[0-9]{7,8}-[0-9Kk]{1}$/.test(valor.trim())) {
    return 'El RUT debe tener el formato 12345678-9.'
  }
  return ''
}

// Solo se aceptan los dominios gmail.com, outlook.com y duocuc.cl
export function validarCorreo(valor) {
  if (!/^[a-zA-Z._%+-]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(valor.trim())) {
    return 'El correo debe contener solo letras antes del @ y usar un dominio válido (gmail.com, outlook.com o duocuc.cl).'
  }
  return ''
}

// Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
export function validarPassword(valor) {
  if (
    valor.trim().length < 8 ||
    !/[A-Z]/.test(valor) ||
    !/\d/.test(valor) ||
    !/[^A-Za-z0-9]/.test(valor)
  ) {
    return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.'
  }
  return ''
}

export function validarTelefono(valor) {
  if (!/^(?:\+?56\s?9\s?\d{4}\s?\d{4}|9?\d{8})$/.test(valor.trim())) {
    return 'El teléfono debe tener el formato +56 9 1234 5678.'
  }
  return ''
}

export function validarNombreMascota(valor) {
  const texto = valor.trim()
  if (texto.length < 5 || !SOLO_LETRAS.test(texto)) {
    return 'El nombre de la mascota debe tener al menos 5 caracteres y solo puede contener letras.'
  }
  return ''
}

// Campo opcional: puede quedar vacío, pero si se escribe solo acepta letras
export function validarRaza(valor) {
  if (valor.trim() !== '' && !SOLO_LETRAS.test(valor.trim())) {
    return 'La raza solo puede contener letras.'
  }
  return ''
}

// Campo opcional: entero entre 0 y 50
export function validarEdad(valor) {
  const texto = String(valor).trim()
  if (texto !== '' && (!/^\d+$/.test(texto) || Number(texto) < 0 || Number(texto) > 50)) {
    return 'La edad debe ser un número entero entre 0 y 50.'
  }
  return ''
}

// Campo opcional: número positivo, por ejemplo 25.5
export function validarPeso(valor) {
  const texto = String(valor).trim()
  if (texto !== '' && !/^\d+(\.\d+)?$/.test(texto)) {
    return 'El peso debe ser un número válido, por ejemplo 25.5.'
  }
  return ''
}

export function validarTipoMascota(valor) {
  return valor === '' ? 'Debe seleccionar el tipo de mascota.' : ''
}

// Campo opcional: solo números y mínimo 5 dígitos
export function validarMicrochip(valor) {
  if (valor.trim() !== '' && !/^\d{5,}$/.test(valor.trim())) {
    return 'El microchip no debe contener letras y debe tener al menos 5 números.'
  }
  return ''
}

// ---------- Validadores por formulario ----------
// Devuelven un objeto { campo: 'mensaje' } solo con los campos que tienen error.
// Si el objeto está vacío, el formulario es válido.

function quitarVacios(errores) {
  const resultado = {}
  Object.keys(errores).forEach((campo) => {
    if (errores[campo]) resultado[campo] = errores[campo]
  })
  return resultado
}

export function validarRegistro(d) {
  return quitarVacios({
    nombre: validarNombreCompleto(d.nombre),
    rut: validarRut(d.rut),
    email: validarCorreo(d.email),
    password: validarPassword(d.password),
    telefono: validarTelefono(d.telefono),
    nombreMascota: validarNombreMascota(d.nombreMascota),
    tipoMascota: validarTipoMascota(d.tipoMascota),
    raza: validarRaza(d.raza),
    edad: validarEdad(d.edad),
    peso: validarPeso(d.peso),
    microchip: validarMicrochip(d.microchip),
    visitaAnterior: d.visitaAnterior === '' ? 'Indica si has visitado antes la veterinaria.' : '',
  })
}

export function validarLogin(d) {
  return quitarVacios({
    email: d.email.trim() === '' ? 'Ingresa tu correo.' : '',
    password: d.password.trim() === '' ? 'Ingresa tu contraseña.' : '',
  })
}

// Formulario del Panel de Control (alta de producto).
export function validarProducto(d) {
  const precio = Number(d.precio)
  const stock = Number(d.stock)
  return quitarVacios({
    nombre: d.nombre.trim().length < 5 ? 'El nombre debe tener al menos 5 caracteres.' : '',
    descripcion: d.descripcion.trim().length < 10 ? 'La descripción debe tener al menos 10 caracteres.' : '',
    precio: !/^\d+$/.test(String(d.precio).trim()) || precio <= 0 ? 'El precio debe ser un número entero mayor a 0.' : '',
    stock: !/^\d+$/.test(String(d.stock).trim()) || stock < 0 ? 'El stock debe ser un número entero (0 o más).' : '',
    categoria: d.categoria === '' ? 'Selecciona una categoría.' : '',
    mascotas: d.mascotas.length === 0 ? 'Selecciona al menos un tipo de mascota.' : '',
  })
}

// Formulario "Agendar cita".
export function validarCita(d, hoy = new Date()) {
  let errorFecha = ''
  if (d.fecha === '') {
    errorFecha = 'Selecciona una fecha.'
  } else {
    const fecha = new Date(d.fecha + 'T00:00:00')
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
    if (fecha < inicioHoy) errorFecha = 'La fecha no puede ser anterior a hoy.'
  }
  return quitarVacios({
    nombre: validarNombreCompleto(d.nombre),
    email: validarCorreo(d.email),
    telefono: validarTelefono(d.telefono),
    nombreMascota: validarNombreMascota(d.nombreMascota),
    tipoMascota: validarTipoMascota(d.tipoMascota),
    fecha: errorFecha,
  })
}

// Formulario de pago (checkout) del carrito.
export function validarCheckout(d) {
  return quitarVacios({
    nombre: validarNombreCompleto(d.nombre),
    telefono: validarTelefono(d.telefono),
    direccion: d.entrega === 'despacho' && d.direccion.trim().length < 5 ? 'Ingresa la dirección de despacho.' : '',
    metodoPago: d.metodoPago === '' ? 'Selecciona un método de pago.' : '',
    confirmaReceta:
      d.exigirReceta && !d.confirmaReceta ? 'Debes confirmar que cuentas con la receta veterinaria.' : '',
  })
}
