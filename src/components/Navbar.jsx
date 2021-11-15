import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className="bg-green-900">
            <ul className="flex h-full justify-between my-4 "> 
                <li></li>
               
                <li className= "flex - flex-col p-3 px-4">
                    <button 
                    onClick={() => loginWithRedirect({ returnTo: "http://localhost:3000/admin" })}className=" bg-indigo-100 w-60 p-2 rounded-lg hover:bg-indigo-300">Iniciar Sesión</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
