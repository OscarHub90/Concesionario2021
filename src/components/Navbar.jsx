import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className="bg-red-300">
            <ul className="flex h-full justify-between my-4 "> 
                <li>Logo</li>
                <li>Logo</li>
                <li>Navegación 1</li>
                <li>Navegación 2</li>
                <li>navegación 3</li>
                <li className= "px-4">
                    <button 
                    onClick={() => loginWithRedirect()}className=" bg-indigo-100 px-2 rounded-lg hover:bg-indigo-300">Iniciar Sesión</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
