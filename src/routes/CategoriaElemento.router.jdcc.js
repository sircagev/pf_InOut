import { Router } from "express";
import { RegistrarCategoria, listarCategoria, BuscarBodega, ActualizarBodega, EliminarBodega } from "../controllers/CategoriaElemento.controller.jdcc.js"; 

const route = Router()

route.post('/registrar', RegistrarCategoria);
route.get('/listar',listarCategoria);
route.get('/buscar/:id',BuscarBodega);
route.put('/actualizar/:id', ActualizarBodega);
route.delete('/eliminar/:id', EliminarBodega);


export default route;

