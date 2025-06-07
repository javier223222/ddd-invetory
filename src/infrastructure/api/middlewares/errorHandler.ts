import { Response } from 'express';

export function errorResponse(err: Error, res: Response): void {
  console.error(err);
  
  if (err.message.includes('clave') && err.message.includes('ya ha sido activada')) {
    res.status(400).json({
      message: err.message,
      error: "DUPLICATE_LICENSE"
    });
    return;
  }
  
  if (err.message.includes('No se puede cambiar de')) {
    res.status(400).json({
      message: err.message,
      error: "INVALID_STATE_TRANSITION"
    });
    return;
  }
  
  if (err.message.includes('no encontrado') || err.message.includes('not found')) {
    res.status(404).json({
      message: err.message,
      error: "NOT_FOUND"
    });
    return;
  }
  
  // Error por defecto
  res.status(500).json({
    message: "Ha ocurrido un error en el servidor",
    error: err.message
  });
}

export function errorMiddleware(err: Error, req: any, res: Response, next: any): void {
  errorResponse(err, res);
}