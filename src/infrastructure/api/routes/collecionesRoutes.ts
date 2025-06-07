import { Router } from 'express';
import { ColeccionesController } from '../../controllers/coleccionesController';

export const coleccionesRouter = (controller: ColeccionesController): Router => {
  const router = Router();
  
  router.post('/', (req, res) => controller.createColeccion(req, res));
  
  router.post('/:idColeccion/juegos', (req, res) => controller.addJuegoToColeccion(req, res));
  
  return router;
};