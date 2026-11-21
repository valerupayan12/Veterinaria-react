import axios from 'axios'
import { API_URL } from './api'

// CRUD de usuarios expuesto por UsuarioController.
const BASE_URL = `${API_URL}/api/usuarios`

class UsuarioService {
  getAllUsuarios() {
    return axios.get(BASE_URL)
  }

  getUsuarioById(id) {
    return axios.get(`${BASE_URL}/${id}`)
  }

  getPerfil() {
    return axios.get(`${BASE_URL}/perfil`)
  }

  createUsuario(usuario) {
    return axios.post(BASE_URL, usuario)
  }

  deleteUsuario(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}

export default new UsuarioService()
