import axios from 'axios'
import { API_URL } from './api'

// Ventas registradas por VentaController (por ahora solo id y total).
const BASE_URL = `${API_URL}/api/ventas`

class VentaService {
  getAllVentas() {
    return axios.get(BASE_URL)
  }

  getVentaById(id) {
    return axios.get(`${BASE_URL}/${id}`)
  }

  createVenta(venta) {
    return axios.post(BASE_URL, venta)
  }

  deleteVenta(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}

export default new VentaService()
