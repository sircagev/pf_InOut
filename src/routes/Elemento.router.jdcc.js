import { Router } from "express";
import { RegistrarElemento, ListarElemetos, BuscarElemento, ActualizarElemento, EliminarElemento, DesactivarElementos } from "../controllers/Elemento.controller.jdcc.js";

const route = Router();

route.post('/registrar', RegistrarElemento);
route.get('/listar', ListarElemetos);
route.get('/buscar/:id', BuscarElemento);
route.put('/actualizar/:id', ActualizarElemento);
route.delete('/eliminar/:id', EliminarElemento);
route.put('/descativar/:id', DesactivarElementos);

export default route;