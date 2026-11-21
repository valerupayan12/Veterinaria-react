import axios from 'axios'
import { API_URL } from './api'

// CRUD de mascotas expuesto por MascotaController.
const BASE_URL = `${API_URL}/api/mascotas`

class MascotaService {
  getAllMascotas() {
    return axios.get(BASE_URL)
  }

  getMascotaById(id) {
    return axios.get(`${BASE_URL}/${id}`)
  }

  createMascota(mascota) {
    return axios.post(BASE_URL, mascota)
  }

  deleteMascota(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}

export default new MascotaService()
