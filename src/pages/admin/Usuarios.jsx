import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Usuarios = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Usuario");
    const [productos, setproductos] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back

    useEffect (() => {
        // obtenemos las lista de los productos desde el backend. en este caso los datos que se encuentran en el objeto "productos"
        const obtenerProductos = async () => {
            const options = { method: 'GET', url: 'http://localhost:4000/productos' };
            await axios
              .request(options)
              .then(function (response) {
                setproductos(response.data);
              })
              .catch(function (error) {
                console.error(error);
              });
            };
        if (mostrarTabla){
            obtenerProductos();
        }
    }, [mostrarTabla]);

    useEffect (() => {
     if (mostrarTabla) {
        setnombreBoton("Crear Nuevo Usuario");
    } else {
        setnombreBoton("Mostrar Todos los Usuarios");
    }
    },[mostrarTabla]); 

    
    return (
        <div className=" items-center h-full w-full m-20 p-20 flex flex-col">
            <h2 className=" text-3xl text-green-700 m-5">ADMINISTRACIÓN DE USUARIOS</h2>
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
        <input 
        value={Busqueda}
        placeholder="Buscar" className="border border-gray-700 rounded-lg m-4 py-1"/>
        
    <h2 className="text-gray-900 font-bold text-2xl w-full">Tabla de Usuarios</h2>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {listaProductos.map((producto)=>{
                    return (
                        <filaProducto key={nanoid()} producto={producto}/>
                    );
                })}
            </tbody>
        </table>
    </div>
    )
};

const filaProducto = ({producto}) => {
return (
                        <tr>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.valor}</td>
                            <td>{producto.estado}</td>
                            <td>
                                <div className="flex justify-evenly">
                                <i className="fas fa-edit hover:text-yellow-600" />
                                <i className="far fa-trash-alt hover:text-red-700" />
                                </div>
                            </td>
                        </tr>

)

}
const FormularioCreaciónProductos = ({mostarTablaAlGuardar, listaProductos , registrarNuevo}) => {


    const form = useRef(null);

    const submitForm = async(e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        
        const nuevoProducto = {};
        fd.forEach((value, key)=> {
            console.log(value, key)
            nuevoProducto[key] = value;
        });
        // Se agrega el código generado desde POSTMAN, por ahora se incluye el dado por el profesor.

        const options = {
            method: 'POST',
            url: 'http://localhost:4000/productos/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: { name: nuevoProducto.name, brand: nuevoProducto.brand, model: nuevoProducto.model },
          };
      
          await axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              toast.success('Usuario agregado con éxito!');
            })
            .catch(function (error) {
              console.error(error);
              toast.error('Error creando el usuario');
            });
        mostarTablaAlGuardar(true);
    };

    
    return (<div className="flex flex-col justify-center">
            <h2 className="text-gray-900 font-extrabold m-8">Formulario para creación nuevos Usuarios</h2>
            <form ref={form} onSubmit={submitForm} className= " flex flex-auto grid-cols-1">
                <label htmlFor="id"> Cédula
                    <input 
                    name="cedula"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" placeholder="123456"
                    />
                </label>
                <label htmlFor="nombre"> Nombre
                    <input 
                    name="nombre"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text"

                    />
                </label>
                <label htmlFor='rol'>
                    Rol
                    <select
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" name="rol" required
                    defaultValue={0}>
                    <option disabled value={0}>Seleccione una opción</option>
                        <option >Administrador</option>
                        <option >Vendedor</option>
                    </select>
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

export default Usuarios
