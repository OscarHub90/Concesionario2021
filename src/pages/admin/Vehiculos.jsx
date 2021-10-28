import React, {useEffect} from 'react'

const Vehiculos = () => {
    return (
    // se agrega la tabla para crear nuevos productos.
        <form className="flex flex-col">
            <h2 className=" text-lg m-4">Formulario creación de vehículos</h2>
        
            <input type="text" placeholder= "Descripción" />
            <input type="text" placeholder= "Marca"/>
            <input type="text" placeholder= "Modelo"/>
            <button className=" bg-blue-600 text-white rounded-lg  hover:bg-purple-800">Ingresar Datos</button>
        </form> 
    )
}
export default Vehiculos
