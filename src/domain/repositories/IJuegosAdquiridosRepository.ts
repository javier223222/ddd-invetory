import { JuegosAdquirido } from "../models/juegosAdquirido";
export interface IJuegosAdquiridosRepository {
  findByIdUsuario(idUsuario: string, page: number, limit: number, soloVisibles?: boolean): Promise<[JuegosAdquirido[], number]>;
  findByIdColeccion(idColeccion: string, idUsuario: string, page: number, limit: number): Promise<[JuegosAdquirido[], number]>;
  findById(idJuego: string): Promise<JuegosAdquirido | null>;
  findByLicencia(licenciaClave: string, idUsuario: string): Promise<JuegosAdquirido | null>;
  create(juegoAdquirido: JuegosAdquirido): Promise<JuegosAdquirido>;
  update(juegoAdquirido: JuegosAdquirido): Promise<JuegosAdquirido>;
  delete(idJuego: string): Promise<void>;
}

