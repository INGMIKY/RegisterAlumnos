import React from 'react';
import '../style/acciones.css'


interface EliminarModalProps{
    eliminarModalOpen: boolean;
    setEliminarModalOpen: (close:boolean) => void;
    eliminarAlumno: number | null;
}



const EliminarModal: React.FC<EliminarModalProps> = ({eliminarModalOpen, setEliminarModalOpen, eliminarAlumno}) =>{


    const cerrarEliminarModal = () =>{
        setEliminarModalOpen(false)
    }

    const deleteAlumno =async () =>{
        try{
            const response = await fetch(`http://localhost:3001/alumnos/${eliminarAlumno}`,{
                method: 'DELETE'
            })
            console.log('Eliminacion completa', response)
        }catch(error){
            console.log('Hubo un error al conectarse al servidor',error)
        }
    }

    return (<>
            <div className={`EModalPantalla ${eliminarModalOpen ? 'eliminarOpen' : ''}`}>
                <div className="EModalContenedor">
                    <h2 className='tituloAModal'>Eliminar Alumno</h2>
                        <div className='eliminarBotonesContenedor'>
                            <button type='reset' className='cancelarAgregarBoton' onClick={cerrarEliminarModal}>Cancelar</button>
                            <button type='submit' className='confirmarAgregarBoton' onClick={deleteAlumno}>Eliminar</button>
                        </div>
                </div>
            </div>
    </>)
}

export default EliminarModal;