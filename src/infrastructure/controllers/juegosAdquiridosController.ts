import { Request, Response } from 'express';
import { AddJuegoAdquiridoUseCase } from '../../application/usecases/juegosAdquiridos/addJuegoAdquirido';
import { GetJuegosAdquiridosUseCase } from '../../application/usecases/juegosAdquiridos/getJuegosAquiridos';
import { UpdateStateUseCase } from '../../application/usecases/juegosAdquiridos/updateState';
import { ToggleVisibilityUseCase } from '../../application/usecases/juegosAdquiridos/toggleVisibility';
import { errorResponse } from '../api/middlewares/errorHandler';

export class JuegosAdquiridosController {
  constructor(
    private addJuegoAdquiridoUseCase: AddJuegoAdquiridoUseCase,
    private getJuegosAdquiridosUseCase: GetJuegosAdquiridosUseCase,
    private updateStateUseCase: UpdateStateUseCase,
    private toggleVisibilityUseCase: ToggleVisibilityUseCase
  ) {}

  async getJuegosAdquiridos(req: Request, res: Response): Promise<void> {
    try {
      const { page = '1', limit = '10', idusuario, coleccionId, soloVisibles = 'true' } = req.query;
      
      const result = await this.getJuegosAdquiridosUseCase.execute({
        idUsuario: String(idusuario),
        page: Number(page),
        limit: Number(limit),
        coleccionId: coleccionId ? String(coleccionId) : undefined,
        soloVisibles: soloVisibles === 'true'
      });
      
      res.status(200).json({
        message: 'Games retrieved successfully',
        data: result
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }

  async addJuegoAdquirido(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.addJuegoAdquiridoUseCase.execute(req.body);
      
      res.status(201).json({
        message: "Juego agregado a la libreria",
        data: result
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }

  async updateState(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.updateStateUseCase.execute({
        idJuego: id,
        estado: req.body.estado
      });
      
      res.status(200).json({
        message: "Estado del juego actualizado",
        data: result
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }

  async toggleVisibility(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.toggleVisibilityUseCase.execute({
        idJuego: id,
        visible: req.body.visible
      });
      
      const mensaje = req.body.visible ? "Juego visible en biblioteca" : "Juego ocultado de biblioteca";
      
      res.status(200).json({
        message: mensaje,
        data: result
      });
    } catch (err: any) {
      console.error(err);
      errorResponse(err, res);
    }
  }
}