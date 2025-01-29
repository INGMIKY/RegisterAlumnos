import { useState, useEffect } from 'react';
import '../style/acciones.css'
import '../style/alumnos.css'

import ModificarModal from './ModificarModal';
import EliminarModal from './EliminarModal';


interface alumnotype{
    idAlumnos: number,
    nombre: string,
    apaterno: string,
    amaterno: string,
    correo: string
    activo: number;
}

const ListaAlumnos = () =>{
    
    const [modificarModalOpen, setModificarModalOpen] = useState(false)
    const [eliminarModalOpen, setEliminarModalOpen] = useState(false)
    const [alumnos, setAlumnos] = useState<alumnotype[]>([])
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<alumnotype | null>(null)
    const [eliminarAlumno, setEliminarAlumno] = useState<number | null>(null)
    
    const abrirModificarModal = (alumno:alumnotype) =>{
        setModificarModalOpen(true);
        setAlumnoSeleccionado(alumno)
    }
    
    const abrirEliminarModal = (idAlumnos:number) =>{
        setEliminarModalOpen(true);
        setEliminarAlumno(idAlumnos)
    }

    const getAlumnos = async () =>{
        try{
            const response = await fetch('http://localhost:3001/alumnos');
            const result = await response.json();
            setAlumnos(result)

        }catch(error){
            console.error('Hubo un error al obtener los alumnos',error)
        }
        
    }

useEffect(()=>{
    getAlumnos();
},[])
    


    return (
        <>
            {alumnos
        
            .filter((alumno)=>alumno.activo === 1)
            .map((alumno)=>(           
                <tr key={alumno.idAlumnos}>
                    <td>{alumno.idAlumnos}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apaterno}</td>
                    <td>{alumno.amaterno}</td>
                    <td>{alumno.correo}</td>
                    <td className='botonAccionContenedor'>
                        <button className='modificarBoton' onClick={()=>abrirModificarModal(alumno)}>Modificar</button>
                        <button className='eliminarBoton' onClick={()=>abrirEliminarModal(alumno.idAlumnos)}>Eliminar</button>
                    </td>
                </tr>
            ))}

            <ModificarModal modificarModalOpen={modificarModalOpen} setModificarModalOpen={setModificarModalOpen} alumnoSeleccionado={alumnoSeleccionado} setAlumnoSeleccionado={setAlumnoSeleccionado}/>
            <EliminarModal eliminarModalOpen={eliminarModalOpen} setEliminarModalOpen={setEliminarModalOpen} eliminarAlumno={eliminarAlumno}/>
        </>
    );
}

export default ListaAlumnos;