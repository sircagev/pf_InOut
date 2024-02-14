import { Router } from "express";
import { RegistraEmpaque, ListarEmpaque, BuscarEmpaque, ActualizarEmpaque, EliminarEmpaque } from "../controllers/TipoEmpaque.controller.jdcc.js"; 

const route = Router();

route.post('/registrar', RegistraEmpaque);
route.get('/listar', ListarEmpaque);
route.get('/buscar/:id', BuscarEmpaque);
route.put('/actualizar/:id', ActualizarEmpaque);
route.delete('/eliminar/:id', EliminarEmpaque);

export default route;
