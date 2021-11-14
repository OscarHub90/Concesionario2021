import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Productos = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Producto");
    const [productos, setproductos] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back
    const [refrescar, setRefrescar] = useState(true)

    useEffect(() => {

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
    
        if (refrescar){
            obtenerProductos();
            setRefrescar(false);
        }
    }, [refrescar])

    useEffect (() => {
        // obtenemos las lista de los productos desde el backend. en este caso los datos que se encuentran en el objeto "productos"

        if (mostrarTabla) {
            setRefrescar(true);
            
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
            <h2 className=" text-4xl text-green-700 m-5">ADMINISTRACIÓN DE PRODUCTOS</h2>
            <div className="w-full">

            <button className="rounded-lg  bg-indigo-800 hover:bg-green-600 p-3 m-3 text-lg text-white" 
            onClick = {() => {setmostrarTabla(!mostrarTabla)}} > {nombreBoton} </button>
           
            {mostrarTabla ? (
                <TablaProdructos listaProductos={productos} setRefrescar={setRefrescar}/>
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

const TablaProdructos = ( { listaProductos, setRefrescar } ) => {
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
                    <th>Referencia</th>
                    <th>Descripción</th>
                    <th>Valor</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th >Eliminar</th>
                </tr>
            </thead>
            <tbody>
             {listaProductos.map((producto)=>{
                return( <FilaProducto key={nanoid()} producto={producto} setRefrescar={setRefrescar}/>
                );
                })}
            </tbody>
        </table> 

    </div>
    );
};

const FilaProducto = ({producto, setRefrescar}) => {

    const [editar, setEditar] = useState(false);
    const [infoNuevo, setInfonuevo] = useState({

        codigo:producto.codigo,
        nombre:producto.nombre,
        valor:producto.valor,
        estado:producto.estado,
    })
    const actualizarProducto = async () => {
        console.log(infoNuevo);
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/productos/editar/',
            headers: {'Content-Type': 'application/json'},
            data: {...infoNuevo, id: producto._id},
          };
          await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Producto editado con éxito!')
            setEditar(false);
            setRefrescar(true)
          }).catch(function (error) {
            console.error(error);
            toast.error('No fue posible editar el registro')
          });

    }
    
    const eliminarProducto = async()=> {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/productos/eliminar',
            headers: {'Content-Type': 'application/json'},
            data: {id: producto._id},
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Producto Eliminado con éxito!")
            setRefrescar(true);
          }).catch(function (error) {
            console.error(error);
            toast.error("¡No fue posible eliminar el producto!")
          });  
    }
    return (
                    <tr>
                        {editar? (
                        <>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.id}
                        onChange={e=>setInfonuevo({...infoNuevo, codigo: e.target.value})}
                        />
                        </td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.nombre}
                        onChange={e=>setInfonuevo({...infoNuevo, nombre: e.target.value})}
                        /></td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.valor}
                        onChange={e=>setInfonuevo({...infoNuevo, valor: e.target.value})}
                        /></td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.estado}
                        onChange={e=>setInfonuevo({...infoNuevo, estado: e.target.value})}
                        /></td>

                         </>
                         ):(
                         <>
                         <td>{producto.codigo}</td>
                         <td>{producto.nombre}</td>
                         <td>{producto.valor}</td>
                         <td>{producto.estado}</td>
                         </>
                         )}
                       <td className="justify-items-around">
                        {editar? (
                       <i onClick={() => actualizarProducto()} 
                        className="far fa-check-circle w-8 hover:border-green-600 text-green-600"/>
                    ):(
                    <div className="justify-items-center">
                     <i onClick={() => setEditar(!editar)} 
                     className="far fa-edit text-blue-600 hover:text-yellow-500"/>
                     </div>

                     )}
                    </td>
                    <td>
                    <div>
                        <i onClick={()=>eliminarProducto()} className="far fa-trash-alt text-blue-900 hover:text-red-500"/>
                    </div>
             </td>
        </tr>

    )
}

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
            data: {codigo: nuevoProducto.codigo, nombre: nuevoProducto.nombre, valor: nuevoProducto.valor, estado: nuevoProducto.estado}
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
                <label htmlFor="codigo"> Referencia
                    <input 
                    name="codigo"
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
