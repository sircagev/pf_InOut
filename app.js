import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routeBodega from "./src/routes/Bodegas.Router.jeph.js";
import RouteCategoria  from "./src/routes/CategoriaElemento.router.jdcc.js";
import RouteEmpaque from "./src/routes/TipoEmpaque.router.jdcc.js";
import RouteUbicacion from "./src/routes/Ubicacion.router.jdcc.js";
import RouteElemento from "./src/routes/Elemento.router.jdcc.js";
import RouteUsuarios from "./src/routes/usuario.router.js";
import RouteReservas from "./src/routes/Reserva.routes.js"

const app=express();

//Configuracion
app.use(cors());
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
app.use('/usuario', RouteUsuarios);
app.use('/reservas', RouteReservas);

app.use('/bodega', routeBodega);


//Servidor
app.listen(3000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 3000");
});