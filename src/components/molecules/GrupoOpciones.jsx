import Form from 'react-bootstrap/Form'

// Molécula: grupo de radios o checkboxes (React Bootstrap Form.Check).
//  - tipo "radio": "seleccion" es un texto con el valor elegido.
//  - tipo "checkbox": "seleccion" es un arreglo con los valores marcados.
function GrupoOpciones({ nombre, etiqueta, tipo = 'checkbox', opciones, seleccion, onCambio, error }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="d-block">{etiqueta}</Form.Label>
      {opciones.map((opcion) => (
        <Form.Check
          inline
          key={opcion.valor}
          type={tipo}
          id={`${nombre}-${opcion.valor}`}
          name={nombre}
          value={opcion.valor}
          label={opcion.etiqueta}
          checked={tipo === 'radio' ? seleccion === opcion.valor : seleccion.includes(opcion.valor)}
          onChange={onCambio}
          isInvalid={Boolean(error)}
        />
      ))}
      {error && <div className="text-danger small mt-1">{error}</div>}
    </Form.Group>
  )
}

export default GrupoOpciones
