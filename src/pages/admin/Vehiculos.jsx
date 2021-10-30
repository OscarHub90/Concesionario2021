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
    return <div>Acá va el formulario para crear productos</div>
};

export default Vehiculos
