import { nanoid } from 'nanoid';
import React, {useEffect, useState, useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Usuarios = () => {
    const [mostrarTabla, setmostrarTabla] = useState(true);
    const [nombreBoton, setnombreBoton] = useState ("Crear Nuevo Usuario");
    const [productos, setproductos] = useState([]); // Se deja el [] vacío porque le van a llegar datos desde el Back
    const [recargar, setRecargar] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const options = {method: 'GET', url: 'http://localhost:5000/usuarios'};
             await axios
              .request(options)
              .then(function (response) {
                setproductos(response.data);
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
        setnombreBoton("Crear Nuevo Usuario");
    } else {
        setnombreBoton("Mostrar Todos los Usuarios");
    }
    },[mostrarTabla]); 

    
    return (
        <div className=" items-center h-full w-full m-10 p-20 flex flex-col">
            <h2 className=" text-4xl text-green-700 m-5">ADMINISTRACIÓN DE USUARIOS</h2>
            <div className="w-full">

            <button className="rounded-lg  bg-indigo-800 hover:bg-green-600 p-3 m-2 text-lg text-white" 
            onClick = {() => {setmostrarTabla(!mostrarTabla)}} > {nombreBoton} </button>
           
            {mostrarTabla ? (
                <TablaProdructos listaProductos={productos} setRecargar={setRecargar}/>
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

const TablaProdructos = ( { listaProductos, setRecargar } ) => {
    
    const [Busqueda, setBusqueda] = useState ('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
        console.log("Búsqueda", Busqueda)
        console.log("lista original", listaProductos);
        setProductosFiltrados(
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
                    <th>Cédula</th>
                    {/*<th>Referencia</th>*/}
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Estado</th>
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
        cedula:producto.cedula,
        nombre:producto.nombre,
        rol:producto.rol,
        estado:producto.estado,
    })
    const actualizarProducto = async () => {
        console.log(infoNuevo);
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/usuarios/editar/',
            headers: {'Content-Type': 'application/json'},
            data: {...infoNuevo, id: producto._id},
          };
          await axios
          
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('usuario editado con éxito!')
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
            url: 'http://localhost:5000/usuarios/eliminar',
            headers: {'Content-Type': 'application/json'},
            data: {id: producto._id},
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success("Usuario Eliminado con éxito!")
            setRecargar(true);
          }).catch(function (error) {
            console.error(error);
            toast.error("¡No fue posible eliminar el usuario!")
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
                          onChange={e=>setInfonuevo({...infoNuevo, cedula: e.target.value})}
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
                        onChange={e=>setInfonuevo({...infoNuevo, rol: e.target.value})}
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
                         <td>{producto.cedula}</td>
                         <td>{producto.nombre}</td>
                         <td>{producto.rol}</td>
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
            url: 'http://localhost:5000/usuarios/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: {cedula: nuevoUsuario.cedula, nombre: nuevoUsuario.nombre, rol: nuevoUsuario.rol, estado: nuevoUsuario.estado}
        };
      
          await axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              toast.success('¡Usuario agregado con éxito!');

            })
            .catch(function (error) {
              console.error(error);
              toast.error('¡Error creando el producto!');
            });
        mostarTablaAlGuardar(true);
    };

    
    return (<div className="flex flex-col justify-center">
            <h2 className="text-gray-900 font-extrabold m-8">Formulario para creación usuarios nuevos</h2>
            <form ref={form} onSubmit={submitForm} className= " flex flex-auto grid-cols-1">
                <label htmlFor="cedula"> Cédula
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
                <label htmlFor="rol"> Rol
                <select
                    className="border-gray-700 bg-blue-100 m-2 p-2 rounded-xl" name="rol" required
                    defaultValue={0}>
                    <option disabled value={0}>Seleccione una opción</option>
                        <option >Vendedor</option>
                        <option >Administrador</option>
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
