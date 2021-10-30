import React, {useEffect, useState} from 'react'

const Vehiculos = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Producto");

    useEffect (() => {
     if (mostrarTabla) {
        setnombreBoton("Crear Nuevo Producto");
    } else {
        setnombreBoton("Mostrar Todos los productos");
    }
    },[mostrarTabla]); 
    return (
        <div>
            <h2>ADMINISTRACIÓN DE PRODUCTOS</h2>
            <button className="rounded-lg  bg-indigo-800 hover:bg-green-600 p-3 m-3 text-lg text-white" 
            onClick = {() => {setmostrarTabla(!mostrarTabla)}} > {nombreBoton} </button>
           
            {mostrarTabla ? 
            <TablaProdructos />
            :<FormularioCreaciónProductos />}
        </div>
    );
}

const TablaProdructos = () => {
    return <div>acá va la tabla de productos</div>
};

const FormularioCreaciónProductos = () => {
    return (<div className="flex flex-col justify-center">
            <h2 className="text-gray-900 font-extrabold">Formulario para productos nuevos</h2>
            <form className= " grid grid-cols-1">
                <input className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" />
                <input className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" />
                <input className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" />
                <input className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" />
                <button className="rounded-full  bg-green-500 hover:bg-green-700 p-3 m-3 text-lg text-white">Guardar Producto</button>
            </form>
          </div>
    )
};

export default Vehiculos
