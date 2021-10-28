import React from 'react'

const Vehiculos = () => {
    return (
    // se agrega la tabla para crear nuevos productos.
        <form className="flex flex-col">
            <h2 className=" text-lg">Formulario creación de vehículos</h2>
            
            <input type="text" placeholder= "Descripción" />
            <input type="text" placeholder= "Marca"/>
            <input type="text" placeholder= "Modelo"/>
            <button className=" bg-blue-600 text-white">Ingresar Datos</button>
        </form> 
    )
}
export default Vehiculos
