import Form from 'react-bootstrap/Form'

// Molécula: campo de formulario con React Bootstrap (etiqueta + control + mensaje de error).
// Sirve para <input>, <textarea> (con "filas") y <select> (con "opciones").
function CampoFormulario({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onCambio,
  error,
  placeholder,
  opciones,
  textoOpcionVacia = '-- Seleccione --',
  filas,
  ...resto
}) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{etiqueta}</Form.Label>

      {opciones ? (
        <Form.Select name={id} value={valor} onChange={onCambio} isInvalid={Boolean(error)} {...resto}>
          <option value="">{textoOpcionVacia}</option>
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.etiqueta}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          name={id}
          as={filas ? 'textarea' : 'input'}
          rows={filas}
          type={filas ? undefined : tipo}
          value={valor}
          onChange={onCambio}
          placeholder={placeholder}
          isInvalid={Boolean(error)}
          {...resto}
        />
      )}

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default CampoFormulario
