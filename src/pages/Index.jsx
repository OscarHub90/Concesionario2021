import React from 'react'
import Logo from 'media/LogoClav.png'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        
        <div className="flex flex-col justify-center items-center h-full w-full">
            <h1 className="text-5xl text-blue-900 m-5">BIENVENIDOS</h1>
            <Link to="/">
              <img src={Logo} alt="Logo" className="" />
            </Link>
        </div>
        
        
    )
}

export default Index
