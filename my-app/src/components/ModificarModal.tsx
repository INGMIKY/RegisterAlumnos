import React, { ChangeEvent } from 'react';
import '../style/acciones.css'

interface ModificarModalProps{
    modificarModalOpen: boolean;
    setModificarModalOpen: (close:boolean) => void;
    alumnoSeleccionado: alumnoData | null;
    setAlumnoSeleccionado: (alumno : alumnoData | null) => void;
}

interface alumnoData{
    idAlumnos: number,
    nombre: string,
    apaterno: string,
    amaterno: string,
    correo: string
    activo: number;
}

const ModificarModal:React.FC<ModificarModalProps> = ({ modificarModalOpen, setModificarModalOpen, alumnoSeleccionado, setAlumnoSeleccionado}) =>{

    const cerrarModificarModal = () =>{
        setModificarModalOpen(false);
    }

    const manejarCambio = (e:ChangeEvent<HTMLInputElement>) =>{
        if(alumnoSeleccionado){
            setAlumnoSeleccionado({
                ...alumnoSeleccionado,
                [e.target.name]:[e.target.value]
            })

        }
    }

    const putAlumno =async () =>{
        try{
            const response = await fetch(`http://localhost:3001/alumnos/${alumnoSeleccionado?.idAlumnos}`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(alumnoSeleccionado)
            })
            console.log('Alumno actualizado', response)
        }catch(error){
            console.log('Hubo un probelma con conectarse con el servidor',error);
        }
    }

    return ( <>
        <div className={`MModalPantalla ${modificarModalOpen ? 'modificarOpen' : ''}`}>
                <div className="MModalContenedor">
                    <h2 className='tituloAModal'>Modificar Alumno</h2>
                    <form action="" onSubmit={putAlumno}>
                       
                        <label htmlFor="">Nombre<input type="text" name='nombre' value={alumnoSeleccionado?.nombre} onChange={manejarCambio} placeholder='Nombre' required/></label>
                        <label htmlFor="">Apellido paterno<input type="text" name='apaterno' value={alumnoSeleccionado?.apaterno} placeholder='Apellido paterno' required /></label>
                        
                        
                        <label htmlFor="">Apellido matern<input type="text" name='amaterno' value={alumnoSeleccionado?.amaterno} placeholder='Apellido materno' required /></label>
                        <label htmlFor="">Correo<input type="text" name='correo' value={alumnoSeleccionado?.correo} placeholder='correo' required /></label>
                        
                        
                        <div className='formBotones'>
                            <button type='reset' className='cancelarAgregarBoton' onClick={cerrarModificarModal}>Cancelar</button>
                            <button type='submit' className='confirmarAgregarBoton'>Modificar</button>
                        </div>
                    </form>
                </div>
        </div>
        
    </>)
}

export default ModificarModal;