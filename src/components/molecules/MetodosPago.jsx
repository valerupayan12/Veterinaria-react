// Molécula: caja "Métodos de pago" de la página de detalle.
const METODOS = ['Débito', 'Crédito', 'Transferencia', 'PayPal']

function MetodosPago() {
  return (
    <div className="payment-box">
      <h3>Métodos de pago</h3>
      <div className="payment-options">
        {METODOS.map((metodo) => (
          <span key={metodo}>{metodo}</span>
        ))}
      </div>
    </div>
  )
}

export default MetodosPago
