import { Licencia } from "../models/licencia";

export interface ILicenciaRepository {
  findByClave(clave: string): Promise<Licencia | null>;
  create(licencia: Licencia): Promise<Licencia>;
  update(licencia: Licencia): Promise<Licencia>;
  delete(clave: string): Promise<void>;
}