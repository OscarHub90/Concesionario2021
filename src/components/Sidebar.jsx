import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'media/LogoClav.png'

const Sidebar = () => {
    return (
        <nav className='w-72 border border-gray-300 h-full flex flex-col p-4 sidebar'>
        <div className="justify-start">
            <img src={Logo} alt="Google" className="h-full w-full" />
        </div>
      <div className='my-4'>
        <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Perfil' />
        <Ruta icono='fas fa-tshirt' ruta='/admin/productos' nombre='Productos' />
        <Ruta icono='fas fa-wallet' ruta='/admin/ventas' nombre='Ventas' />
        <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
      </div>
      <button>Cerrar Sesión</button>

    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <button className='p-1 my-2 bg-green-900 hover:bg-blue-900 hover:scale-75 flex w-full items-center text-white rounded-md'>
        <i className={`${icono} w-10`} />
        {nombre}
      </button>
    </Link>
  );
};

export default Sidebar;