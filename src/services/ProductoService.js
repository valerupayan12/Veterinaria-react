import axios from 'axios'
import { API_URL } from './api'

// Misma estructura que el ejemplo BookService visto en clase.
const BASE_URL = `${API_URL}/api/productos`

class ProductoService {
  getAllProductos() {
    return axios.get(BASE_URL)
  }

  getProductoById(id) {
    return axios.get(`${BASE_URL}/${id}`)
  }

  createProducto(producto) {
    return axios.post(BASE_URL, producto)
  }

  updateProducto(id, producto) {
    return axios.put(`${BASE_URL}/${id}`, producto)
  }

  deleteProducto(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}

export default new ProductoService()
