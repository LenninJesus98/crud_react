const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

// db
const db = mysql.createPool({
    // host: 'localhost',
    // user: 'root',
    // password: "",
    // database: 'crud_react'

    host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
    user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
    password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: 'crud_react' // database name MYSQL_HOST_IP: mysql_db

});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// Obtener solo un dato
app.get("/get/:id_usuario", (req, res) => {

    const id_usuario = req.params.id_usuario
    // crear la consulta
    const sqlSelect = "Select * from tbl_usuario where id_usuario = ?";

    // ejecutar la consulta
    db.query(sqlSelect, [id_usuario], (err, result) => {
        res.send(result)
    });

})

// Obtener Datos
app.get("/get", (req, res) => {
    // crear la consulta
    const sqlSelect = "Select * from tbl_usuario";

    // ejecutar la consulta
    db.query(sqlSelect, (err, result) => {
        res.send(result)
        console.log(err)
    });

})

// Insertar un dato 
app.post("/insertar", (req, res) => {
    // Capturar los datos
    const nombre_usuario = req.body.nombre_usuario
    const cedula_usuario = req.body.cedula_usuario
    const telefono_usuario = req.body.telefono_usuario
    const mail_usuario = req.body.mail_usuario

    // crear la consulta
    const sqlInsertar = "INSERT INTO tbl_usuario(nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario) VALUES (?,?,?,?)";

    // ejecutar la consulta
    db.query(sqlInsertar, [nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario], (err, result) => {
        console.log(result);
    });

})

// Eliminar un dato
app.delete('/eliminar/:id_usuario', (req, res) => {
    // recoger el dato del id
    const id_usuario = req.params.id_usuario

    const sqlEliminar = "DELETE from tbl_usuario where id_usuario =?";
    // ejecuta la consulta
    db.query(sqlEliminar, id_usuario, (err, result) => {
        if (err) console.log(err)
    })

})

// Actualizaar un dato
app.put('/actualizar', (req, res) => {
    // recoger el dato del id
    const id_usuario = req.body.id_usuario
    const nombre_usuario = req.body.nombre_usuario
    const cedula_usuario = req.body.cedula_usuario
    const telefono_usuario = req.body.telefono_usuario
    const mail_usuario = req.body.mail_usuario

    const sqlActualizar = "UPDATE tbl_usuario SET nombre_usuario=?,cedula_usuario=?,telefono_usuario=?,mail_usuario=? WHERE id_usuario=?";

    // ejecuta la consulta
    db.query(sqlActualizar, [nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario, id_usuario], (err, result) => {
        if (err) console.log(err)
    });
});


// mandar el listen
app.listen(3001, () => {
    console.log("corriendo en el puerto 3001 ...");
})