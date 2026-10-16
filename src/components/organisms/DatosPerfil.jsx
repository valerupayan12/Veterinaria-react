import FilaDato from '../molecules/FilaDato'
import { tiposMascota } from '../../data/productos'

// Organismo: datos del usuario que inició sesión (página Mi Perfil).
function DatosPerfil({ usuario }) {
  const tipo = tiposMascota.find((t) => t.valor === usuario.tipoMascota)

  return (
    <dl className="datos-perfil">
      <FilaDato etiqueta="Nombre" valor={usuario.nombre} />
      <FilaDato etiqueta="Correo" valor={usuario.email} />
      <FilaDato etiqueta="Tipo de cuenta" valor={usuario.rol === 'admin' ? 'Administrador' : 'Cliente'} />
      <FilaDato etiqueta="RUT" valor={usuario.rut} />
      <FilaDato etiqueta="Teléfono" valor={usuario.telefono} />
      {usuario.rol !== 'admin' && (
        <>
          <FilaDato etiqueta="Mascota" valor={usuario.nombreMascota} />
          <FilaDato etiqueta="Tipo de mascota" valor={tipo ? tipo.etiqueta : usuario.tipoMascota} />
          <FilaDato etiqueta="Raza" valor={usuario.raza} />
          <FilaDato etiqueta="Edad (años)" valor={usuario.edad} />
          <FilaDato etiqueta="Peso (kg)" valor={usuario.peso} />
          <FilaDato etiqueta="Microchip" valor={usuario.microchip} />
        </>
      )}
    </dl>
  )
}

export default DatosPerfil
