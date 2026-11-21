import axios from 'axios'
import { API_URL } from './api'

// Autenticación JWT del backend: /auth/login y /auth/register.
const BASE_URL = `${API_URL}/auth`

class AuthService {
  login(credenciales) {
    return axios.post(`${BASE_URL}/login`, credenciales)
  }

  register(usuario) {
    return axios.post(`${BASE_URL}/register`, usuario)
  }
}

export default new AuthService()
