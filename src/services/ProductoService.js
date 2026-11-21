import axios from 'axios'
import { API_URL } from './api'

// Misma estructura que el ejemplo BookService visto en clase.
// El timeout evita que la UI quede esperando si el backend está apagado.
const BASE_URL = `${API_URL}/api/productos`
const OPCIONES = { timeout: 10000 }

class ProductoService {
  getAllProductos() {
    return axios.get(BASE_URL, OPCIONES)
  }

  getProductoById(id) {
    return axios.get(`${BASE_URL}/${id}`, OPCIONES)
  }

  createProducto(producto) {
    return axios.post(BASE_URL, producto, OPCIONES)
  }

  updateProducto(id, producto) {
    return axios.put(`${BASE_URL}/${id}`, producto, OPCIONES)
  }

  deleteProducto(id) {
    return axios.delete(`${BASE_URL}/${id}`, OPCIONES)
  }
}

export default new ProductoService()
