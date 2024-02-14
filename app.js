import express from "express";
import bodyParser from "body-parser";
import { pool } from "./src/database/conexion.js";
import RouteBodega  from "./src/routes/CategoriaElemento.router.jdcc.js";
import RouteEmpaque from "./src/routes/TipoEmpaque.router.jdcc.js";

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});

app.use('/bodega', RouteBodega);
app.use('/empaque', RouteEmpaque);


//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});