import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../services/api'

// El catálogo es público en el backend, así que sirve como "ping" liviano.
const URL_SALUD = `${API_URL}/api/productos`
const INTERVALO_POR_DEFECTO = 30000
const TIMEOUT = 6000

// Comprueba cada 30 s si el backend responde y expone el estado para mostrarlo
// en la interfaz. En las pruebas unitarias no se hace red para mantenerlas deterministas.
export function useConexionBackend({ intervalo = INTERVALO_POR_DEFECTO } = {}) {
  const esPrueba = import.meta.env.MODE === 'test'
  const [estado, setEstado] = useState(esPrueba ? 'sin-verificar' : 'verificando')
  const [ultimaRevision, setUltimaRevision] = useState(null)
  const [error, setError] = useState('')
  const montado = useRef(true)

  const verificar = useCallback(async () => {
    if (import.meta.env.MODE === 'test') return true

    try {
      await axios.get(URL_SALUD, { timeout: TIMEOUT })
      if (!montado.current) return true
      setEstado('conectado')
      setError('')
      setUltimaRevision(new Date())
      return true
    } catch (fallo) {
      if (!montado.current) return false
      setEstado('desconectado')
      setError(
        fallo?.response
          ? `El backend respondió con un error ${fallo.response.status}.`
          : 'No se pudo conectar con el backend.',
      )
      setUltimaRevision(new Date())
      return false
    }
  }, [])

  useEffect(() => {
    montado.current = true
    if (import.meta.env.MODE === 'test') return undefined

    // Se aplaza la primera comprobación para no actualizar estado de forma
    // síncrona dentro del efecto (regla react-hooks/set-state-in-effect).
    const inicial = setTimeout(verificar, 0)
    const id = setInterval(verificar, intervalo)
    return () => {
      montado.current = false
      clearTimeout(inicial)
      clearInterval(id)
    }
  }, [intervalo, verificar])

  return { estado, ultimaRevision, error, verificar, url: API_URL }
}
