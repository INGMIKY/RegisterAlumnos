import { useState } from 'react';
import '../style/alumnos.css'
import AgregarModal from './AgregarModal';
import ListaAlumnos from './ListaAlumnos';


const Alumnos = () => {

const [agregarModalOpen, setAgregarModalOpen] = useState(false)


const abrirAgregarModal = () =>{
    setAgregarModalOpen(true);
}


    return (
        <>
            <div className='alumnosContenedor'>
                <p className='tituloAlumno'>Registro alumnos</p>
                <p className='bienvenidaAlumno'>Bienvenido</p>
                <button className='agregarBoton' onClick={()=>abrirAgregarModal()}>Agregar</button>

                <h2 className='tituloTabla'>Alumnos</h2>
                <table>
                    <thead>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>Apellido materno</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>Miguel</td>
                            <td>Barrera</td>
                            <td>Sima</td>
                            <td>migueltony9@gmail.com</td>
                            <td>
                                <button className='modificarBoton' >Modificar</button>
                                <button className='eliminarBoton' >Eliminar</button>
                            </td>
                        </tr> */}
                        <ListaAlumnos />
                        
                    </tbody>
                </table>

                <AgregarModal agregarModalOpen={agregarModalOpen} setAgregarModalOpen={setAgregarModalOpen}/>
                
            </div>
        </>
    )
}


export default Alumnos;