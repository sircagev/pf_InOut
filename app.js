import express from "express";
import bodyParser from "body-parser";
import { pool } from "./src/database/conexion.js";
import RouteCategoria  from "./src/routes/CategoriaElemento.router.jdcc.js";
import RouteEmpaque from "./src/routes/TipoEmpaque.router.jdcc.js";
import RouteUbicacion from "./src/routes/Ubicacion.router.jdcc.js";
import RouteElemento from "./src/routes/Elemento.router.jdcc.js";

const app=express();

//Configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/',(req, res)=> {
    console.log(process.env);
    res.send('Pagina inicial');
});

app.use('/categoria', RouteCategoria)
app.use('/empaque', RouteEmpaque);
app.use('/ubicacion', RouteUbicacion);
app.use('/elemento', RouteElemento);


//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});