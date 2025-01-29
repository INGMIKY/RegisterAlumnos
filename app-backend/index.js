const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        console.error('Hubo un problema al conectarse a la base de datos',err);
        return;
    }
    console.log('Conectando a la base de datos de MySQL');
});

app.get('/alumnos',(req,res)=>{
    db.query('SELECT * FROM Alumnos',(err, results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.json(results)
        }
    })
})


app.post('/alumnos',(req, res)=>{
    console.log('Datos recibidos:', req.body); // Verifica qué datos llegan
    const {nombre, apaterno, amaterno, correo, activo} = req.body;
    db.query('INSERT INTO Alumnos (nombre,apaterno,amaterno,correo,activo) VALUE(?,?,?,?,1)',[nombre,apaterno,amaterno,correo, activo],(err,results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).json({message: 'datos enviados', id: results.insertId});
        }
    })
})

app.put('/alumnos/:idAlumnos',(req, res)=>{
    console.log('Datos recibidos:', req.body);
    const {idAlumnos} = req.params
    const {nombre, apaterno, amaterno, correo} = req.body
    db.query('UPDATE Alumnos SET nombre= ?, apaterno = ?, amaterno = ?, correo = ? WHERE idAlumnos= ?',[nombre, apaterno, amaterno, correo, idAlumnos ],(err, results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json({message: 'Alumno actualizado'})
        }
    })
})


app.delete('/alumnos/:idAlumnos',(req, res)=>{
    console.log('Datos recibidos:', req.body);
    const {idAlumnos} = req.params
    db.query('DELETE FROM Alumnos WHERE idAlumnos = ? ', [idAlumnos],(err, results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json({message: 'Alumno eliminado'})
        }
    })
})

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})