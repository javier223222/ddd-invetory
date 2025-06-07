export class Coleccion {
  readonly id: string;
  private _nombre: string;
  readonly idUsuario: string;

  constructor(id: string, nombre: string, idUsuario: string) {
    this.id = id;
    this._nombre = nombre;
    this.idUsuario = idUsuario;
  }

  get nombre(): string { 
    return this._nombre; 
  }

  cambiarNombre(nuevoNombre: string): void {
    if (!nuevoNombre || nuevoNombre.trim().length === 0) {
      throw new Error("El nombre de la colección no puede estar vacío");
    }
    this._nombre = nuevoNombre;
  }
}