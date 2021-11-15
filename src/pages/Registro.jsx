import React from 'react'
import Logo from 'media/LogoClav.png'
import { Link } from 'react-router-dom'

const Registro = () => {
    return (
        <div className="justify-center">
        <Link to="/admin">
          <img src={Logo} alt="Logo" className=" w-10" />
        </Link>
    </div>
    )
}

export default Registro
