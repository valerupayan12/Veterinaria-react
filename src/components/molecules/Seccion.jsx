// Molécula: caja blanca con título (la misma .seccion del sitio original).
function Seccion({ id, titulo, children, className = '' }) {
  return (
    <section id={id} className={`seccion ${className}`.trim()}>
      {titulo && <h2>{titulo}</h2>}
      {children}
    </section>
  )
}

export default Seccion
