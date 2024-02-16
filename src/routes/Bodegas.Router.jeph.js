import { Router } from "express";
import { RegistrarBodega, listarBodegas, BuscarBodega, ActualizarBodega, EliminarBodega } from "../controllers/Bodegas.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarBodega);
route.get('/listar', listarBodegas);
route.get('/buscar/:id', BuscarBodega);
route.put('/actualizar/:id', ActualizarBodega);
route.delete('/eliminar/:id', EliminarBodega);


export default route;