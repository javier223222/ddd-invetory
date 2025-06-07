import { Coleccion } from "../models/coleccion";

export interface IColeccionRepository {
  findById(id: string): Promise<Coleccion | null>;
  findByIdUsuario(idUsuario: string): Promise<Coleccion[]>;
  create(coleccion: Coleccion): Promise<Coleccion>;
  update(coleccion: Coleccion): Promise<Coleccion>;
  delete(id: string): Promise<void>;
  addJuegoToColeccion(idColeccion: string, idJuego: string): Promise<void>;
  removeJuegoFromColeccion(idColeccion: string, idJuego: string): Promise<void>;
}