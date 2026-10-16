// Organismo: pie de página.
function Footer({ anio, nombreTienda }) {
  return (
    <footer id="pie">
      <p>
        <small>
          &copy; {anio} {nombreTienda} - Todos los derechos reservados
        </small>
      </p>
    </footer>
  )
}

export default Footer
