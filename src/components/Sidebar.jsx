import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'media/LogoClav.png'

const Sidebar = () => {
    return (
        <nav className='w-72 border bg-green-800 border-gray-800 border-xl h-full flex flex-col p-4 sidebar'>
        <div className="justify-start">
            <Link to="/admin">
              <img src={Logo} alt="Logo" className="h-full w-full" />
            </Link>
        </div>
      <div className='my-4'>
        <Ruta icono='fas fa-tshirt' ruta='/admin/productos' nombre='Productos' />
        <Ruta icono='fas fa-wallet' ruta='/admin/ventas' nombre='Ventas' />
        <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
      </div>
      <button className= "rounded-lg  bg-green-600 hover:bg-red-600 p-1 m-2 text-lg text-white" > Cerrar Sesión</button>

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