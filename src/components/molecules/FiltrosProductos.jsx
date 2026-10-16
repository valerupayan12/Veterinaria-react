import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Boton from '../atoms/Boton'
import { categorias, tiposMascota } from '../../data/productos'

// Molécula: buscador y filtros del catálogo. Es un componente "controlado":
// los valores y los cambios viven en la página Productos (useState).
function FiltrosProductos({ filtros, onCambio, onLimpiar }) {
  return (
    <Form className="filtros-productos" onSubmit={(e) => e.preventDefault()}>
      <Row className="g-2 align-items-end">
        <Col xs={12} md={5}>
          <Form.Label htmlFor="filtro-texto">Buscar producto</Form.Label>
          <Form.Control
            id="filtro-texto"
            name="texto"
            type="search"
            placeholder="Ej: alimento, jaula, pipeta..."
            value={filtros.texto}
            onChange={onCambio}
          />
        </Col>
        <Col xs={6} md={3}>
          <Form.Label htmlFor="filtro-categoria">Categoría</Form.Label>
          <Form.Select id="filtro-categoria" name="categoria" value={filtros.categoria} onChange={onCambio}>
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.etiqueta}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Label htmlFor="filtro-mascota">Mascota</Form.Label>
          <Form.Select id="filtro-mascota" name="mascota" value={filtros.mascota} onChange={onCambio}>
            <option value="">Todas</option>
            {tiposMascota.map((m) => (
              <option key={m.valor} value={m.valor}>
                {m.etiqueta}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={2}>
          <Boton variante="secundario" onClick={onLimpiar} className="w-100">
            Limpiar
          </Boton>
        </Col>
      </Row>
    </Form>
  )
}

export default FiltrosProductos
