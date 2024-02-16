import express from "express";
import bodyParser from "body-parser";
import routeBodega from "./src/routers/Bodegas.Router.jeph.js";

import { pool } from "./conexion.js"; 

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});


app.use('/bodega', routeBodega);


//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});