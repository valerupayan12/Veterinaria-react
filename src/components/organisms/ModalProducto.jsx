import Modal from 'react-bootstrap/Modal'
import FormularioProducto from './FormularioProducto'

// Organismo: ventana para crear o editar un producto sin salir del catálogo.
// Reutiliza el mismo formulario del Panel de Control.
function ModalProducto({ abierto, producto = null, tema = 'claro', onGuardar, onCerrar }) {
  const editando = Boolean(producto)

  return (
    <Modal
      show={abierto}
      onHide={onCerrar}
      centered
      size="lg"
      backdrop="static"
      contentClassName={`modal-veterinaria ${tema === 'oscuro' ? 'modal-oscuro' : ''}`}
      aria-labelledby="titulo-modal-producto"
    >
      <Modal.Header closeButton>
        <Modal.Title id="titulo-modal-producto">
          {editando ? `Editar «${producto.nombre}»` : 'Nuevo producto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormularioProducto
          key={producto?.id ?? 'nuevo'}
          valorInicial={producto}
          onCrear={onGuardar}
          onCancelar={onCerrar}
          onExito={onCerrar}
        />
      </Modal.Body>
    </Modal>
  )
}

export default ModalProducto
