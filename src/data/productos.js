import imgTarejtaSetPerchasMadera from '../assets/img/tarejta-setPerchasMadera.jpg'
import imgTarjetaAlimentoConejo from '../assets/img/tarjeta-alimentoConejo.jpg'
import imgTarjetaAlimentoEsterilFelino from '../assets/img/tarjeta-alimentoEsterilFelino.jpg'
import imgTarjetaAlimentoHamster from '../assets/img/tarjeta-alimentoHamster.jpg'
import imgTarjetaAlimentoPajaros from '../assets/img/tarjeta-alimentoPajaros.jpg'
import imgTarjetaAlimentoPremium from '../assets/img/tarjeta-alimentoPremium.jpg'
import imgTarjetaArenaPajaros from '../assets/img/tarjeta-arenaPajaros.jpg'
import imgTarjetaCamaAcolchada from '../assets/img/tarjeta-camaAcolchada.jpg'
import imgTarjetaCasillaConejo from '../assets/img/tarjeta-casillaConejo.jpg'
import imgTarjetaCorralConejo from '../assets/img/tarjeta-corralConejo.jpg'
import imgTarjetaDesparasitante from '../assets/img/tarjeta-desparasitante.jpg'
import imgTarjetaHenoTimothyConejos from '../assets/img/tarjeta-henoTimothyConejos.jpg'
import imgTarjetaImagenProductos from '../assets/img/tarjeta-imagenProductos.jpg'
import imgTarjetaJaulaHamster from '../assets/img/tarjeta-jaulaHamster.jpg'
import imgTarjetaJaulaPajaros from '../assets/img/tarjeta-jaulaPajaros.jpg'
import imgTarjetaJugueteConejo from '../assets/img/tarjeta-jugueteConejo.jpg'
import imgTarjetaJugueteMordedor from '../assets/img/tarjeta-jugueteMordedor.jpg'
import imgTarjetaJuguetesPajaros from '../assets/img/tarjeta-juguetesPajaros.jpg'
import imgTarjetaLechoHamster from '../assets/img/tarjeta-lechoHamster.jpg'
import imgTarjetaPipetaAntipulgas from '../assets/img/tarjeta-pipetaAntipulgas.jpg'
import imgTarjetaRuedaHamster from '../assets/img/tarjeta-ruedaHamster.jpg'
import imgTarjetaSuplementoHamster from '../assets/img/tarjeta-suplementoHamster.jpg'
import imgTarjetaTunelesPvcHamster from '../assets/img/tarjeta-tunelesPvcHamster.jpg'
import imgTarjetaVerduraConejo from '../assets/img/tarjeta-verduraConejo.jpg'
import videoPermacatvideo from '../assets/video/permacatvideo.mp4'

// Catálogo inicial de productos (migrado desde productos.html).
// Las imágenes viven en /public/img, por eso se referencian con ruta absoluta.
// stock: cantidad disponible (campo agregado para el carrito y el panel de control).
export const productos = [
  {
    id: 1,
    nombre: "Alimento Premium Perro Adulto 15kg",
    descripcion: "Fórmula balanceada alta en proteínas y vitaminas.",
    precio: 25990,
    imagen: imgTarjetaAlimentoPremium,
    categoria: 'alimento',
    mascotas: ["perro"],
    stock: 15,
    requiereReceta: false,
  },
  {
    id: 2,
    nombre: "Alimento Felino Estéril 3kg",
    descripcion: "Control de peso e higiene urinaria para gatos.",
    precio: 14990,
    imagen: imgTarjetaAlimentoEsterilFelino,
    categoria: 'alimento',
    mascotas: ["gato"],
    stock: 9,
    requiereReceta: false,
    destacado: 'Más vendido',
    detalle: 'Fórmula diseñada para gatos adultos esterilizados, con control de peso, salud urinaria y digestión equilibrada. Ideal para mantener el bienestar de tu mascota con una nutrición completa y sabrosa.',
    beneficios: [
      'Control de peso y reducción de grasa',
      'Apoya la salud urinaria y digestiva',
      'Proteínas de alta calidad y vitaminas esenciales',
      'Sin sabor artificial',
    ],
    video: videoPermacatvideo,
  },
  {
    id: 3,
    nombre: "Pipeta Antipulgas y Garrapatas",
    descripcion: "Protección mensual efectiva para mascotas.",
    precio: 8990,
    imagen: imgTarjetaPipetaAntipulgas,
    categoria: 'farmacia',
    mascotas: ["perro", "gato"],
    stock: 16,
    requiereReceta: true,
  },
  {
    id: 4,
    nombre: "Desparasitante Interno Multidosis",
    descripcion: "Elimina parásitos intestinales en perros y gatos.",
    precio: 6500,
    imagen: imgTarjetaDesparasitante,
    categoria: 'farmacia',
    mascotas: ["perro", "gato"],
    stock: 10,
    requiereReceta: true,
  },
  {
    id: 5,
    nombre: "Cama Acolchada Lavable Talla L",
    descripcion: "Máximo confort y tela resistente para tu mascota.",
    precio: 18990,
    imagen: imgTarjetaCamaAcolchada,
    categoria: 'accesorios',
    mascotas: ["perro", "gato"],
    stock: 17,
    requiereReceta: false,
  },
  {
    id: 6,
    nombre: "Juguete Mordedor Interactivo",
    descripcion: "Fomenta la salud dental y reduce el estrés.",
    precio: 5490,
    imagen: imgTarjetaJugueteMordedor,
    categoria: 'accesorios',
    mascotas: ["perro"],
    stock: 11,
    requiereReceta: false,
  },
  {
    id: 7,
    nombre: "Alimento Especializado para Conejos",
    descripcion: "Mix de heno y pellets con fibra y vitaminas esenciales.",
    precio: 12990,
    imagen: imgTarjetaAlimentoConejo,
    categoria: 'alimento',
    mascotas: ["conejo"],
    stock: 18,
    requiereReceta: false,
  },
  {
    id: 8,
    nombre: "Casilla de Descanso para Conejo",
    descripcion: "Refugio cómodo y seguro con ventilación. Ideal para interiores.",
    precio: 16490,
    imagen: imgTarjetaCasillaConejo,
    categoria: 'accesorios',
    mascotas: ["conejo"],
    stock: 12,
    requiereReceta: false,
  },
  {
    id: 9,
    nombre: "Juguete Mordedor Madera para Conejo",
    descripcion: "Juguetes de madera natural 100% seguros para roer. Pack x3.",
    precio: 7990,
    imagen: imgTarjetaJugueteConejo,
    categoria: 'accesorios',
    mascotas: ["conejo"],
    stock: 19,
    requiereReceta: false,
  },
  {
    id: 10,
    nombre: "Alimento Premium para Hámster",
    descripcion: "Mezcla nutritiva de granos, semillas y vegetales deshidratados.",
    precio: 4990,
    imagen: imgTarjetaAlimentoHamster,
    categoria: 'alimento',
    mascotas: ["hamster"],
    stock: 13,
    requiereReceta: false,
  },
  {
    id: 11,
    nombre: "Jaula Completa para Hámster 40x40cm",
    descripcion: "Jaula con accesorios: rueda, comedero, bebedero y casa.",
    precio: 19990,
    imagen: imgTarjetaJaulaHamster,
    categoria: 'accesorios',
    mascotas: ["hamster"],
    stock: 20,
    requiereReceta: false,
  },
  {
    id: 12,
    nombre: "Rueda de Ejercicio Silenciosa para Hámster",
    descripcion: "Rueda de 20cm sin ruido con cojinetes de precisión.",
    precio: 9990,
    imagen: imgTarjetaRuedaHamster,
    categoria: 'accesorios',
    mascotas: ["hamster"],
    stock: 14,
    requiereReceta: false,
  },
  {
    id: 13,
    nombre: "Heno Premium Timothy para Conejos 1kg",
    descripcion: "Heno de alta calidad, fibra natural para digestión óptima.",
    precio: 6990,
    imagen: imgTarjetaHenoTimothyConejos,
    categoria: 'alimento',
    mascotas: ["conejo"],
    stock: 8,
    requiereReceta: false,
  },
  {
    id: 14,
    nombre: "Mix de Verduras Deshidratadas para Conejo",
    descripcion: "Zanahorias, manzana y perejil deshidratados. Snack saludable.",
    precio: 5490,
    imagen: imgTarjetaVerduraConejo,
    categoria: 'alimento',
    mascotas: ["conejo"],
    stock: 15,
    requiereReceta: false,
  },
  {
    id: 15,
    nombre: "Corral Portátil para Conejo 120x100cm",
    descripcion: "Recinto seguro para ejercitarse al aire libre. Fácil de transportar.",
    precio: 24990,
    imagen: imgTarjetaCorralConejo,
    categoria: 'accesorios',
    mascotas: ["conejo"],
    stock: 9,
    requiereReceta: false,
  },
  {
    id: 16,
    nombre: "Túneles de PVC para Hámster Pack x4",
    descripcion: "Túneles conectables para crear circuitos de diversión.",
    precio: 8490,
    imagen: imgTarjetaTunelesPvcHamster,
    categoria: 'accesorios',
    mascotas: ["hamster"],
    stock: 16,
    requiereReceta: false,
  },
  {
    id: 17,
    nombre: "Suplemento Vitamínico para Hámster",
    descripcion: "Complejo vitamínico en forma de grageas nutritivas.",
    precio: 4690,
    imagen: imgTarjetaSuplementoHamster,
    categoria: 'farmacia',
    mascotas: ["hamster"],
    stock: 10,
    requiereReceta: true,
  },
  {
    id: 18,
    nombre: "Lecho Sanitario para Hámster 5L",
    descripcion: "Lecho absorbente seguro y confortable para pequeños roedores.",
    precio: 3490,
    imagen: imgTarjetaLechoHamster,
    categoria: 'accesorios',
    mascotas: ["hamster"],
    stock: 17,
    requiereReceta: false,
  },
  {
    id: 19,
    nombre: "Alimento Premium para Pájaros 1kg",
    descripcion: "Mix de semillas variadas con nutrientes esenciales. Para canarios y periquitos.",
    precio: 7990,
    imagen: imgTarjetaAlimentoPajaros,
    categoria: 'alimento',
    mascotas: ["pajaro"],
    stock: 11,
    requiereReceta: false,
  },
  {
    id: 20,
    nombre: "Jaula Completa para Pequeños Pájaros 60x40x60cm",
    descripcion: "Jaula con perchas, comedero, bebedero y casa. Fácil de limpiar.",
    precio: 34990,
    imagen: imgTarjetaJaulaPajaros,
    categoria: 'accesorios',
    mascotas: ["pajaro"],
    stock: 18,
    requiereReceta: false,
  },
  {
    id: 21,
    nombre: "Set de Perchas de Madera Natural Pack x3",
    descripcion: "Perchas de diferentes diámetros para canarios, periquitos y diamantes.",
    precio: 6490,
    imagen: imgTarejtaSetPerchasMadera,
    categoria: 'accesorios',
    mascotas: ["pajaro"],
    stock: 12,
    requiereReceta: false,
  },
  {
    id: 22,
    nombre: "Juguetes Interactivos para Pájaros Pack x4",
    descripcion: "Campanas, espejos y columpios para entretenimiento.",
    precio: 9890,
    imagen: imgTarjetaJuguetesPajaros,
    categoria: 'accesorios',
    mascotas: ["pajaro"],
    stock: 19,
    requiereReceta: false,
  },
  {
    id: 23,
    nombre: "Arena Sanitaria para Pájaros 2kg",
    descripcion: "Arena con minerales para el fondo de la jaula. Higiénica y absorbente.",
    precio: 4290,
    imagen: imgTarjetaArenaPajaros,
    categoria: 'accesorios',
    mascotas: ["pajaro"],
    stock: 13,
    requiereReceta: false,
  },
]

// Imagen genérica para los productos creados desde el Panel de Control (no se suben archivos reales).
export const IMAGEN_POR_DEFECTO = imgTarjetaImagenProductos

export const categorias = [
  { valor: 'alimento', etiqueta: 'Alimento' },
  { valor: 'farmacia', etiqueta: 'Farmacia' },
  { valor: 'accesorios', etiqueta: 'Accesorios' },
]

export const tiposMascota = [
  { valor: 'perro', etiqueta: 'Perro' },
  { valor: 'gato', etiqueta: 'Gato' },
  { valor: 'conejo', etiqueta: 'Conejo' },
  { valor: 'hamster', etiqueta: 'Hámster' },
  { valor: 'pajaro', etiqueta: 'Pájaro' },
]
