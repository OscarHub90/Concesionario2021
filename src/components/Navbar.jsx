import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-blue-300">
            <ul className="flex h-full justify-between my-4 "> 
                <li>Logo</li>
                <li>Logo</li>
                <li>Navegación 1</li>
                <li>Navegación 2</li>
                <li>navegación 3</li>
                <li className= "px-4">
                    <Link to="/login">
                    <button className=" bg-indigo-100 px-2 rounded-lg hover:bg-indigo-300">Iniciar Sesión</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
