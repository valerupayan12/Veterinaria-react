import imgTarjetaAccesorioJuguete from '../assets/img/tarjeta-accesorio_juguete.jpg'
import imgTarjetaAlimentoPremiun from '../assets/img/tarjeta-alimento_premiun.jpg'
import imgTarjetaCirugiaMenor from '../assets/img/tarjeta-cirugiaMenor.jpg'
import imgTarjetaConsultaMedica from '../assets/img/tarjeta-consulta_medica.jpg'
import imgTarjetaControlpeso from '../assets/img/tarjeta-controlpeso.jpg'
import imgTarjetaVacunacion from '../assets/img/tarjeta-vacunacion.jpg'

// Servicios de la clínica (migrados desde consultaMedicoGeneral.html y vacunacion.html).
// Solo los servicios con "detalle" tienen página propia (/servicio/:id).
export const servicios = [
  {
    id: 'consulta-medica',
    nombre: 'Consulta Médica General',
    imagen: imgTarjetaConsultaMedica,
    precio: 18000,
    insignia: 'Servicio destacado',
    detalle:
      'Atención veterinaria integral para perros, gatos, conejos y aves. Evaluamos el estado general de tu mascota, revisamos signos vitales, historial clínico y realizamos recomendaciones para prevenir enfermedades.',
    beneficios: [
      'Revisión general y valoración clínica',
      'Control de vacunas y salud preventiva',
      'Diagnóstico inicial de síntomas comunes',
      'Recomendaciones personalizadas para tu mascota',
    ],
    info: [
      { titulo: 'Horarios', texto: 'Atención de lunes a sábado en horario de mañana y tarde.' },
      { titulo: 'Incluye', texto: 'Examen general, control de peso, revisión de conducta y recomendaciones.' },
      { titulo: 'Disponibilidad', texto: 'Citas disponibles con prioridad para urgencias y nuevas consultas.' },
    ],
  },
  {
    id: 'vacunacion',
    nombre: 'Vacunación e Inmunización',
    imagen: imgTarjetaVacunacion,
    precio: 22000,
    insignia: 'Servicio preventivo',
    detalle:
      'Programa de vacunación para perros, gatos, conejos y aves, diseñado para proteger a tu mascota contra enfermedades comunes, fortalecer su sistema inmune y prevenir complicaciones graves en el futuro.',
    beneficios: [
      'Protección frente a enfermedades frecuentes',
      'Fortalece el sistema inmune de tu mascota',
      'Control de calendario de vacunación',
      'Revisión rápida y atención profesional',
    ],
    info: [
      { titulo: 'Incluye', texto: 'Vacuna aplicada por veterinario, control de salud y esquema de refuerzo.' },
      { titulo: 'Recomendación', texto: 'Ideal para cachorros, adultos y animales con historial de salud incompleto.' },
      { titulo: 'Disponibilidad', texto: 'Citas agendadas con atención preferente para mascotas nuevas.' },
    ],
  },
]

// Tarjetas de la galería de la página de inicio (sección "Servicios Destacados").
// Las que no tienen "ruta" no muestran botón, igual que en el sitio original.
export const tarjetasInicio = [
  {
    id: 't1',
    titulo: 'Consulta Médica General',
    descripcion: 'Evaluación clínica completa para perritos y gatitos.',
    imagen: imgTarjetaConsultaMedica,
    ruta: '/servicio/consulta-medica',
  },
  {
    id: 't2',
    titulo: 'Vacunación e Inmunización',
    descripcion: 'Protección contra parvovirus, rabia y profilaxis completa.',
    imagen: imgTarjetaVacunacion,
    ruta: '/servicio/vacunacion',
  },
  {
    id: 't3',
    titulo: 'Cirugía Menor',
    descripcion: 'Procedimientos seguros y controlados para esterilización y atención veterinaria menor.',
    imagen: imgTarjetaCirugiaMenor,
  },
  {
    id: 't4',
    titulo: 'Control de Peso',
    descripcion: 'Plan nutricional y seguimiento para mejorar salud, movilidad y calidad de vida.',
    imagen: imgTarjetaControlpeso,
  },
  {
    id: 't5',
    titulo: 'Alimento Premium',
    descripcion: 'Nutrición especializada recomendada por médicos veterinarios.',
    imagen: imgTarjetaAlimentoPremiun,
    ruta: '/productos',
  },
  {
    id: 't6',
    titulo: 'Accesorios y Juguetes',
    descripcion: 'Correas, collares y juguetes didácticos para el entretenimiento en casa.',
    imagen: imgTarjetaAccesorioJuguete,
    ruta: '/productos',
  },
]

// Opciones del formulario "Agendar cita" (el precio de la consulta viene del sitio original).
export const serviciosCita = [
  { valor: 'consulta-medica-general', etiqueta: 'Consulta médica general - $18.000' },
  { valor: 'vacunacion', etiqueta: 'Vacunación' },
  { valor: 'control', etiqueta: 'Control veterinario' },
]
