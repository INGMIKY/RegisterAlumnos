import React, { ChangeEvent, useState } from 'react';
import '../style/acciones.css'

interface AgregarModalProps{
    agregarModalOpen: boolean;
    setAgregarModalOpen: (close:boolean) => void;
}

const AgregarModal: React.FC<AgregarModalProps>= ({ agregarModalOpen, setAgregarModalOpen}) => {

    const cerrarAgregarModal = () =>{
        setAgregarModalOpen(false);
    }
 

    const [alumnodata, setAlumnoData] = useState({
        nombre: '',
        apaterno: '',
        amaterno: '',
        correo: ''
    })

    const manejarCambio = (e:ChangeEvent<HTMLInputElement>) =>{
        setAlumnoData({...alumnodata,
            [e.target.name]:[e.target.value]
        })
    }
    // console.log(alumnodata)

    const postAlumnos = async () =>{
        try{
            const response = await fetch('http://localhost:3001/alumnos',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(alumnodata)
            });
            if(!response.ok){
                console.log('Hubo un error al conectarse con el servidor');
            }
            console.log('Se ha enviado correctamente el formulario', response)
        }catch(error){
            console.error('Hubo un error al enviar datos',error);
        }
    }

    return (
        <>
            <div className={`AModalPantalla ${agregarModalOpen ? 'agregarOpen' : ''}`}>
                <div className="AModalContenedor">
                    <h2 className='tituloAModal'>Agregar Alumno</h2>
                    <form action="" onSubmit={postAlumnos}>
                        <input type="text" name='nombre' value={alumnodata.nombre} onChange={manejarCambio} placeholder='Nombre' required />
                        <input type="text" name='apaterno' value={alumnodata.apaterno} onChange={manejarCambio} placeholder='Apellido paterno' required/>
                        <input type="text" name='amaterno' value={alumnodata.amaterno} onChange={manejarCambio} placeholder='Apellido materno' required />
                        <input type="text" name='correo' value={alumnodata.correo} onChange={manejarCambio} placeholder='correo' required />
                        <div className='formBotones'>
                            <button type='reset' className='cancelarAgregarBoton' onClick={cerrarAgregarModal}>Cancelar</button>
                            <button type='submit' className='confirmarAgregarBoton'>Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AgregarModal;