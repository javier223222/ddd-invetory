import { Router } from 'express';
import { JuegosAdquiridosController } from '../../controllers/juegosAdquiridosController';

export const juegosAdquiridosRouter = (controller: JuegosAdquiridosController): Router => {
  const router = Router();
  
  router.get('/', (req, res) => controller.getJuegosAdquiridos(req, res));
  
  router.post('/', (req, res) => controller.addJuegoAdquirido(req, res));
  
  router.patch('/:id/estado', (req, res) => controller.updateState(req, res));
  
  router.patch('/:id/visibilidad', (req, res) => controller.toggleVisibility(req, res));
  
  return router;
};