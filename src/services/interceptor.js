// Interceptor de axios: agrega el token JWT a todas las peticiones.
// El backend protege /api/** con Spring Security, por lo que sin este header
// las llamadas responden 401/403.
import axios from 'axios'
import { leerToken } from '../utils/sesion'

axios.interceptors.request.use((config) => {
  const token = leerToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
