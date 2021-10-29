import React, {useEffect} from 'react'

const Vehiculos = () => {
    
    useEffect(() => {
    // Primer forma de usar el useEffect, con las variables vacías []
    // cuándo alguna de las variables que están entre los corchetes cambien, se ejecutará la función en este caso solo la primera vez por estar vacías.
    console.log("Hola, me ejecuto solo una vez por tener las variables vacías");
    
    }, []);

    return (
        <form className="flex flex-col">
            <h2 className=" text-lg m-4">Formulario creación de vehículos</h2> 
            <input onChange = {(e) => {
                console.log("Descripción: ",e.target.value)
            }}
            type="text" placeholder= "Descripción" />
            <input type="text" placeholder= "Marca"/>
            <input type="text" placeholder= "Modelo"/>
            <button className=" bg-blue-600 text-white rounded-lg  hover:bg-purple-800">Ingresar Datos</button>
        </form> 
    )
}
export default Vehiculos
