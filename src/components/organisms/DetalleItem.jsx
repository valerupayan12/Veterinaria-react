import Insignia from '../atoms/Insignia'
import Precio from '../atoms/Precio'
import InfoCard from '../molecules/InfoCard'
import MetodosPago from '../molecules/MetodosPago'

// Organismo: vista de detalle de un producto o servicio (imagen + información + tarjetas extra).
// Las páginas Producto y Servicio lo reutilizan; los botones llegan por "children".
function DetalleItem({ nombre, imagen, precio, insignia, detalle, beneficios, info, video, children }) {
  return (
    <section className="seccion product-detail">
      <div className="product-layout">
        <div className="product-image-box">
          <img src={imagen} alt={nombre} className="product-main-image" />
        </div>

        <div className="product-info">
          {insignia && <Insignia>{insignia}</Insignia>}
          <h2>{nombre}</h2>
          <div className="product-price-row">
            <Precio valor={precio} grande />
          </div>
          <p className="product-description">{detalle}</p>
          <ul className="product-benefits">
            {beneficios.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div className="action-row">{children}</div>

          {video && (
            <details className="video-details">
              <summary className="btn-secondary">Ver más</summary>
              <div className="video-content">
                <video controls>
                  <source src={video} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>
            </details>
          )}

          <MetodosPago />
        </div>
      </div>

      <div className="extra-info">
        {info.map((i) => (
          <InfoCard key={i.titulo} titulo={i.titulo} texto={i.texto} />
        ))}
      </div>
    </section>
  )
}

export default DetalleItem
