import { Request, Response } from 'express';
import { CreateColeccionUseCase } from '../../application/usecases/colecciones/createColeccion';
import { AddJuegoToColeccionUseCase } from '../../application/usecases/colecciones/addJuegoTocoleccion';
import { errorResponse } from '../api/middlewares/errorHandler';

export class ColeccionesController {
  constructor(
    private createColeccionUseCase: CreateColeccionUseCase,
    private addJuegoToColeccionUseCase: AddJuegoToColeccionUseCase
  ) {}

  async createColeccion(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createColeccionUseCase.execute(req.body);
      
      res.status(201).json({
        message: "Colección creada exitosamente",
        data: result
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }

  async addJuegoToColeccion(req: Request, res: Response): Promise<void> {
    try {
      const { idColeccion } = req.params;
      const { idJuego } = req.body;
      
      await this.addJuegoToColeccionUseCase.execute({
        idColeccion,
        idJuego
      });
      
      res.status(200).json({
        message: "Juego agregado a la colección exitosamente"
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }
}