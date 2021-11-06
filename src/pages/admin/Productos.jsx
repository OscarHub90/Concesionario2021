import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const productosBackend = [

{
    codigo: "001",
    nombre: "Mesa de centro",
    valor: "$5.000",
    estado: "En inventario",
},
{
    codigo: "002",
    nombre: "Mesa de esquina",
    valor: "$10.000",
    estado: "En inventario",
},
{
    codigo: "003",
    nombre: "Mesa redonda",
    valor: "$10.000",
    estado: "En inventario",
},
{
    codigo: "005",
    nombre: "Mesa redonda",
    valor: "$10.000",
    estado: "En inventario",
},
];

const Productos = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Producto");
    const [productos, setproductos] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back

    useEffect (() => {
        // obtenemos las lista de los productos desde el backend. en este caso los datos que se encuentran en el objeto "productos"
        setproductos(productosBackend);
    }, []);

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
    useEffect(() => {
        console.log("Este es el listado de productos", listaProductos);
    }, [listaProductos]);

    return (
    <div>
    <h2 className="text-gray-900 font-bold text-2xl w-full">Tabla de Productos</h2>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>ID Producto</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {listaProductos.map((producto)=>{
                    return (
                        <tr key={nanoid()}>
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
                    );
                })}
            </tbody>
        </table>
    </div>
    )
};

const FormularioCreaciónProductos = ({mostarTablaAlGuardar, listaProductos , registrarNuevo}) => {

    //Se crean las variables para almacenar la información de los productos
    const form = useRef(null);

    const submitForm =(e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        
        const nuevoProducto = {};
        fd.forEach((value, key)=> {
            console.log(value, key)
            nuevoProducto[key] = value;
        });
        mostarTablaAlGuardar(true);
        toast.success("Producto agregado con éxito!")
        registrarNuevo([...listaProductos, nuevoProducto]);
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
                    Guardar Producto</button>
            </form>
          </div>
    )
};

export default Productos
