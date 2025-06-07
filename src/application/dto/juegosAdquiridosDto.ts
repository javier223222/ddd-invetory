import { EstadoJuego } from "../../domain/models/valueObjects/estadoJuego";

export interface CreateJuegoAdquiridoDto {
  idUsuario: string;
  nombre: string;
  fechaCompra: string; 
  estado: EstadoJuego;
  clave: string;
  tipo: string;
  validez: string; 
}

export interface JuegoAdquiridoResponseDto {
  idJuego: string;
  idUsuario: string;
  nombre: string;
  fechaCompra: string; 
  estado: EstadoJuego;
  visible: boolean;
  licenciaClave: string;
  licencia?: {
    clave: string;
    tipo: string;
    validez: string;
  };
  colecciones?: Array<{
    id: string;
    nombre: string;
  }>;
}

export interface UpdateEstadoDto {
  idJuego: string;
  estado: EstadoJuego;
}

export interface ToggleVisibilityDto {
  idJuego: string;
  visible: boolean;
}

export interface GetJuegosAdquiridosDto {
  idUsuario: string;
  page: number;
  limit: number;
  coleccionId?: string;
  soloVisibles: boolean;
}

export interface JuegosAdquiridosResultDto {
  juegosAdquiridos: JuegoAdquiridoResponseDto[];
  total: number;
  totalPages: number;
  page: number;
}