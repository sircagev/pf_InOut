import { Router } from 'express';
import { GenerarInformeUsuarios, GenerarInformeReservas, GenerarInformeElementos } from "../controllers/Reportes.Controller.yacb.js";

const router = Router();

router.get('/usuarios', GenerarInformeUsuarios);
router.get('/reservas', GenerarInformeReservas);
router.get('/elementos', GenerarInformeElementos);

export default router;
