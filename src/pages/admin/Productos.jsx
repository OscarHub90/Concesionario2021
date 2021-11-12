import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Productos = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Producto");
    const [productos, setproductos] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back

    useEffect (() => {
        // obtenemos las lista de los productos desde el backend. en este caso los datos que se encuentran en el objeto "productos"
        const obtenerProductos = async () => {
            const options = {method: 'GET', url: 'http://localhost:5000/productos'};
             axios
              .request(options)
              .then(function (response) {
                setproductos(response.data);
              })
              .catch(function (error) {
                console.error(error);
              });
        };
        if (mostrarTabla) {
            obtenerProductos();
        }
    }, [mostrarTabla]);

    useEffect (() => {
     if (mostrarTabla) {
        setnombreBoton("Crear Nuevo Producto");
    } else {
        setnombreBoton("Mostrar Todos los productos");
    }
    },[mostrarTabla]); 

    
    return (
        <div className=" items-center h-full w-full m-20 p-20 flex flex-col">
            <h2 className=" text-3xl text-green-700 m-5">ADMINISTRACIÓN DE PRODUCTOS</h2>
            <div className="w-full">

            <button className="rounded-lg  bg-indigo-800 hover:bg-green-600 p-3 m-3 text-lg text-white" 
            onClick = {() => {setmostrarTabla(!mostrarTabla)}} > {nombreBoton} </button>
           
            {mostrarTabla ? (
                <TablaProdructos listaProductos={productos} />
            ) : (
                <FormularioCreaciónProductos 
                mostarTablaAlGuardar ={setmostrarTabla}
                listaProductos={productos}
                registrarNuevo = {setproductos}
                />
            )}
            <ToastContainer position="bottom-center" autoClose={5000}/>
            </div>
        </div>
    );
};


const TablaProdructos = ( { listaProductos } ) => {
    const [Busqueda, setBusqueda] = useState ('');

    useEffect(() => {
        console.log("Búsqueda", Busqueda)
    }, [Busqueda]);

    useEffect(() => {
        console.log("Este es el listado de productos", listaProductos);
    }, [listaProductos]);

    return (
    <div>
        <input className="flex w-full"
        value={Busqueda}
        placeholder="Buscar" className="border border-gray-700 rounded-xl py-2"/>
        
    <h2 className="text-gray-900 font-bold text-2xl w-full">Tabla de Productos</h2>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>ID Producto</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th >Eliminar</th>
                </tr>
            </thead>
            <tbody>
             {listaProductos.map((producto)=>{
                return(  
                        <tr key={nanoid()}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.valor}</td>
                            <td>{producto.estado}</td>
                            <td className="justify-items-center">
                                <div className="justify-items-center">
                                    <i className="far fa-edit text-blue-600 hover:text-yellow-500"/>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <i class="far fa-trash-alt text-blue-900 hover:text-red-500"/>
                                </div>
                            </td>
                        </tr>
                );
                })}
            </tbody>
        </table>
    </div>
    );
};


const FormularioCreaciónProductos = ({mostarTablaAlGuardar, listaProductos , registrarNuevo}) => {

    //Se crean las variables para almacenar la información de los productos
    const form = useRef(null);
// Se agrega async para dar espera y que las respuestas sean asincronas
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        
        const nuevoProducto = {};
        fd.forEach((value, key)=> {
            console.log(value, key)
            nuevoProducto[key] = value;
        });
        
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/productos/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: {id: nuevoProducto.id, nombre: nuevoProducto.nombre, valor: nuevoProducto.valor, estado: nuevoProducto.estado}
        };
      
          await axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              toast.success('Producto agregado con éxito!');
            })
            .catch(function (error) {
              console.error(error);
              toast.error('Error creando el producto');
            });
        mostarTablaAlGuardar(true);
    };

    
    return (<div className="flex flex-col justify-center">
            <h2 className="text-gray-900 font-extrabold m-8">Formulario para creación productos nuevos</h2>
            <form ref={form} onSubmit={submitForm} className= " flex flex-auto grid-cols-1">
                <label htmlFor="id"> ID De producto
                    <input 
                    name="id"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" placeholder="123456"
                    />
                </label>
                <label htmlFor="nombre"> Descripción
                    <input 
                    name="nombre"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text"

                    />
                </label>
                <label htmlFor="valor"> Valor Unitario
                    <input 
                    name="valor"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" placeholder="$"

                    required
                    />
                </label>
                <label htmlFor='estado'>
                    Estado
                    <select
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" name="estado" required
                    defaultValue={0}>
                    <option disabled value={0}>Seleccione una opción</option>
                        <option >Activo</option>
                        <option >Inactivo</option>
                    </select>
                </label>

                <button type='submit' className="rounded-full  bg-green-500 hover:bg-green-700 p-3 m-3 text-lg text-white " >
                    Guardar</button>
            </form>
          </div>
    )
};

export default Productos
