import Modal from 'react-bootstrap/Modal'
import Boton from '../atoms/Boton'

// Molécula: confirmación para acciones destructivas. Se usa antes de eliminar
// un producto para que la acción no ocurra por un clic accidental.
function ModalConfirmacion({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = 'Eliminar',
  textoProcesando = 'Eliminando...',
  tema = 'claro',
  procesando = false,
  onConfirmar,
  onCerrar,
}) {
  return (
    <Modal
      show={abierto}
      onHide={procesando ? undefined : onCerrar}
      centered
      backdrop="static"
      contentClassName={`modal-veterinaria ${tema === 'oscuro' ? 'modal-oscuro' : ''}`}
      aria-labelledby="titulo-modal-confirmacion"
    >
      <Modal.Header closeButton={!procesando}>
        <Modal.Title id="titulo-modal-confirmacion">{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Boton variante="secundario" onClick={onCerrar} disabled={procesando}>
          Cancelar
        </Boton>
        <Boton variante="peligro" onClick={onConfirmar} disabled={procesando}>
          {procesando ? textoProcesando : textoConfirmar}
        </Boton>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirmacion
