import { Router } from "express";
import { RegistrarUbicacion, ListarUbicacion, BuscarUbicacion, ActualizarUbicacion, EliminarUbicacion } from "../controllers/DetalleUbicacion.controller.jdcc.js";

const route = Router()

route.post('/registrar', RegistrarUbicacion);
route.get('/listar', ListarUbicacion);
route.get('/buscar/:id', BuscarUbicacion);
route.put('/actualizar/:id', ActualizarUbicacion);
route.delete('/eliminar/:id', EliminarUbicacion);

export default route;