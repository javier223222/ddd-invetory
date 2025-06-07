export class Logro {
  readonly id: string;
  readonly idJuego: string;
  readonly nombre: string;
  readonly descripcion: string;
  readonly puntos: number;
  readonly icono: string;
  private _fechaDesbloqueo: Date | null;

  constructor(
    id: string,
    idJuego: string,
    nombre: string,
    descripcion: string,
    puntos: number,
    icono: string,
    fechaDesbloqueo: Date | null = null
  ) {
    this.id = id;
    this.idJuego = idJuego;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntos = puntos;
    this.icono = icono;
    this._fechaDesbloqueo = fechaDesbloqueo;
  }

  get fechaDesbloqueo(): Date | null { 
    return this._fechaDesbloqueo; 
  }

  desbloquear(): void {
    if (!this._fechaDesbloqueo) {
      this._fechaDesbloqueo = new Date();
    }
  }

  estaBloqueado(): boolean {
    return this._fechaDesbloqueo === null;
  }
}