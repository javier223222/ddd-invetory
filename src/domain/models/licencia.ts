import { TipoLicencia } from './valueObjects/tipoLicencia';

export class Licencia {
  readonly clave: string;
  private _tipo: TipoLicencia;
  private _validez: Date;

  constructor(clave: string, tipo: TipoLicencia, validez: Date) {
    this.clave = clave;
    this._tipo = tipo;
    this._validez = validez;
  }

  get tipo(): TipoLicencia { return this._tipo; }
  get validez(): Date { return this._validez; }

  estaVigente(): boolean {
    return new Date() < this._validez;
  }

  esTransferible(): boolean {
    return this._tipo === TipoLicencia.TRANSFERIBLE;
  }
}