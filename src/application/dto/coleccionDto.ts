export interface CreateColeccionDto {
  nombre: string;
  idUsuario: string;
}

export interface ColeccionResponseDto {
  id: string;
  nombre: string;
  idUsuario: string;
}

export interface UpdateColeccionDto {
  id: string;
  nombre: string;
}

export interface AddJuegoToColeccionDto {
  idColeccion: string;
  idJuego: string;
}