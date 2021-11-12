import React from 'react'
import { Link } from 'react-router-dom'
import Google from 'media/Google2.png'
import Logo from 'media/LogoClav.png'

const Login = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
         <div className="justify-start h-50 w-50">
            <Link to="/admin ">
              <img src={Logo} alt="Logo"/>
            </Link>
        </div>
            <h2 className=" text-center text-2xl text-gray-600 font font-bold">Inicia sesión en tu cuenta</h2>
            <form className="mt-4 max-w-lg">
                <div>
                 <input className="appearance-none relative block w-full focus:outline-none mx0-2 px-3 py-3 m-2 border border-gray-600 rounded-lg" 
                 type="email" placeholder="micorreo@gmail.com" required/>
                 <input className="appearance-none relative block w-full focus:outline-none mx-2 px-3 py-3 border border-gray-600 rounded-lg" 
                 type="password" placeholder="Contraseña" required />
                </div>
                    <label className="w-full flex items-center justify-center m-3" htmlFor="recuérdame">
                    <input className="mx-1" type="checkbox" name ="recuérdame"/>
                    Recuérdame
                    </label>
                <div className="flex justify-center">
                <Link to="/">
                    ¿Olvidaste tu contraseña?
                </Link>
                </div>
                <div max-w-md w-full>
                    <Link to = "/admin">
                    <button className="group relative w-full flex justify-center py-2 px-4 m m-4 border font-medium rounded-md text-lg text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-gray-500"
                    type="submit">
                        Iniciar sesión
                    </button>
                    </Link>
                </div>
                <div className='flex items-center justify-center'>
                  <span className='mx-2'>-------------------------</span>
                  <h2 className='my- text-center text-sm font-bold text-gray-600'>O</h2>
                  <span className='mx-2'>-------------------------</span>
                </div>
                <div>
                    <button type="submit"className="group relative w-full flex justify-center py-2 px-4 m m-4 border text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <div className="flex items-center justify-start">
                        <img src={Google} alt="Google" className="h-7 w-7" />
                    <span className="mx-4">Inicia sesión con Google</span>
                    </div>
               
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
