// URL base del backend Spring Boot.
// Se puede sobreescribir con VITE_API_URL en un archivo .env (ver .env.example).
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8081').replace(/\/$/, '')
