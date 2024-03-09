import { Router } from "express";
import { RegistrarReserva } from "../controllers/ReservasController.js";

const route = Router();

route.post('/registrar', RegistrarReserva);

export default route;