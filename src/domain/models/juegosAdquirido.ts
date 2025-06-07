import { EstadoJuego } from './valueObjects/estadoJuego';
import { Coleccion } from './coleccion';

export class JuegosAdquirido {
  readonly idJuego: string;
  readonly idUsuario: string;
  readonly nombre: string;
  private _fechaCompra: Date;
  private _estado: EstadoJuego;
  private _licenciaClave: string;
  private _visible: boolean;
  private _colecciones: Coleccion[];

  constructor(
    idJuego: string,
    idUsuario: string,
    nombre: string,
    fechaCompra: Date,
    estado: EstadoJuego,
    licenciaClave: string,
    visible: boolean = true
  ) {
    this.idJuego = idJuego;
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this._fechaCompra = fechaCompra;
    this._estado = estado;
    this._licenciaClave = licenciaClave;
    this._visible = visible;
    this._colecciones = [];
  }


  get fechaCompra(): Date { return this._fechaCompra; }
  get estado(): EstadoJuego { return this._estado; }
  get licenciaClave(): string { return this._licenciaClave; }
  get visible(): boolean { return this._visible; }
  get colecciones(): ReadonlyArray<Coleccion> { return this._colecciones; }


  cambiarEstado(nuevoEstado: EstadoJuego): void {
    if (!this.puedeTransicionarA(nuevoEstado)) {
      throw new Error(`No se puede cambiar de ${this._estado} a ${nuevoEstado}`);
    }
    this._estado = nuevoEstado;
  }

  ocultarJuego(): void {
    this._visible = false;
  }

  mostrarJuego(): void {
    this._visible = true;
  }

  agregarAColeccion(coleccion: Coleccion): void {
    if (!this._colecciones.some(c => c.id === coleccion.id)) {
      this._colecciones.push(coleccion);
    }
  }

  quitarDeColeccion(idColeccion: string): void {
    this._colecciones = this._colecciones.filter(c => c.id !== idColeccion);
  }

  private puedeTransicionarA(nuevoEstado: EstadoJuego): boolean {

    if (this._estado === EstadoJuego.NO_INSTALADO && nuevoEstado === EstadoJuego.INSTALANDO) return true;
    if (this._estado === EstadoJuego.INSTALANDO && nuevoEstado === EstadoJuego.INSTALADO) return true;
    if (this._estado === EstadoJuego.INSTALADO && nuevoEstado === EstadoJuego.JUGANDO) return true;
    if (this._estado === EstadoJuego.INSTALADO && nuevoEstado === EstadoJuego.DESINSTALANDO) return true;
    if (this._estado === EstadoJuego.DESINSTALANDO && nuevoEstado === EstadoJuego.NO_INSTALADO) return true;
    return false;
  }
}