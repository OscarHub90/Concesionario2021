import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Ventas = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Usuario");
    const [productos, setventas] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back
    const [recargar, setRecargar] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const options = {method: 'GET', url: 'http://localhost:5000/ventas'};
             await axios
              .request(options)
              .then(function (response) {
                setventas(response.data);
              })
              .catch(function (error) {
                console.error(error);
              });
        };
        if(recargar){
            obtenerUsuarios();
            setRecargar(false);
        }

    }, [recargar])

    useEffect (() => {
        // obtenemos las lista de los productos desde el backend. en este caso los datos que se encuentran en el objeto "productos"

        if (mostrarTabla) {
            setRecargar(false);
            
        }
    }, [mostrarTabla]);

    useEffect (() => {
     if (mostrarTabla) {
        setnombreBoton("Nueva Venta");
    } else {
        setnombreBoton("Volver al listado de ventas");
    }
    },[mostrarTabla]); 

    
    return (
        <div className=" items-center h-full w-full m-10 p-20 flex flex-col">
            <h2 className=" text-4xl text-green-700 m-5">ADMINISTRACIÓN VENTAS</h2>
            <div className="w-full">

            <button className="rounded-lg  bg-indigo-800 hover:bg-green-600 p-3 m-2 text-lg text-white" 
            onClick = {() => {setmostrarTabla(!mostrarTabla)}} > {nombreBoton} </button>
           
            {mostrarTabla ? (
                <TablaProdructos listaProductos={productos} setRecargar={setRecargar}/>
            ) : (
                <FormularioCreaciónProductos 
                mostarTablaAlGuardar ={setmostrarTabla}
                listaProductos={productos}
                registrarNuevo = {setventas}
                />
            )}
            <ToastContainer position="bottom-center" autoClose={5000}/>
            </div>
        </div>
    );
};

const TablaProdructos = ( { listaProductos, setRecargar } ) => {
    
    const [Busqueda, setBusqueda] = useState ('');
    const [productosFiltrados, setventasFiltrados] = useState(listaProductos);

    useEffect(() => {
        console.log("Búsqueda", Busqueda)
        console.log("lista original", listaProductos);
        setventasFiltrados(
            listaProductos.filter((elemento) => {
            console.log('elemento',elemento);
            return JSON.stringify(elemento).toLowerCase().includes(Busqueda.toLowerCase());
        })
        )
    }, [Busqueda, listaProductos]);

    useEffect(() => {
        console.log("Este es el listado de usuarios", listaProductos);
    }, [listaProductos]);

    return (
    <div className="flex flex-col justify-items-center">
        <input className="flex flex-col W-20 m-4"
        value={Busqueda}
        onChange={e=> setBusqueda(e.target.value)}
        placeholder="Busqueda" className=" p-2 rounded-xl border-2 border-gray-300"/>
        
    <h2 className="text-gray-900 font-bold text-2xl w-full m-4 items-center">Tabla de Usuarios</h2>

        <table className="table w-full">
            <thead>
                <tr>
                    <th>Vendedor</th>
                    {/*<th>Referencia</th>*/}
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Editar</th>
                    <th >Eliminar</th>
                </tr>
            </thead>
            <tbody>
             {productosFiltrados.map((producto)=>{
                return( <FilaProducto key={nanoid()} producto={producto} setRecargar={setRecargar} />
                );
                })}
            </tbody>
        </table> 

    </div>
    );
};

const FilaProducto = ({ producto, setRecargar }) => {

    const [editar, setEditar] = useState(false);
    const [infoNuevo, setInfonuevo] = useState({

        /* _id:producto._id, */
        vendedor:producto.vendedor,
        producto:producto.producto,
        cantidad:producto.cantidad,
        precio:producto.precio,
    })
    const actualizarProducto = async () => {
        console.log(infoNuevo);
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/ventas/editar/',
            headers: {'Content-Type': 'application/json'},
            data: {...infoNuevo, id: producto._id},
          };
          await axios
          
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Venta actualizada con éxito!')
            setEditar(false);
            setRecargar(true);
          }).catch(function (error) {
            console.error(error);
            toast.error('No fue posible editar el registro')
          });

    }
    
    const eliminarProducto = async()=> {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/ventas/eliminar',
            headers: {'Content-Type': 'application/json'},
            data: {id: producto._id},
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Registro de venta Eliminado con éxito!")
            setRecargar(true);
          }).catch(function (error) {
            console.error(error);
            toast.error("¡No fue posible eliminar el registro!")
          });  
    }
    return (
                <tr>
                 {/* <td>{infoNuevo._id.slice(19)}</td> */}
                 {editar? (
                 <>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                            type="text" 
                        Value={infoNuevo.id}
                          onChange={e=>setInfonuevo({...infoNuevo, vendedor: e.target.value})}
                        />
                        </td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.nombre}
                        onChange={e=>setInfonuevo({...infoNuevo, producto: e.target.value})}
                        /></td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.valor}
                        onChange={e=>setInfonuevo({...infoNuevo, cantidad: e.target.value})}
                        /></td>
                        <td><input 
                        className="border-gray-700 bg-blue-100 p-2 rounded-xl"
                        type="text" 
                        Value={infoNuevo.estado}
                        onChange={e=>setInfonuevo({...infoNuevo, precio: e.target.value})}
                        /></td>

                         </>
                         ):(
                         <>
                         <td>{producto.vendedor}</td>
                         <td>{producto.producto}</td>
                         <td>{producto.cantidad}</td>
                         <td>{producto.precio}</td>
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

const FormularioCreaciónProductos = ({mostarTablaAlGuardar, listaProductos , registrarNuevo, setRecargar}) => {

    //Se crean las variables para almacenar la información de los productos
    const form = useRef(null);
// Se agrega async para dar espera y que las respuestas sean asincronas
    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        
        const nuevoUsuario = {};
        fd.forEach((value, key)=> {
            console.log(value, key)
            nuevoUsuario[key] = value;
        });
        
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/venta/nueva',
            headers: { 'Content-Type': 'application/json' },
            data: {vendedor: nuevoUsuario.vendedor, producto: nuevoUsuario.producto, cantidad: nuevoUsuario.cantidad, precio: nuevoUsuario.precio}
        };
      
          await axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              toast.success('!venta agregada con éxito!');
            })
            .catch(function (error) {
              console.error(error);
              toast.error('¡Error creando el registro!');
            });
        mostarTablaAlGuardar(true);
    };

    
    return (<div className="flex flex-col justify-center">
            <h2 className="text-gray-900 font-extrabold m-8">Formulario para el resgistro de Ventas</h2>
            <form ref={form} onSubmit={submitForm} className= " flex flex-auto grid-cols-1">
                <label htmlFor="vendedor"> Nombre Vendedor
                    <input 
                    name="vendedor"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text" placeholder="123456"
                    />
                </label>
                <label htmlFor="producto"> Nombre producto
                    <input 
                    name="producto"
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" type="text"

                    />
                </label>
                <label htmlFor="cantidad"> Cantidad
                <select
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" name="cantidad" required
                    defaultValue={0}>
                    <option disabled value={0}>Seleccione una opción</option>
                        <option >Vendedor</option>
                        <option >Administrador</option>
                    </select>
                </label>
                <label htmlFor='precio'>
                    Precio
                    <select
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" name="precio" required
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
export default Ventas
