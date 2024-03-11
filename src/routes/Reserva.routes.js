import { Router } from "express";
import { RegistrarReserva, ListarReservas, ListarReservasActivas, BuscarReserva, CambiarEstadoReserva, EliminarReserva } from "../controllers/ReservasController.js";

const route = Router();

route.post('/registrar', RegistrarReserva);
route.get('/listar', ListarReservas);
route.get('/listar/:estado', ListarReservasActivas);
route.get('/:prompt', BuscarReserva);
route.put('/:id/cambiar-estado', CambiarEstadoReserva);
route.delete('/:id/eliminar', EliminarReserva);

export default route;